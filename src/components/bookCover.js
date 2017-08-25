import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
                    <Text>{this.props.bookInfo.title}</Text>
                </View>;
    }
}