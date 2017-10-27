import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native';
import style from '../../style/style.js';
import BookCover from './bookCover.js';
import { connect } from 'react-redux';
import { changePage, setActiveBook, clearHistory } from '../actions/book.js';
import { GroupBox } from './settings.js';

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
    }

    selectBook(book)
    {
        this.props.clearHistory();
        this.props.setActiveBook(book);
        this.props.changePage(book.pages[0].id);
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

    render()
    {
        return  <Image source={require("../../img/wallpaper.png")} resizeMode='stretch' style={[style.mainMenuView, { width:'100%', height:'100%' } ]}>
                    <Image source={require("../../img/choosicles_logo.png")} resizeMode="contain" style={{flex:1, marginTop:15}} />
                    <View style={{flexDirection:'row', flex:4, margin:20}}>
                        <View style={{flexDirection:'column', flex:32, alignItems:'center', marginTop:20}}>
                            <Image style={{height:25, marginBottom:-15}} resizeMode='contain' source={require('../../img/your_books.png')} />                      
                            <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center'}}>                  
                                <Image source={require('../../img/arrow_back.png')} />
                                <View style={{flex:1}}>
                                    <View style={[style.bookList, {flex:1}]}>
                                        {bookData.books.map((book) => 
                                            <TouchableOpacity key={book.id} onPress={() => this.selectBook(book)}>
                                                <BookCover key={book.id} bookInfo={book} />
                                            </TouchableOpacity>)}
                                        {bookData.books.map((book) => 
                                            <TouchableOpacity key={book.id} onPress={() => this.selectBook(book)}>
                                                <BookCover key={book.id} bookInfo={book} />
                                            </TouchableOpacity>)}
                                        {bookData.books.map((book) => 
                                            <TouchableOpacity key={book.id} onPress={() => this.selectBook(book)}>
                                                <BookCover key={book.id} bookInfo={book} />
                                            </TouchableOpacity>)}
                                        {bookData.books.map((book) => 
                                            <TouchableOpacity key={book.id} onPress={() => this.selectBook(book)}>
                                                <BookCover key={book.id} bookInfo={book} />
                                            </TouchableOpacity>)}
                                    </View>
                                </View>                                        
                                <Image source={require('../../img/arrow_forward.png')} />
                            </View>
                        </View>
                        <View style={{flex:8, alignItems:'center', justifyContent: 'center', marginTop:'-10%', paddingLeft:'5%'}}>
                                <TouchableOpacity onPress={() => this.store()}>
                                    <Image source={require('../../img/buy_books.png')} resizeMode='contain' style={{width:110, height:70}}/>
                                </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{position:'absolute', right: 10, top:20}}>
                        <TouchableOpacity onPress={() => this.settings()}>
                            <Image source={require('../../img/cogwheel.png')} style={{height:40, width:42}} />
                        </TouchableOpacity>
                    </View>
                </Image>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);