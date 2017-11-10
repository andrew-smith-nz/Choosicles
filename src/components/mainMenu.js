import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native';
import style from '../../style/style.js';
import BookCover from './bookCover.js';
import { connect } from 'react-redux';
import { changePage, setActiveBook, clearHistory } from '../actions/book.js';
import { GroupBox } from './settings.js';
import Reactotron from 'reactotron-react-native';
import global from '../../global.js'


const bookData = require('../../books.json');

function mapStateToProps(state) {
    return { 
        pageId: state.pageId,
        pageData: state.pageData
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        clearHistory: () => dispatch(clearHistory()),
        changePage: (pageId) => dispatch(changePage(pageId)),
        setActiveBook: (book) => dispatch(setActiveBook(book))
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
        this.props.navigation.navigate("TitlePage");
    }

    settings()
    {
        this.props.navigation.navigate("Settings");
    }

    store()
    {
        this.props.navigation.navigate("Store");
    }

    componentDidMount()
    {
        // var book = bookData.books[0];
        // this.props.setActiveBook(book);
        // this.props.changePage(book.pages[0].id);
        // this.props.navigation.navigate("Page");

    }

    // Testing my books scroll
     componentWillMount()
    {
        //for (i = 0; i < 6; i++)
        //{
            // var book = JSON.parse(JSON.stringify(bookData.books[0]));
            // book.owned = false;
            // bookData.books.push(book);
            // book = JSON.parse(JSON.stringify(bookData.books[0]));
            // book.owned = false;
            // book.comingSoon = true;
            // bookData.books.push(book);
        //}
    }
/*
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      } */
    
    render()
    {
        var book = bookData.books[this.state.myBooksIndex];
        var prevBook = (this.state.myBooksIndex > 0) ? bookData.books[this.state.myBooksIndex - 1] : null;        
        var nextBook = (this.state.myBooksIndex < bookData.books.length - 1) ? bookData.books[this.state.myBooksIndex + 1] : null;

        return  <Image id="wallpaper" source={require("../../img/wallpaper.png")} resizeMode='stretch' style={style.mainMenuView}>
                    <Image id="logo" source={require("../../img/choosicles_logo.png")} resizeMode="contain" style={{flex:2, marginTop:15 * global.HEIGHT_RATIO}} />
                    <View style={{flexDirection:'row', flex:12, margin:10 * global.HEIGHT_RATIO}}>
                        <View style={{flexDirection:'column', flex:32, alignItems:'center', padding:10, backgroundColor:'rgba(255,255,255,0.4)', borderRadius:30}}>                 
                            <Image id="yourbooks" style={{flex:1}} resizeMode='contain' source={require('../../img/your_books.png')} />     
                            <View style={{flexDirection:'row', flex:7, justifyContent:'center', alignItems:'center'}}>  
                                <View style={{width:50 * global.WIDTH_RATIO, flexDirection:'row', height:'100%', alignItems:'center', marginTop:-25 * global.HEIGHT_RATIO}}> 
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
                                        <TouchableOpacity key={book.id} onPress={() => { if (book.owned) this.selectBook(bookData.books[this.state.myBooksIndex]) }}>
                                            <BookCover key={book.id} bookInfo={book} offset={0} owned={book.owned} mode="menu" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[style.bookList, {flex:1, flexDirection:"column"}]}>
                                        {this.state.myBooksIndex < bookData.books.length - 1 ?
                                        <BookCover key={nextBook} bookInfo={nextBook} offset={1} />
                                        : null}
                                    </View>
                                </View>               
                                <View style={{width:50 * global.WIDTH_RATIO, flexDirection:'row', height:'100%', alignItems:'center', marginTop:-25 * global.HEIGHT_RATIO}}> 
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