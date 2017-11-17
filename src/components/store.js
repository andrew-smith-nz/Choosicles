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

const bookData = require('../../books.json');
const InAppBilling = require("react-native-billing");

function mapStateToProps(state) {
    return { 
        ownedBooks: state.products.ownedBooks
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
            Alert.alert("Apple App Store purchases coming soon!");
        }
    }

    componentWillMount()
    {        
        var priceData = [];
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

    getBookPrice(book)
    {
        var price = "Loading";
        if (book)
        {
            var priceData = this.state.priceData.filter(p => p.code == book.androidIAPCode)[0];
            if (priceData) price = priceData.price;
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
                    <TouchableOpacity style={style.centerBottomLargeButton} onPress={() => this.setState({ syncVisible:true})}>
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