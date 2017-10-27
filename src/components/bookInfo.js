import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import style from '../../style/style.js';

const bookData = require('../../books.json');

export default class BookInfo extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return  <View style={{flexDirection:'row', alignItems:'stretch', justifyContent:'space-between', padding: 10, backgroundColor:'white', height:'100%', width:'100%'}}>
                    <Image source={require("../../img/book_monster.png")} style={{width:'40%', height:'100%'}} resizeMode='contain' />
                    <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between', width:'60%', height:'100%'}}>
                        <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', padding:10}}>
                            <Text style={style.h4}>Your Very Own: Pet Monster!</Text>
                            <Text style={style.text}>Written by Meg Price</Text>
                            <Text style={style.text}>Illustrated by Sophie Wood</Text>
                            <Text style={style.text}>For ages 2 to 6</Text>
                            <Text style={style.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt libero nisi, quis laoreet est dapibus a. Curabitur sollicitudin finibus dignissim. 
                                Pellentesque eget pretium sem. Nunc imperdiet, diam at tincidunt condimentum, lacus quam consectetur erat, nec condimentum ipsum sem eu leo. 
                                Morbi elementum in ante vitae ullamcorper. Donec sed est nec est ultricies faucibus in egestas nisl. Morbi congue interdum tempor. </Text>
                        </View>
                        <View style={{width:'100%', height:'100%', alignItems:'center'}}>
                        <TouchableOpacity style={{width:'50%', height:'15%', padding:10, borderWidth:0.5, borderColor:'black', alignItems:'center', justifyContent:'center'}}
                                            onPress={() => this.props.callback()}>
                            <Text>Buy now for $5.99</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>;
    }
}