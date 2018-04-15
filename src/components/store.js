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
        this.state = { codeEntryVisible:false, bookInfoVisible: false, book: null, priceData: [], syncVisible:false };
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

    purchaseBook(book)
    {
        if (Platform.OS === "android")
        {
            // Call out to Google Play API
            InAppBilling.open().then(
                () => {
                    InAppBilling.purchase(book.androidIAPCode).then((response) => 
                    //InAppBilling.purchase("android.test.purchased").then((response) => 
                    {
                        if (response.purchaseState == "PurchasedSuccessfully")
                        {
                            this.props.addOwnedProduct(response.productId);
                            //this.props.addOwnedProduct(book.androidIAPCode);
                        }
                        InAppBilling.close();
                    }).catch(() => InAppBilling.close());
                }
            ).catch(() => InAppBilling.close());
        }
        else
        {
            var productIdentifier = [ book.iosIAPCode ];
            InAppUtils.loadProducts(productIdentifier, (error, products) => {
            InAppUtils.purchaseProduct(products[0].identifier, (error, response) => {
                   // NOTE for v3.0: User can cancel the payment which will be available as error object here.
                   if(response && response.productIdentifier) {
                       this.props.addOwnedProduct(productIdentifier);
                   }
                   });
                });

        }
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
            var productList = ['monster', 'seacreature'];
            InAppUtils.loadProducts(productList, (error, products) => {
                                    console.log("product count = " + products.length);
                for (i = 0; i < products.length; i++)
                {
                    console.log(products[i].identifier + " costs " + products[i].priceString);
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
            return this.props.ownedBooks.filter(b => b === book.id).length > 0;
    }

    render()
    {
        return  <Image source={require("../../img/wallpaper.png")} resizeMode='stretch' style={[style.mainMenuView, { width:'100%', height:'100%', flexDirection:'column' } ]}>
                    <Image source={require("../../img/buy_more_books.png")} resizeMode='contain' style={style.topText} />
                    <View style={{flexDirection:'row', flex:5, alignItems:'center', justifyContent:'center', margin:'5%'}}>
                        {bookData.books.map((book) => 
                        <View style={[style.bookCoverView, {flex:1, flexDirection:'row'}]} key={book.id} >
                            <TouchableOpacity style={{flex:1, flexDirection:'column'}} key={book.id} 
                                              onPress={() => this.setState({ bookInfoVisible:true, book:book })}>
                                <BookCover key={book.id} bookInfo={book} offset={0} owned={this.props.ownedBooks.filter(b => b === book.id).length > 0} mode="store" />
                                <Text style={[style.boldText24, {color:'black', textAlign:'center'}]}>{this.isBookOwned(book) ? "Purchased" : this.getBookPrice(book)}</Text>
                            </TouchableOpacity>
                        </View>)}
                    </View>      
                    <View style={{flex:3}} />            
                    {/* <TouchableOpacity style={style.centerBottomLargeButton} onPress={() => this.setState({ codeEntryVisible:true })}>
                        <Image style={style.fill} source={require('../../img/giftcode_button.png')} resizeMode="contain">
                        </Image>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.home()}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={style.fill} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.centerBottomLeftButton} onPress={() => this.restorePurchases()}>
                        <Image source={require('../../img/restore_purchases.png')} resizeMode="contain" style={[style.fill, {paddingRight:20 * global.WIDTH_RATIO}]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.centerBottomRightButton} onPress={() => this.setState({ syncVisible:true})}>
                        <Image source={require('../../img/sync.png')} resizeMode="contain" style={style.fill} />
                    </TouchableOpacity>
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
                    {/* <Modal transparent={true} visible={this.state.codeEntryVisible} onRequestClose={() => this.setState({ codeEntryVisible:false })} supportedOrientations={['landscape-left', 'landscape-right']}>
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <View style={{height:'80%', width:'80%', alignItems: 'center', justifyContent:'center'}}>
                                        <CodeEntry cancelCallback={() => this.setState({ codeEntryVisible:false })} />
                                </View>
                            </View>
                    </Modal> */}
                </Image>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
