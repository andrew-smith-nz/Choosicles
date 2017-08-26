import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import style from '../../style/style.js';
import {Audio} from 'expo';
import { getImageForPage, getSoundEffectForPage, getReadingForPage } from './resourceManager.js'

export default class Page extends Component
{
    constructor(props)
    {
        super();
        this.choose = this.choose.bind(this);
        this.return = this.return.bind(this);
        this.animateIn = this.animateIn.bind(this);
        this.fadeInText = this.fadeInText.bind(this);
        this.state = { currentText: 0, speaker: false, slideX: new Animated.Value(Dimensions.get('window').width), textFadeOpacity: new Animated.Value(0) };
        this._slideProgress = new Animated.Value(0);
    }

    componentWillReceiveProps(newProps)
    {
        this.setState({ currentText: 0, speaker: false, slideX: new Animated.Value(Dimensions.get('window').width) }, () => this.animateIn());        
    }

    animateIn()
    {
        Animated.timing(                  // Animate over time
            this.state.slideX,            // The animated value to drive
            {
                toValue: 0,
                duration: 500,            // Make it take a while
            }
        ).start();   
    }

    componentDidMount()
    {
        this.fadeInText();
        this.animateIn();
    }

    fadeInText()
    {
        Animated.timing(                  // Animate over time
            this.state.textFadeOpacity,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 400,              // Make it take a while
            }
          ).start();     
    }

    forward()
    {
        this.setState({currentText: this.state.currentText + 1, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText());
        
    }
    
    back()
    {
        this.setState({currentText: this.state.currentText - 1, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText());
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
        await sound.loadAsync(getSoundEffectForPage(this.props.pageData.id));
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
            await sound.loadAsync(getReadingForPage(this.props.pageData.id));
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
                <Animated.View style={[style.pageView, {transform: [
                    {
                      translateX: this.state.slideX
                    }
                  ]}]}>
                    <Image style={{flex:1, width:"100%", height:"100%"}} 
                        source={getImageForPage(this.props.pageData.id)} 
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
                                <Animated.Text style={{opacity:this.state.textFadeOpacity, textAlign:'center', borderColor:'black', borderWidth:0.5, padding:10, backgroundColor:'white'}}>
                                    {this.props.pageData.texts[this.state.currentText].text}
                                </Animated.Text>
                                {hasDecision ? 
                                    <View style={{marginTop: 10, marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        {this.props.pageData.navigationLinks.map((nav) => 
                                        <TouchableOpacity key={nav.id} onPress={() => this.choose(nav.targetPageId)}>
                                            <Animated.Text key={nav.id} style={{opacity:this.state.textFadeOpacity, textAlign:'center', borderColor:'black', borderWidth:0.5, padding:10, marginLeft: 10, marginRight:10, backgroundColor:'white'}}>
                                                {nav.text}
                                            </Animated.Text>
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