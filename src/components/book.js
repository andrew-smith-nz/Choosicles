import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from '../../style/style.js';
import Page from './page.js';

const bookData = require('../../books.json');


export default class Book extends Component
{
    constructor(props)
    {
        super(props);
        let book = bookData.books.filter(b => b.id === this.props.navigation.state.params.bookId)[0];
        this.state = { bookData: book, pageData: book.pages[0], pageHistory: [book.pages[0].id] }
    }

    navigateToPage(id, addToHistory)
    {
        //console.log(id);
        console.log(this.state.pageHistory);
        if (addToHistory) 
            this.state.pageHistory.push(id);
        this.setState({pageData: this.state.bookData.pages.filter((p) => p.id === id)[0]});
        
        //this.forceUpdate();
    }

    return()
    {
        this.state.pageHistory.pop(); 
        if (this.state.pageHistory.length > 0)
        {
            console.log(this.state.pageHistory);
            this.navigateToPage(this.state.pageHistory[this.state.pageHistory.length - 1], false);
        }
        else
        {
            this.props.navigation.navigate("MainMenu");
        }
    }

    render()
    {
        return  <View style={{flex:1}}>
                    <Page pageData={this.state.pageData} 
                        choose={(id) => this.navigateToPage(id, true)} 
                        return={() => this.return() }  />
                </View>;
    }
}