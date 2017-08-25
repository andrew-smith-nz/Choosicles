import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import style from '../../style/style.js';
import BookCover from './bookCover.js';

const bookData = require('../../books.json');

export default class MainMenu extends Component
{
    constructor(props)
    {
        super();
        this.selectBook = this.selectBook.bind(this);
    }

    selectBook(book)
    {
        this.props.navigation.navigate("Book", { bookId: book.id });
    }

    render()
    {
        let books = ["x", "2", "3", "4", "5", "6", "7", "8", "9"]

        return  <View style={style.mainMenuView}>
                    <Text style={style.h1}>Choosicles: Your Very Own...</Text>
                    <ScrollView style={{height:'80%'}}>
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