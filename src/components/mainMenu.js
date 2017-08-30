import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import style from '../../style/style.js';
import BookCover from './bookCover.js';
import { connect } from 'react-redux';
import { changePage } from '../actions/book.js';

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
        startBook: (pageId) => dispatch(changePage(pageId)) 
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
        this.props.startBook(book.pages[0].id);
        this.props.navigation.navigate("Page");
    }

    render()
    {
        let books = ["x", "2", "3", "4", "5", "6", "7", "8", "9"]

        return  <View style={style.mainMenuView}>
                    <Text style={[style.h1, {height:'20%'}]}>Choosicles</Text>
                    <ScrollView style={{height:'80%'}} horizontal={true}>
                    <View style={style.bookList}>
                        {bookData.books.map((book) => 
                            <TouchableOpacity key={book.id} onPress={() => this.selectBook(book)}>
                                <BookCover key={book.id} bookInfo={book} />
                            </TouchableOpacity>)}
                        {books.map((book) => <BookCover key={book} bookInfo={{title: book}} />)}
                    </View>
                    </ScrollView>
                </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);