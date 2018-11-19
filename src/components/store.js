import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert, BackHandler, Platform } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import BookCover from './bookCover.js';
import BookInfo from './bookInfo.js';
import CodeEntry from './codeEntry.js';
import Sync from './sync.js';
import Reactotron from 'reactotron-react-native';
import { addOwnedProduct } from '../actions/store.js';
import { NavigationActions } from 'react-navigation';
import global from '../../global.js'
import CheckBox from 'react-native-checkbox';

const bookData = require('../../books.json');
const InAppBilling = require("react-native-billing");
const InAppUtils = require('NativeModules').InAppUtils;

function mapStateToProps(state) {
    return { 
        ownedBooks: state.products.ownedBooks,
        activePurchase: state.products.activePurchase
    }
}

function mapDispatchToProps(dispatch)
{
    return {         
        addOwnedProduct: (productId) => dispatch(addOwnedProduct(productId)),
    };
}

class Store extends Component
{
    constructor(props)
    {
        super();
        this.state = { 
            codeEntryVisible:false, 
            bookInfoVisible: false, 
            book: null, 
            priceData: [], 
            syncVisible:false, 
            multipacks:false,
            numBooks:0,
            chooseBooksVisible: false ,
            selectedBooks: []
        };
        BackHandler.addEventListener('hardwareBackPress', () => this.home());
        //bookData.books.push(bookData.books.slice());
    }

    home()
    {        
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [ NavigationActions.navigate({ routeName: 'MainMenu'})]
            }));
    }

    purchaseBookByCode(androidCode, iosCode)
    {
        if (Platform.OS === "android")
        {
            // Call out to Google Play API
            InAppBilling.open().then(
                () => {
                    InAppBilling.purchase(androidCode).then((response) => 
                    //InAppBilling.purchase("android.test.purchased").then((response) => 
                    {
                        if (response.purchaseState == "PurchasedSuccessfully")
                        {
                            this.props.addOwnedProduct(response.productId);
                            //this.props.addOwnedProduct(androidCode);
                            this.home();
                        }
                        InAppBilling.close();
                    }).catch((error) => {
                        Reactotron.log(error); InAppBilling.close();});
                }
            ).catch((error) => {
                Reactotron.log(error); InAppBilling.close();});
        }
        else
        {
            var productIdentifier = [ iosCode ];
            InAppUtils.loadProducts(productIdentifier, (error, products) => {
            InAppUtils.purchaseProduct(products[0].identifier, (error, response) => {
                   // NOTE for v3.0: User can cancel the payment which will be available as error object here.
                   if(response && response.productIdentifier) {
                       this.props.addOwnedProduct(productIdentifier);
                       this.home();
                   }
                   if(error)
                   {
                       Reactotron.log(error);
                   }
                   });
                });

        }
    }

    purchaseBook(book)
    {
        this.purchaseBookByCode(book.androidIAPCode, book.iosIAPCode);
    }

    componentWillMount()
    {        
        var priceData = [];
        if (Platform.OS === "android")
        {
            InAppBilling.open().then(
                () => {
                    for (i = 0; i < bookData.books.length; i++)
                    {
                        InAppBilling.getProductDetails(bookData.books[i].androidIAPCode).then(
                            (response) => { 
                                this.state.priceData.push({ code: response.productId, price: response.priceText });
                                this.forceUpdate();
                            }).catch(() => InAppBilling.close());
                    }
                    InAppBilling.close();
                }).catch(() => InAppBilling.close());
        }
        else
        {
            var productList = ['monster', 'seacreature', 'alien', '1_2', '1_3', '2_3', '1_2_3'];
            InAppUtils.loadProducts(productList, (error, products) => {
                for (i = 0; i < products.length; i++)
                {
                    this.state.priceData.push({ code: products[i].identifier, price: products[i].priceString});
                    this.forceUpdate();
                }
            });
        }
        if (this.props.activePurchase)
        {
            for (i = 0; i < bookData.books.length; i++)
            {
                if (bookData.books[i].id === this.props.activePurchase)
                {
                    this.setState({bookInfoVisible: true, book: bookData.books[i]});
                    break;
                }
            }
        }
        if (bookData.books.filter(b => b.title === "Double Pack").length == 0)
            bookData.books.push({ id:"915D33E3-109D-BCA7-4701-7FEDD4266F7C", isMulti: true, title:"Double Pack", androidIAPCode:"1_2", iosIAPCode:"1_2", numBooks: 2});
        if (bookData.books.filter(b => b.title === "Triple Pack").length == 0)
            bookData.books.push({ id:"DAC400B5-9135-4499-9D11-4BF95CFB5442", isMulti: true, title:"Triple Pack", androidIAPCode:"1_2_3", iosIAPCode:"1_2_3", numBooks: 3});
        if (bookData.books.filter(b => b.title === "Quadruple Pack").length == 0)
            bookData.books.push({ id:"20B88B40-2426-F8A5-4923-008103C53E15", isMulti: true, title:"Quadruple Pack", androidIAPCode:"1_2_3_4", iosIAPCode:"1_2_3_4", numBooks: 4});
    }

    restorePurchases()
    {
        if (Platform.OS == "ios")
        {
            InAppUtils.restorePurchases((error, response) => {
                if(error) {
                   Alert.alert('Error', 'Could not connect to app store.');
                } else {
                   
                   if (response.length === 0) {
                     Alert.alert('No Purchases', "We didn't find any purchases to restore.");
                     return;
                   }
                   Alert.alert('Restore Successful', 'Successfully restored your purchases.');
                   response.forEach((purchase) => {
                     this.props.addOwnedProduct(purchase.productIdentifier);
                   });
                }
             });
        }
    }

    getBookPrice(book)
    {
        var price = "Loading Price";
        if (Platform.OS === "android")
        {
            if (book)
            {
                var priceData = this.state.priceData.filter(p => p.code == book.androidIAPCode)[0];
                if (priceData) price = priceData.price;
            }
        }
        else
        {
            if (book)
            {
                var priceData = this.state.priceData.filter(p => p.code == book.iosIAPCode)[0];
                if (priceData) price = priceData.price;
            }
        }
        return price;
    }

    isBookOwned(book)
    {
        if (book)
        {
            if (book.androidIAPCode === "1_2" || book.androidIAPCode === "1_2_3")
            return false;

            return this.props.ownedBooks.filter(b => b === book.id).length > 0;
        }
        return false;
    }

    showPurchaseModal(book)
    {
        if (book.isMulti)
        {
            this.setState({chooseBooksVisible:true, numBooks: book.numBooks});
        }
        else
        {
            this.setState({ bookInfoVisible:true, book:book });
        }
    }

    getMultipackCode()
    {
        var indexes = [];
        for(var i = 0; i < this.state.selectedBooks.length; i++) {
            var bookId = this.state.selectedBooks[i].id;
            if (bookId == "c08310da-aa1e-4c28-a29d-510ef4b44d97") indexes.push(1);
            if (bookId == "a588e22d-d984-d28d-4690-d8ad87a14d63") indexes.push(2);
            if (bookId == "afb09354-0bb9-72b1-45fe-7239bb8c8a62") indexes.push(3);
        }
        indexes = indexes.sort((a, b) => a - b);
        var code = "";
        for(var i = 0; i < indexes.length; i++) {
            code += indexes[i] + "_";
        }
        code = code.substring(0, code.length - 1);
        return code;
    }

    buyMultipack()
    {
        if (this.state.selectedBooks.length != this.state.numBooks) return;
        var code = this.getMultipackCode();
        Reactotron.log(code);
        this.purchaseBookByCode(code, code);

    }

    toggleSelectBook(book, checked)
    {
        if (this.isBookOwned(book)) return;
        var newBooks = [];
        var checkedAlreadyExists = false;
        for(var i = 0; i < this.state.selectedBooks.length; i++) {
            if(checked || this.state.selectedBooks[i].id !== book.id) {
                newBooks.push(this.state.selectedBooks[i]);
            }
            if (this.state.selectedBooks[i].id === book.id)
                checkedAlreadyExists = true;
        }
        if (!checkedAlreadyExists)
            newBooks.push(book);
        this.setState({selectedBooks: newBooks});
    }

    render()
    {
        return  <View style={[style.mainMenuView, { backgroundColor: '#00CAFF', width:'100%', height:'100%', flexDirection:'column' } ]}>
                    <Image source={require("../../img/buy_more_books.png")} resizeMode='contain' style={style.topText} />
                    <View style={{flexDirection:'column', width:'95%', flex:1}} >
                        <View style={{flexDirection: 'row', marginBottom:-1, zIndex:99}}>
                            <TouchableOpacity onPress={() => this.setState({multipacks:false})}>
                                <Text style={[this.state.multipacks ? style.radioButtonDisabled : style.radioButton]}>Individual Books</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({multipacks:true})}>
                                <Text style={this.state.multipacks ? style.radioButton : style.radioButtonDisabled}>Multi-Book Packs</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between', backgroundColor:'#FBC61E', borderColor:'black', borderWidth:1, height:'58%'}}>
                            {bookData.books.filter(b => (b.isMulti && this.state.multipacks) || (!b.isMulti && !this.state.multipacks)).map((book) => 
                            <View style={[style.storeBookCoverView, {flex:1, flexDirection:'row', marginTop:'3%'}]} key={book.id} >
                                <TouchableOpacity key={book.id} onPress={() => this.showPurchaseModal(book)}>
                                    <BookCover key={book.id} bookInfo={book} offset={0} owned={this.props.ownedBooks.filter(b => b === book.id).length > 0} mode="store" />
                                    <Text style={[style.boldText24, {color:'black', textAlign:'center', marginTop:'-10%'}]}>{this.isBookOwned(book) ? "Purchased" : this.getBookPrice(book)}</Text>
                                </TouchableOpacity>
                            </View>)}
                        </View>      
                    </View>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.home()}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={style.fill} />
                    </TouchableOpacity>
                    { Platform.OS == "ios" 
                    ?
                        <View style={{position:'absolute', left:0, bottom:0, width:'100%'}}>
                            <TouchableOpacity style={style.centerBottomLeftButton} onPress={() => this.restorePurchases()}>
                                <Image source={require('../../img/restore_purchases.png')} resizeMode="contain" style={[style.fill, {paddingRight:20 * global.WIDTH_RATIO}]} />
                            </TouchableOpacity>
                            <TouchableOpacity style={style.centerBottomRightButton} onPress={() => this.setState({ syncVisible:true})}>
                                <Image source={require('../../img/sync.png')} resizeMode="contain" style={style.fill} />
                            </TouchableOpacity>
                        </View>
                    : 
                        <TouchableOpacity style={style.centerBottomLargeButton} onPress={() => this.setState({ syncVisible:true})}>
                            <Image source={require('../../img/sync.png')} resizeMode="contain" style={style.fill} />
                        </TouchableOpacity>
                     }
                    <Modal transparent={true} visible={this.state.bookInfoVisible} onRequestClose={() => this.setState({ bookInfoVisible:false, book:null })} supportedOrientations={['landscape-left', 'landscape-right']}>
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <View style={{height:'80%', width:'80%', alignItems: 'center', justifyContent:'center'}}>
                                        <BookInfo bookInfo={this.state.book} owned={this.isBookOwned(this.state.book)} price={this.getBookPrice(this.state.book)} callback={() => this.purchaseBook(this.state.book)} cancelCallback={() => this.setState({ bookInfoVisible:false, book:null })} />
                                </View>
                            </View>
                    </Modal>    
                    <Modal transparent={true} visible={this.state.syncVisible} onRequestClose={() => this.setState({ syncVisible:false })} supportedOrientations={['landscape-left', 'landscape-right']}>
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <View style={{height:'80%', width:'80%', alignItems: 'center', justifyContent:'center'}}>
                                    <Sync cancelCallback={() => this.setState({ syncVisible:false })} />
                                </View>
                            </View>
                    </Modal>   
                    <Modal transparent={true} visible={this.state.chooseBooksVisible} onRequestClose={() => this.setState({ chooseBooksVisible:false })} supportedOrientations={['landscape-left', 'landscape-right']}>
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <View style={{height:'80%', width:'80%', alignItems: 'center', justifyContent:'center'}}>
                                    <View style={{flex:1, flexDirection:'column', width:'100%', height:'100%', padding:20, backgroundColor:'#F7E19E', borderColor:'black', borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'space-between'}}>
                                        <Text style={[style.boldText24, {marginBottom:'2%'}]}>Choose {this.state.numBooks} book{this.state.numBooks == 1 ? "" : "s"}</Text>
                                        <View style={{flexDirection:'column'}}>
                                        {bookData.books.filter(b => !b.isMulti).map((book) => 
                                            <View key={'v' + book.id}>
                                            {this.isBookOwned(book) ? null :
                                                <CheckBox key={'cb' + book.id} labelStyle={[style.boldText14, {color:(this.isBookOwned(book) ? 'grey' : 'black')}]} label={book.title + (this.isBookOwned(book) ? ' (Already owned)' : '')} onChange={ (checked) => this.toggleSelectBook(book, checked) } check={ this.selectedBooks && this.selectedBooks.filter(b => b.id == book.id).length > 0} />
                                            }</View>
                                        )}
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            {this.state.selectedBooks.length == this.state.numBooks ?
                                                <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1, marginRight:'5%'}} onPress={() => this.buyMultipack() }>
                                                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                                                        <Text style={[style.boldText16, style.buttonText]}>Buy</Text>
                                                    </Image>
                                                </TouchableOpacity>
                                                :
                                                <View  style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1, marginRight:'5%'}}>
                                                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button_disabled.png')} resizeMode="contain">
                                                        <Text style={[style.boldText16, style.buttonText]}>Buy</Text>
                                                    </Image>
                                                </View>
                                            }
                                            <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.setState({ chooseBooksVisible:false })}>
                                                <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                                                    <Text style={[style.boldText16, style.buttonText]}>Cancel</Text>
                                                </Image>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                    </Modal> 
                </View>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
