import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import style from '../../style/style.js';

const bookData = require('../../books.json');

export default class BookCover extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return  <View style={style.bookCoverView}>
                    <Image source={require("../../img/book_monster.png")} style={{width:'100%', height:'100%'}} resizeMode='contain' />
                </View>;
    }
}