import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import style from '../../style/style.js';
import {Audio} from 'expo';

export default class Page extends Component
{
    _fadeOpacity = 0;

    constructor(props)
    {
        super();
        this.choose = this.choose.bind(this);
        this.return = this.return.bind(this);
        this.fadeIn = this.fadeIn.bind(this);
        this.state = { currentText: 0, speaker: false };
        this._fadeOpacity = new Animated.Value(0) ;
    }

    componentWillReceiveProps(newProps)
    {
        this.setState({ currentText: 0, speaker: false });
        this._fadeOpacity = new Animated.Value(0) ;
        this.fadeIn();        
    }

    fadeIn()
    {
        Animated.timing(                  // Animate over time
            this._fadeOpacity,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 500,              // Make it take a while
            }
        ).start();   
    }

    componentDidMount()
    {
        this.fadeIn();
    }

    forward()
    {
        this.setState({currentText: this.state.currentText + 1 });
    }
    
    back()
    {
        this.setState({currentText: this.state.currentText - 1 });
    }

    choose(id)
    {
        this.props.choose(id);
    }

    return()
    {
        this.props.return();
    }

    async playSound()
    {
        Audio.setIsEnabledAsync(true);
        let sound = new Audio.Sound();
        await sound.loadAsync(require('../../audio/fart.mp3'));
        await sound.playAsync();
    }

    async toggleReading(status)
    {
        Audio.setIsEnabledAsync(true);
        let sound = this.state.playingSound;
        if (!sound)
        {
            sound = new Audio.Sound();
            this.setState({playingSound: sound});
        }
        if (status)
        {
            await sound.loadAsync(require('../../audio/reading2.mp3'));
            await sound.playAsync();
        }
        else
        {
            await sound.stopAsync();
            this.setState({playingSound: null});
        }
    }

    render()
    {
        let hasDecision = (this.state.currentText == (this.props.pageData.texts.length - 1));
        //let footerHeight = hasDecision ? '20%': '10%';
        return (
                <Animated.View style={[style.pageView, {opacity: this._fadeOpacity}]}>
                    <Image style={{flex:1, width:"100%", height:"100%"}} 
                        source={require("../../img/dd3188af-b523-4746-bf21-a892861ac004/dc86ea51-081d-4528-b77c-0788a1fd61ec/background.png")} 
                        resizeMode={"contain"}>
                        <View style={{position:'absolute', left:5, top:5, width:50, height:50}}>
                                <TouchableOpacity onPress={() => this.return()}>
                                    <Image source={require('../../img/back.png')} style={{width:50, height:50}} />
                                </TouchableOpacity> 
                            </View>
                        <View style={{flexDirection:'row', width:'100%', height:'80%', alignItems:'center'}}>
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                {this.state.currentText > 0 ? 
                                    <TouchableOpacity onPress={() => this.back()}>
                                        <Image source={require('../../img/arrow_back.png')} />
                                    </TouchableOpacity> 
                                : null }
                            </View>
                            <View style={{width:'80%'}} />
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                {this.state.currentText < this.props.pageData.texts.length - 1 ? 
                                <TouchableOpacity onPress={() => this.forward()}>
                                    <Image source={require('../../img/arrow_forward.png')} />
                                </TouchableOpacity>
                                : null }
                            </View>
                        </View>
                        <View style={style.pageFooterView}>
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => { this.toggleReading(!this.state.speaker); this.setState({speaker: !this.state.speaker});  }}>
                                    {this.state.speaker ? <Image source={require('../../img/speaker_off.png')} style={{width:30, height:30}} /> 
                                                        : <Image source={require('../../img/speaker_on.png')} style={{width:30, height:30}} />}
                                </TouchableOpacity> 
                            </View>
                            <View style={{position:'absolute', bottom:20, left:'10%', alignItems:'center', justifyContent:'center', width:'80%', height:'100%'}}>
                                <Text style={{textAlign:'center', borderColor:'black', borderWidth:0.5, padding:10, backgroundColor:'white'}}>{this.props.pageData.texts[this.state.currentText].text}</Text>
                                {hasDecision ? 
                                    <View style={{marginTop: 10, marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        {this.props.pageData.navigationLinks.map((nav) => 
                                        <TouchableOpacity key={nav.id} onPress={() => this.choose(nav.targetPageId)}>
                                            <Text key={nav.id} style={{textAlign:'center', borderColor:'black', borderWidth:0.5, padding:10, marginLeft: 10, marginRight:10, backgroundColor:'white'}}>{nav.text}</Text>
                                        </TouchableOpacity>)}
                                    </View>
                                : null}
                            </View>      
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.playSound()}>
                                    <Image source={require('../../img/sound_effect.png')} style={{width:30, height:30}} />
                                </TouchableOpacity>
                            </View>              
                        </View>
                    </Image>
                </Animated.View>
        );
    }
}