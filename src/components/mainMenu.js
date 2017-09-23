import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import style from '../../style/style.js';
import BookCover from './bookCover.js';
import { connect } from 'react-redux';
import { changePage, setActiveBook } from '../actions/book.js';

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
    }

    selectBook(book)
    {
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
                    <Image source={require("../../img/header.png")} resizeMode='contain' style={{height:'20%'}} />
                    <ScrollView style={{height:'80%'}} horizontal={true}>
                    <View style={style.bookList}>
                        {bookData.books.map((book) => 
                            <TouchableOpacity key={book.id} onPress={() => this.selectBook(book)}>
                                <BookCover key={book.id} bookInfo={book} />
                            </TouchableOpacity>)}
                            <TouchableOpacity onPress={() => this.store()}>
                                <View style={{borderWidth:0.5, borderColor:'black', borderStyle:"dotted", width:150, height:200, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontFamily:'summer_joy'}}>Get More Books</Text>
                                </View>
                            </TouchableOpacity>
                    </View>
                    </ScrollView>
                    <View style={{position:'absolute', right: 10, bottom:10}}>
                        <TouchableOpacity onPress={() => this.settings()}>
                            <Image source={require('../../img/cogwheel.png')} />
                        </TouchableOpacity>
                    </View>
                </Image>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);