import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import style from '../../style/style.js';
import { getCoverForBook, getHalfCoverForBook, getUnownedCoverForBook } from './resourceManager.js';
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
        var src;
        if (this.props.owned)
            {
            if (this.props.offset == -1)
                src = getHalfCoverForBook(this.props.bookInfo.id, false);
            if (this.props.offset == 1)
                src = getHalfCoverForBook(this.props.bookInfo.id, true);
            if (this.props.offset == 0)
                src = getCoverForBook(this.props.bookInfo.id, false);
        }
        else
        {
            if (this.props.offset == -1)
                src = getHalfCoverForBook(this.props.bookInfo.id, false);
            if (this.props.offset == 1)
                src = getHalfCoverForBook(this.props.bookInfo.id, true);
            if (this.props.offset == 0)
                src = getCoverForBook(this.props.bookInfo.id, false);
        }
        var coverStyle = this.props.offset == 0 ? style.bookCoverView : style.bookCoverHalfView;

        return  <View style={[style.bookCoverView]}>
                    <Image source={src} style={[coverStyle, style.blackBorder, this.props.bookInfo.owned ? { } : { opacity: 0.5 } ]} resizeMode='contain'>
                    </Image>
                        { this.props.bookInfo.comingSoon && this.props.offset == 0 ? 
                        <View style={[style.fill, {position:'absolute', left:0, top:0, padding:60}]}>
                            <Image style={[style.fill]} source={require("../../img/coming_soon.png")} resizeMode="contain" /> 
                        </View> 
                        : null }
                </View>;
    }
}