import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Dimensions, Modal, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { Sound } from 'react-native-sound';
import { getImageForPage, getSoundEffectForPage, getReadingForPage, getChoiceImageForPage } from './resourceManager.js'
import { backtrack, changePage, clearHistory, incrementPageCounter } from '../actions/book.js';
import { connect } from 'react-redux';
import NameMonster from './nameMonster.js';
import ShadowText from './shadowText.js';
import Reactotron from 'reactotron-react-native';

function mapStateToProps(state) {
    return { 
        pageData: state.changePage.pageData,
        pageHistory: state.changePage.pageHistory,
        name: state.changeName.name,
        panDirection: state.changePage.direction,
        pageCounters: state.pageCounters.pageCounters,
        showChoiceCounters: state.changeSettings.showChoiceCounters,
        displayMode: state.changeSettings.displayMode,
        enableSoundEffects: state.changeSettings.enableSoundEffects,
        enableReadAloud: state.changeSettings.enableReadAloud,
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        backtrack: () => dispatch(backtrack()),
        clearHistory: () => dispatch(clearHistory()),
        choose: (pageId) => dispatch(changePage(pageId)),
        incrementPageCounter: (pageId) => dispatch(incrementPageCounter(pageId))
    };
}

class Page extends Component
{
    constructor(props)
    {
        super();
        this.backtrack = this.backtrack.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.animateIn = this.animateIn.bind(this);
        this.fadeInText = this.fadeInText.bind(this);
        this.getPageText = this.getPageText.bind(this);
        this.getPageCount = this.getPageCount.bind(this);
        this.loadReadingAudio = this.loadReadingAudio.bind(this);
        this.state = { 
            currentText: 0, 
            speaker: false, 
            slideX: new Animated.Value(Dimensions.get('window').width), 
            textFadeOpacity: new Animated.Value(0),
            nameMonsterVisible: false,
            tabletMode: props.displayMode === "tablet"
        };
        this._slideProgress = new Animated.Value(0);
    }

    loadReadingAudio(props, partId){
        var reading = getReadingForPage(props.pageData.id, partId);
        Reactotron.log(reading);
        console.log(reading);
        if (!reading) 
            return;

        var Sound = require('react-native-sound');
        var sound = new Sound(reading, Sound.MAIN_BUNDLE, (error) => {
            Reactotron.log('changed sound');
            this.setState({playingSound: sound});
        });
    }

    componentWillMount()
    {
        this.loadReadingAudio(this.props, 0);
    }

    componentWillReceiveProps(newProps)
    {
        console.log('test');
        this.setState({ 
                currentText: 0, 
                speaker: false, 
                slideX: new Animated.Value  ((newProps.panDirection == "forward" ? 1 : -1) * Dimensions.get('window').width) 
            },
            () => this.animateIn());   

        this.loadReadingAudio(newProps, 0);
    }

    animateIn()
    {
        Animated.timing(                  // Animate over time
            this.state.slideX,            // The animated value to drive
            {
                toValue: 0,
                duration: 150,            // Make it take a while
            }
        ).start();
    }

    componentDidMount()
    {
        this.fadeInText();
        this.animateIn();
        BackHandler.addEventListener('hardwareBackPress', () => this.backHandler());
    }

    backHandler()
    {
        this.backtrack(); return true; 
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
        if ((this.state.currentText < this.props.pageData.texts.length - 1) && !this.state.tabletMode)
        {            
            this.setState({currentText: this.state.currentText + 1, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText()); 
            this.toggleReading(false);
            this.loadReadingAudio(this.props, this.state.currentText + 1);      
        }
        else
        {
            this.props.navigation.navigate("EndPage");
        }
    }
    
    back()
    {
        this.setState({currentText: this.state.currentText - 1, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText());
        this.toggleReading(false);
        this.loadReadingAudio(this.props, this.state.currentText - 1);
    }

    backtrack()
    {
        if (this.props.pageHistory.length == 1)
        {
            BackHandler.removeEventListener('hardwareBackPress', () => this.backHandler());
            this.props.navigation.navigate("TitlePage");
        }
        else
        {            
            this.props.backtrack();
        }
    }

    playSound()
    {
        Reactotron.log("play sound");
        var Sound = require('react-native-sound');
        Sound.setCategory('Playback');
        const play = (error, sound) => sound.play()
        // doesn't work with Require - possibly only a dev mode problem?  Need to test with production apk.
        var s = new Sound(this.props.pageData.assetCode + '_soundeffect.mp3', Sound.MAIN_BUNDLE, (error) => play(error, s));
        Reactotron.log(s);
    }

    toggleReading(status)
    {
        if (status == null)
            status = !this.state.speaker;
        this.setState({speaker: status});
        if (this.state.playingSound)
        {
            if (status)
            {
                this.state.playingSound.play();
            }
            else
            {
                this.state.playingSound.stop();
            }
        }
    }

    getPageText()
    {
        let originalText = "";
        if (this.state.tabletMode)
        {
            originalText = this.props.pageData.texts.map(t => t.text).join(" ");
        }
        else
        {
            originalText = this.props.pageData.texts[this.state.currentText].text;
        }
        if (this.props.name)
        {
            originalText = originalText.replace(new RegExp("your pet monster", "g"), this.props.name);
            originalText = originalText.replace(new RegExp("Your pet monster", "g"), this.props.name.substring(0,1).toUpperCase() + this.props.name.substring(1));
        }
        return originalText;
    }

    componentWillUpdate()
    {
        if (!this.props.pageData)
        {
            // either something has gone wrong, or we've navigated back to the home screen
            this.props.navigation.navigate("MainMenu");
        }
    }

    getPageCount(pageId)
    {
        var count = this.props.pageCounters.filter(c => c.pageId === pageId)[0]
        return count ? count.count : 0;
    }

    render()
    {
        let hasDecision = (this.state.currentText == (this.props.pageData.texts.length - 1) || this.state.tabletMode) && this.props.pageData.navigationLinks.length > 0;
        let textPosition = this.props.pageData.texts[this.state.currentText].textPosition;
        if (!textPosition)
            textPosition = 'bottom';
        let leftPosition = this.props.pageData.texts[this.state.currentText].leftPosition;
        if (!leftPosition) leftPosition = '13%';
        let bottomPosition = this.props.pageData.texts[this.state.currentText].bottomPosition;
        if (!bottomPosition) bottomPosition = '0%';
        let topPosition = this.props.pageData.texts[this.state.currentText].topPosition;
        if (!topPosition) topPosition = '0%';
        let width = this.props.pageData.texts[this.state.currentText].width;
        if (!width) width = '74%';
        let backgroundOpacity = this.props.pageData.texts[this.state.currentText].backgroundOpacity;
        if (!backgroundOpacity) backgroundOpacity = 0.6;
        var backgroundColor = 'rgba(255,255,255,' + backgroundOpacity.toString() + ')';
        let pageTextView = (
            <Animated.Text style={[ this.state.tabletMode ? style.boldText16 : style.boldText24, {marginBottom:5, marginTop:5, borderRadius:30, opacity:this.state.textFadeOpacity, color:this.props.pageData.textColor, textAlign:'center', padding:5, 
            backgroundColor:backgroundColor, lineHeight:30 }]}>
                {this.getPageText()}
            </Animated.Text> );
        return (
                <Animated.View style={[style.pageView, {transform: [
                    {
                    translateX: this.state.slideX
                    }
                ]}]}>
                    <Image style={{flex:1, width:"100%", height:"100%"}} source={getImageForPage(this.props.pageData.id)} resizeMode={"cover"}>
                        <View style={{position:'absolute', left:leftPosition, top:topPosition, width:width}}>
                               {(textPosition == 'top') ? pageTextView : null}
                        </View>
            
                        <View style={{position:'absolute', right:10, top:10, width:50, height:50}}>
                            <Text style={{fontSize:20, color:'white', backgroundColor:'transparent'}}>{this.props.pageData.pageNumber}</Text>
                        </View>
                        
                        <View style={{flexDirection:'column', position:'absolute', bottom:bottomPosition, left:leftPosition, width:width, alignItems:'center', justifyContent:'center'}}>                          
                                    {(textPosition == 'bottom') ? pageTextView : null}
                                <View style={[style.centeredContent, {flexDirection:'row', justifyContent:'space-between', marginTop: -5, marginBottom:5, width:180}]}>  
                                    {hasDecision ? 
                                        this.props.pageData.navigationLinks.map((nav) => 
                                            <TouchableOpacity key={nav.id} onPress={() => { this.props.incrementPageCounter(nav.targetPageId); this.props.choose(nav.targetPageId); } }>
                                                <Image source={getChoiceImageForPage(this.props.pageData.id, nav.order - 1)} resizeMode='contain' style={{marginTop:5, height:40, width:73}} />
                                                {this.props.showChoiceCounters ? <View style={{position:'absolute', borderColor:'black', borderWidth:0.5, borderRadius:15, padding:2, right:3, top:0, backgroundColor:'white', zIndex: 0}}>
                                                    <Text style={{fontSize:8}}>{this.getPageCount(nav.targetPageId)}</Text>
                                                </View> : null }
                                            </TouchableOpacity>
                                            )
                                    : null}
                                </View>
                        </View>

                        <View style={{position:'absolute', left:10, top:10, width:50, height:50}}>
                            <TouchableOpacity onPress={() => this.backtrack()}>
                                <Image source={require('../../img/back.png')} style={{width:50, height:50}} />
                            </TouchableOpacity> 
                        </View>
                        <View style={[style.centeredContent, {position:'absolute', left:10, top:0, height:'100%'}]}>
                            {this.state.currentText > 0 && !this.state.tabletMode ? 
                                <TouchableOpacity onPress={() => this.back()}>
                                    <Image source={require('../../img/arrow_back.png')} style={{width:50, height:50}} />
                                </TouchableOpacity> 
                            : null }
                        </View>
                        <View style={[style.centeredContent, {position:'absolute', right:10, top:0, height:'100%'}]}>
                            {(this.props.pageData.navigationLinks.length == 0) || ((this.state.currentText < this.props.pageData.texts.length - 1) && !this.state.tabletMode) ? 
                                <TouchableOpacity onPress={() => this.forward()}>
                                    <Image source={require('../../img/arrow_forward.png')} style={{width:50, height:50}} />
                                </TouchableOpacity>
                                : null }
                        </View>
                        {this.props.enableSoundEffects ? 
                            <View style={{position:'absolute', right:10, bottom:10}}>
                            <TouchableOpacity onPress={() => this.playSound()}>
                                <Image source={require('../../img/sound_effect.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                        </View> : null}        
                        {this.props.enableReadAloud ? 
                            <View style={{position:'absolute', left:10, bottom:10}}>
                                <TouchableOpacity onPress={() => { this.toggleReading(); }}>
                                    {this.state.speaker ? <Image source={require('../../img/speaker_off.png')} style={{width:50, height:50}} /> 
                                                        : <Image source={require('../../img/speaker_on.png')} style={{width:50, height:50}} />}
                                </TouchableOpacity> 
                            </View> : null}
                    </Image>
                </Animated.View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);