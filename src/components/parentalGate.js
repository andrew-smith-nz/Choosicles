import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, TextInput, Alert } from 'react-native';
import style from '../../style/style.js';
import { NavigationActions } from 'react-navigation';
import global from '../../global.js'

export default class ParentalGate extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {x:  this.getRandomNumber(), y:  this.getRandomNumber()};
    }

    getRandomNumber()
    {
        return Math.floor(Math.random() * 50) + 15 ;
    }

    home()
    {        
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [ NavigationActions.navigate({ routeName: 'MainMenu'})]
            }));
    }

    validateAnswer()
    {
        if (this.state.answer == this.state.x + this.state.y)
        {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Store'})]
                }));
        }
        else{
            Alert.alert("Incorrect answer");
        }
    }

    render()
    {
        return <Image id="wallpaper" source={require("../../img/wallpaper.png")} resizeMode='stretch' style={{flexDirection:'column', width:'100%', height:'100%'}}>
                    <View style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center', marginTop:10, marginBottom:10}}>
                        <Image source={require('../../img/ask_your_parents.png')} resizeMode="contain" style={style.topText} />
                    </View>
                    <View style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center',
                        }}>
        <Text style={[style.h4, {paddingTop:10 * global.HEIGHT_RATIO, paddingBottom:10 * global.HEIGHT_RATIO}]}>Please answer the following question</Text>
                    </View>
                    <View style={{flex:2, width:'100%', alignItems:'center', justifyContent:'center'	}}>
                        <Text style={[style.h2, {paddingTop:10 * global.HEIGHT_RATIO}]}>What is {this.state.x} + {this.state.y}?</Text>
                    </View>
                    <View style={{flex:2, width:'100%', alignItems:'center', justifyContent:'center'}}>
                        <TextInput underlineColorAndroid='transparent' style={[style.textInput, style.h2, {width:'50%', backgroundColor:'white', textAlign:'center'}]} 
                                onChangeText={(text) => { this.setState({answer: text })}} value={this.state.answer} keyboardType="numeric" />
                    </View>
                    <View style={{flex:2, width:'100%', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.validateAnswer()}>
                            <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/submit.png')} resizeMode="contain">
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.home()}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={style.fill} />
                    </TouchableOpacity>
                </Image>
    }
}
