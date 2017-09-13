import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import BookCover from './bookCover.js'

const bookData = require('../../books.json');

function mapStateToProps(state) {
    return { 
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
    };
}

class Store extends Component
{
    constructor(props)
    {
        super();
    }

    selectBook(book)
    {
        // Call out to Google Play API
    }

    render()
    {
        return  <View style={{flexDirection:'column'}}>
                    <Text style={[style.h3, {textAlign:'center', paddingBottom:10}]}>Store</Text>

                    {bookData.books.map((book) => 
                            <TouchableOpacity style={{flexDirection:'column', width:200, alignItems:'center'}} key={book.id} onPress={() => this.selectBook(book)}>
                                <BookCover key={book.id} bookInfo={book} />
                                <Text style={{textAlign:'center'}}>$5.99</Text>
                            </TouchableOpacity>)}

                    <View style={{position:'absolute', right:10, top:10, zIndex: 0, alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity style={{borderWidth:0.5, borderColor:'black', padding:5}} onPress={() => this.props.navigation.navigate("MainMenu")}>
                            <Text>Return</Text>
                        </TouchableOpacity>
                    </View>
                </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);