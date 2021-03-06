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
    
    getNicePrice()
    {
        if (this.props.price === "Loading Price")
            return "$4.99";
        return this.props.price;
    }

    render()
    {
        return  <View style={[{borderColor:'black', borderWidth:0.5, borderRadius:10, flex:1 ,flexDirection:'row', alignItems:'stretch', justifyContent:'space-between', padding: 10 * global.HEIGHT_RATIO, backgroundColor:'#F7E19E'}]}>
                    <View style={[style.bookInfoPadding, {flex:7}]}>
                        <Image style={[{width:'100%', height:'40%'}]} source={getCoverForBook(this.props.bookInfo.id, false)} resizeMode='contain' />
                    </View>
                    <View style={{flex:13, flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>
                        <View style={[ style.bookInfoPadding, {flex:5, flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}]}>
                            <Text style={style.h4}>{this.props.bookInfo.title}</Text>
                            <ScrollView style={{flex:1}}>
                                <Text style={style.boldText14}>Written by {this.props.bookInfo.author}</Text>
                                <Text style={style.boldText14}>Illustrated by {this.props.bookInfo.illustrator}</Text>
                                <Text style={style.text12}>{this.props.bookInfo.description}</Text>
                            </ScrollView>
                        </View>
                        <View style={{flex:2, width:'100%'}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingLeft:20 * global.HEIGHT_RATIO, paddingRight:20 * global.HEIGHT_RATIO}}>
                                {!this.props.owned ? <TouchableOpacity style={{width:'40%', alignItems:'center', justifyContent:'center', padding:1}}
                                                    onPress={() => this.props.callback()}>
                                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/tall_button.png')} resizeMode="contain">
                                        <Text style={[style.boldText16, style.bookInfoBuyButton ]}>Buy now{"\n"} {this.getNicePrice()}</Text>
                                    </Image>
                                </TouchableOpacity> : <View style={{width:'30%', alignItems:'center', justifyContent:'center', padding:1}} />}
                                <TouchableOpacity style={{width:'40%', alignItems:'center', justifyContent:'center', padding:1}}
                                                    onPress={() => this.props.cancelCallback()}>
                                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/tall_button.png')} resizeMode="contain">
                                        <Text style={[style.boldText16, style.bookInfoBuyButton ]}>Close</Text>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>;
    }
}
