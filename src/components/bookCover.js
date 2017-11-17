import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import style from '../../style/style.js';
import { getCoverForBook, getHalfCoverForBook } from './resourceManager.js';
import Reactotron from 'reactotron-react-native';
import global from '../../global.js'

const bookData = require('../../books.json');

export default class BookCover extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        var opacity = ((this.props.owned && this.props.mode == "store") || (!this.props.owned && this.props.mode != "store") || this.props.offset != 0) ? 0.5 : 1;
        var coverStyle = this.props.offset == 0 ? style.bookCoverView : style.bookCoverHalfView;
        var src = this.props.offset == 0 ? getCoverForBook(this.props.bookInfo.id) : getHalfCoverForBook(this.props.bookInfo.id, this.props.offset == 1);

        return  <View style={[style.bookCoverView, ]}>
                    <Image id="cover" source={src} style={[coverStyle, style.blackBorder, { opacity: opacity } ]} resizeMode="stretch" />
                        { this.props.bookInfo.comingSoon && this.props.offset == 0 ? 
                        <View style={[style.fill, {position:'absolute', left:0, top:0, padding:30 * global.HEIGHT_RATIO}]}>
                            <Image id="coming_soon" style={[style.fill]} source={require("../../img/coming_soon.png")} resizeMode="contain" /> 
                        </View> 
                        : null }
                         { !this.props.owned && !this.props.bookInfo.comingSoon && this.props.mode != "store" && this.props.offset == 0 ? 
                        <View style={[style.fill, {position:'absolute', left:0, top:0, padding:30 * global.HEIGHT_RATIO}]}>
                            <Image id="available" style={[style.fill]} source={require("../../img/available.png")} resizeMode="contain" /> 
                        </View> 
                        : null }
                </View>;
    }
}