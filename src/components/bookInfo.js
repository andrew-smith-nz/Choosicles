import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import style from '../../style/style.js';
import { getCoverForBook } from './resourceManager.js'
import Reactotron from 'reactotron-react-native';
import global from '../../global.js'

const bookData = require('../../books.json');

export default class BookInfo extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return  <View style={[style.blackBorder, {flex:1 ,flexDirection:'row', alignItems:'stretch', justifyContent:'space-between', padding: 10 * global.HEIGHT_RATIO, backgroundColor:'#F7E19E'}]}>
                    <Image style={[style.fill, style.blackBorder, {flex:7}]} source={getCoverForBook(this.props.bookInfo.id)} resizeMode='contain' />
                    <View style={{flex:13, flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>
                        <View style={{flex:5, flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', padding:10 * global.HEIGHT_RATIO}}>
                            <Text style={style.h4}>{this.props.bookInfo.title}</Text>
                            <ScrollView style={{flex:1}}>
                                <Text style={style.boldText14}>Written by {this.props.bookInfo.author}</Text>
                                <Text style={style.boldText14}>Illustrated by {this.props.bookInfo.illustrator}</Text>
                                <Text style={style.text12}>{this.props.bookInfo.description}</Text>
                            </ScrollView>
                        </View>
                        <View style={{flex:2, width:'100%'}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingLeft:20 * global.HEIGHT_RATIO, paddingRight:20 * global.HEIGHT_RATIO}}>
                                <TouchableOpacity style={{width:'30%', alignItems:'center', justifyContent:'center', padding:1}}
                                                    onPress={() => this.props.callback()}>
                                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/tall_button.png')} resizeMode="contain">
                                        <Text style={[style.boldText16, { textAlign:"center", lineHeight: 25 * global.HEIGHT_RATIO} ]}>Buy now $0.00</Text>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:'30%', alignItems:'center', justifyContent:'center', padding:1}}
                                                    onPress={() => this.props.cancelCallback()}>
                                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/tall_button.png')} resizeMode="contain">
                                        <Text style={[style.boldText16, { textAlign:"center", lineHeight: 25 * global.HEIGHT_RATIO} ]}>Close</Text>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>;
    }
}