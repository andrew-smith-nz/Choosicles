import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import style from '../../style/style.js';
import { getCoverForBook } from './resourceManager.js';
import Reactotron from 'reactotron-react-native';

const bookData = require('../../books.json');

export default class BookCover extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return  <View style={[style.bookCoverView]}>
                    <Image source={getCoverForBook(this.props.bookInfo.id)} style={[style.fill, style.blackBorder]} resizeMode='contain' />
                </View>;
    }
}