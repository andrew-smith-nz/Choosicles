import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class ShadowText extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return  <View>
                    <Text style={{position:'absolute', left:5, top:5, fontSize:12, zIndex: 1, color:'white', backgroundColor:'transparent'}}>{this.props.text}</Text>
                    <Text style={{position:'absolute', left:3, top:3, fontSize:12, fontWeight:'bold', zIndex: 0, color:'black', backgroundColor:'transparent'}}>{this.props.text}</Text>
                </View>;
    }
}