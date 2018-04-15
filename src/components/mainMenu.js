import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, BackHandler, Platform, Alert } from 'react-native';
import style from '../../style/style.js';
import BookCover from './bookCover.js';
import { connect } from 'react-redux';
import { changePage, setActiveBook, clearHistory } from '../actions/book.js';
import { setOwnedProducts } from '../actions/store.js';
import { GroupBox } from './settings.js';
import Reactotron from 'reactotron-react-native';
import global from '../../global.js'
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';


const bookData = require('../../books.json');
const InAppBilling = require("react-native-billing");
const InAppUtils = require('NativeModules').InAppUtils;

function mapStateToProps(state) {
    return { 
        ownedBooks: state.products.ownedBooks
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        clearHistory: () => dispatch(clearHistory()),
        changePage: (pageId) => dispatch(changePage(pageId)),
        setActiveBook: (book) => dispatch(setActiveBook(book)),
        setOwnedProducts: (productIds) => dispatch(setOwnedProducts(productIds))
    };
}

class MainMenu extends Component
{
    constructor(props)
    {
        super();
        this.selectBook = this.selectBook.bind(this);
        BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp());
        this.state = { myBooksIndex: 0 };
    }

    selectBook(book)
    {
        this.props.clearHistory();
        this.props.setActiveBook(book);
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'TitlePage'})]
                }));
    }

    settings()
    {
        if (!this.state.navigating)
        {
            this.setState({navigating:true});        
            this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [ NavigationActions.navigate({ routeName: 'Settings'})]
                    }));
        }
    }

    store()
    {
        if (Platform.OS == "ios")
        {
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'ParentalGate'})]
                }));
            }
        else
        {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Store'})]
                }));
        }
    }

    setOwnedProducts(productIds)
    {
        this.props.setOwnedProducts(productIds);
    }

    componentDidMount()
    {
        if (Platform.OS === "android")
        {
            InAppBilling.open().then(
            () => 
                InAppBilling.listOwnedProducts()
                    .then(function (response) { 
                        //response.push("pet_monster");
                        this.setOwnedProducts(response); 
                        InAppBilling.close();
                    }.bind(this))
                    .catch(() => InAppBilling.close()))
                .catch(() => InAppBilling.close());
        }
        //  var book = bookData.books[0];
        //  this.props.setActiveBook(book);
        //  this.props.changePage(book.pages[0].id);
        //  this.props.navigation.navigate("Page");

    }
    
    render()
    {
        var book = bookData.books[this.state.myBooksIndex];
        var bookOwned = this.props.ownedBooks.filter(b => b === book.id).length > 0;
        var prevBook = (this.state.myBooksIndex > 0) ? bookData.books[this.state.myBooksIndex - 1] : null;        
        var nextBook = (this.state.myBooksIndex < bookData.books.length - 1) ? bookData.books[this.state.myBooksIndex + 1] : null;

        return  <Image id="wallpaper" source={require("../../img/wallpaper.png")} resizeMode='stretch' style={style.mainMenuView}>
                    <Image id="logo" source={require("../../img/choosicles_logo.png")} resizeMode="contain" style={{flex:2, marginTop:15 * global.HEIGHT_RATIO}} />
                    <View style={{flexDirection:'row', flex:12, margin:10 * global.HEIGHT_RATIO}}>
                        <View style={{flexDirection:'column', flex:32, alignItems:'center', padding:10, backgroundColor:'rgba(255,255,255,0.4)', borderRadius:30}}>                 
                            <Image id="yourbooks" style={{flex:1}} resizeMode='contain' source={require('../../img/your_books.png')} />     
                            <View style={{flexDirection:'row', flex:7, justifyContent:'center', alignItems:'center'}}>  
                                <View style={{zIndex: 99, width:50 * global.WIDTH_RATIO, flexDirection:'row', height:'100%', alignItems:'center', marginTop:-25 * global.HEIGHT_RATIO}}> 
                                    {(this.state.myBooksIndex > 0) ? 
                                    <TouchableOpacity style={{width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}} onPress={() => this.setState({myBooksIndex: this.state.myBooksIndex - 1})}>               
                                        <Image id="back" source={require('../../img/arrow_back.png')} resizeMode="contain" style={{width:'100%', height:'100%', padding:5}} />
                                    </TouchableOpacity> : null }
                                </View>
                                <View style={{flex:16, flexDirection:"row", justifyContent:'center'}}>
                                    <View style={[style.bookList, {flex:1, flexDirection:"column"}]}>
                                        {this.state.myBooksIndex > 0 ?
                                            <BookCover key={prevBook.id} bookInfo={prevBook} offset={-1} />
                                        : null}
                                    </View>
                                    <View style={[style.bookList, {flex:2, flexDirection:"column"}]}>
                                        <TouchableOpacity key={book.id} onPress={() => { this.selectBook(bookData.books[this.state.myBooksIndex]); } }>
                                            <BookCover key={book.id} bookInfo={book} offset={0} owned={bookOwned} mode="menu" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[style.bookList, {flex:1, flexDirection:"column"}]}>
                                        {this.state.myBooksIndex < bookData.books.length - 1 ?
                                        <BookCover key={nextBook} bookInfo={nextBook} offset={1} />
                                        : null}
                                    </View>
                                </View>               
                                <View style={{zIndex: 99, width:50 * global.WIDTH_RATIO, flexDirection:'row', height:'100%', alignItems:'center', marginTop:-25 * global.HEIGHT_RATIO}}> 
                                    {this.state.myBooksIndex < bookData.books.length - 1 ? 
                                     <TouchableOpacity style={{width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}} onPress={() => this.setState({myBooksIndex: this.state.myBooksIndex + 1})}>
                                        <Image id="forward" source={require('../../img/arrow_forward.png')} resizeMode="contain" style={[style.fill, { padding:5 }]} />
                                    </TouchableOpacity> : null }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{height:65 * global.HEIGHT_RATIO}} />
                    <TouchableOpacity onPress={() => this.settings()} style={style.topRightButton} >
                        <Image id="settings" source={require('../../img/cogwheel.png')} resizeMode="contain" style={style.fill} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.centerBottomLongButton} onPress={() => this.store()}>            
                        <Image id="store" source={require('../../img/buybooks_long.png')} resizeMode='contain' style={style.fill}/>
                    </TouchableOpacity>
                </Image>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
