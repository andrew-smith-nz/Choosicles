import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Dimensions, Modal, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { getImageForPage, getSoundEffectForPage, getReadingForPage, getChoiceImageForPage } from './resourceManager.js'
import { backtrack, changePage, clearHistory, incrementPageCounter, changeText } from '../actions/book.js';
import { connect } from 'react-redux';
import NameMonster from './nameMonster.js';
import ShadowText from './shadowText.js';
import Reactotron from 'reactotron-react-native';
var Sound = require('react-native-sound');

function mapStateToProps(state) {
    return { 
        pageData: state.changePage.pageData,
        pageHistory: state.changePage.pageHistory,
        currentText: state.changePage.currentText,
        name: state.changeName.name,
        panDirection: state.changePage.direction,
        pageCounters: state.pageCounters.pageCounters,
        showChoiceCounters: state.changeSettings.showChoiceCounters,
        displayMode: state.changeSettings.displayMode,
        enableSoundEffects: state.changeSettings.enableSoundEffects,
        enableReadAloud: state.changeSettings.enableReadAloud,
        enableNoText: state.changeSettings.enableNoText,
        enableAutoplayAudio: state.changeSettings.enableAutoplayAudio
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        backtrack: () => dispatch(backtrack()),
        clearHistory: () => dispatch(clearHistory()),
        changeText: (increment) => dispatch(changeText(increment)),
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
            speaker: false, 
            slideX: new Animated.Value(Dimensions.get('window').width), 
            textFadeOpacity: new Animated.Value(0),
            nameMonsterVisible: false,
            tabletMode: false,
            paused: false,
            currentPlayingSoundIndex: 0            
        };
        this._slideProgress = new Animated.Value(0);
    }

    loadReadingAudio(props, partId){    
        this.setState({playingSound: []})
        var numToLoad = props.pageData.texts.length;
        var numLoaded = 0;
        var players = [];
        if (this.props.enableNoText)
        {
            for (i = 1; i <= props.pageData.texts.length; i++)
            {                
                Reactotron.log("adding player " + i + " for text " + partId + " (currentText = " + this.props.currentText + ")");
                players.push(new Sound(props.pageData.assetCode + '_' + i + '_audio.mp3', Sound.MAIN_BUNDLE, 
                    () => { numLoaded++; if (props.enableAutoplayAudio && numLoaded === numToLoad) { this.startAudio() }}));
            }
        }
        else
        {
            Reactotron.log("adding player for text " + partId + " (currentText = " + this.props.currentText + ")");
            players.push(new Sound(props.pageData.assetCode + '_' + (partId + 1) + '_audio.mp3', Sound.MAIN_BUNDLE,
                () => {if (props.enableAutoplayAudio) { this.startAudio() }}));            
        }
        Reactotron.log(players);
        this.setState({playingSound: players})
    }

    startAudio()
    {
        this.toggleReading(true);
    }
    
    loadSoundEffect(newProps){                
        var player = new Sound(newProps.pageData.assetCode + '_soundeffect.mp3', Sound.MAIN_BUNDLE,
            () => {this.setState({soundEffect: player})});
    }   
    
    playSound()
    {
        if (this.state.soundEffect)
        {
            this.state.soundEffect.play();
        }
    } 

    playReading(i)
    {
        Reactotron.log("playing reading " + i);
        this.setState({currentPlayingSoundIndex: i});
        if ((i + 1) < this.state.playingSound.length)
        {
            this.state.playingSound[i].play(() => this.playReading(i + 1));
        }
        else
        {
            this.state.playingSound[i].play(() => this.setState({speaker: false, currentPlayingSoundIndex: 0}));
        }
    }

    restartReading()
    {
        if (this.state.playingSound)
        {
            for (i = 0; i < this.state.playingSound.length; i++)
            {
                this.state.playingSound[i].setCurrentTime(0);
            }
            this.setState({paused: false, speaker: true});
            this.playReading(0);
        }
    }

    stopReading()
    {        
        this.setState({paused:false, speaker:false});
        if (this.state.playingSound)
        {
            for (i = 0; i < this.state.playingSound.length; i++)
            {
                this.state.playingSound[this.state.currentPlayingSoundIndex].stop();
            }
        }
    }

    toggleReading(status)
    {
        if (status == null)
            status = !this.state.speaker;
        this.setState({speaker: status});
        var restarted = false;
        if (this.state.playingSound)
        {
            if (status)
            {
                this.setState({paused: false});
                for (i = 0; i < this.state.playingSound.length; i++)
                {
                    this.playReading(this.state.currentPlayingSoundIndex);
                    restarted = true;
                }
                if (!restarted)
                    this.restartReading();
            }
            else
            {
                this.setState({paused: true});
                for (i = 0; i < this.state.playingSound.length; i++)
                {
                    this.state.playingSound[this.state.currentPlayingSoundIndex].pause();
                }
            }
        }
    }

    componentWillMount()
    {
        this.loadReadingAudio(this.props, 0);
        this.loadSoundEffect(this.props);
    }

    componentWillUnmount()
    {
        this.setState({playingSound: []});
    }

    componentWillReceiveProps(newProps)
    {
        // this.setState({ 
        //         paused:false,
        //         currentText: 0, 
        //         speaker: false, 
        //         slideX: new Animated.Value  ((newProps.panDirection == "forward" ? 1 : -1) * Dimensions.get('window').width) 
        //     },
        //     () => this.animateIn());   
        if (newProps.pageData.id != this.props.pageData.id)
        {
            // we've navigated to a fresh page, load the audio
            this.stopReading();
            this.loadReadingAudio(newProps, newProps.currentText);
            this.loadSoundEffect(newProps);
        }
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
        if ((this.props.currentText < this.props.pageData.texts.length - 1))
        {            
            this.loadReadingAudio(this.props, this.props.currentText + 1);      
            this.props.changeText(1);
            this.setState({ paused: false, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText()); 
            this.stopReading();
        }
        else
        {
            this.props.navigation.navigate("EndPage");
        }
    }
    
    back()
    {
        Reactotron.log("currenttext = " + this.props.currentText )
        if (this.props.currentText == 0 || this.props.enableNoText)
        {
            this.setState({currentPlayingSoundIndex: 0});
            this.backtrack();
        }
        else
        {
            this.stopReading();
            this.loadReadingAudio(this.props, this.props.currentText - 1);
            this.props.changeText(-1);
            this.setState({paused: false, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText());
        }
    }

    backtrack()
    {
        if (this.props.pageHistory.length == 1)
        {
            this.stopReading();
            BackHandler.removeEventListener('hardwareBackPress', () => this.backHandler());
            this.props.navigation.navigate("TitlePage");
        }
        else
        {            
            this.stopReading();
            this.props.backtrack();
        }
    }

    getPageText()
    {
        return this.props.pageData.texts[this.props.currentText].text;
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

    home()
    {
        this.toggleReading(false); 
        this.props.clearHistory();
        this.props.navigation.navigate("MainMenu"); 
    }

    render()
    {
        let hasDecision = this.props.enableNoText || (this.props.currentText == (this.props.pageData.texts.length - 1) && this.props.pageData.navigationLinks.length > 0);
        let textPosition = this.props.pageData.texts[this.props.currentText].textPosition;
        let backgroundOpacity = this.props.pageData.texts[this.props.currentText].backgroundOpacity;
        if (!backgroundOpacity) backgroundOpacity = 0.6;
        if (!textPosition) textPosition = 'bottom';
        let leftPosition = '13%';
        let bottomPosition = '0%';
        let topPosition = '0%';
        let width = '74%';
        var backgroundColor = 'rgba(255,255,255,' + backgroundOpacity.toString() + ')';
        let pageTextView = this.props.enableNoText ? null : ( 
            <Animated.Text style={[ style.pageText, {backgroundColor:backgroundColor, opacity:this.state.textFadeOpacity, color:this.props.pageData.textColor }]}>
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
                                    
                        <View style={{flexDirection:'column', position:'absolute', bottom:bottomPosition, left:leftPosition, width:width, padding:5, alignItems:'center', justifyContent:'center'}}>                          
                                    {(textPosition == 'bottom') ? pageTextView : null}
                                <View style={[style.centeredContent, style.choiceButtonView]}>  
                                    {hasDecision ? 
                                        this.props.pageData.navigationLinks.map((nav) => 
                                            <TouchableOpacity key={nav.id} onPress={() => { this.setState({currentPlayingSoundIndex: 0}); this.props.incrementPageCounter(nav.targetPageId); this.props.choose(nav.targetPageId); } }>
                                                <Image source={getChoiceImageForPage(this.props.pageData.id, nav.order - 1)} resizeMode='contain' style={style.choiceButton} />
                                                {this.props.showChoiceCounters ? 
                                                    <View style={style.choiceCounterView}>
                                                        <Text style={style.text10}>{this.getPageCount(nav.targetPageId)}</Text>
                                                    </View> 
                                                : null }
                                            </TouchableOpacity>
                                            )
                                    : null}
                                </View>
                        </View>
                        {false?
                        <View style={style.topLeftButton}>
                            <TouchableOpacity onPress={() => this.backtrack()}>
                                <Image source={require('../../img/back.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </TouchableOpacity> 
                        </View>:null}
                        <View style={style.middleLeftButton}>
                                <TouchableOpacity onPress={() => this.back()}>
                                    <Image source={require('../../img/arrow_back.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                                </TouchableOpacity> 
                        </View>
                        <View style={style.middleRightButton}>
                            {!this.props.enableNoText && ((this.props.pageData.navigationLinks.length == 0) || (this.props.currentText < this.props.pageData.texts.length - 1)) ? 
                                <TouchableOpacity onPress={() => this.forward()}>
                                    <Image source={require('../../img/arrow_forward.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                                </TouchableOpacity>
                                : null }
                        </View>
                        {this.props.enableSoundEffects ? 
                        <View style={style.bottomRightButton}>
                            <TouchableOpacity onPress={() => this.playSound()}>
                                <Image source={require('../../img/speaker_on.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </TouchableOpacity>
                        </View> : null}        
                        {this.props.enableReadAloud ? 
                            <View style={style.bottomLeftButton}>
                                <TouchableOpacity onPress={() => { this.toggleReading(); }}>
                                    {this.state.speaker ? <Image source={require('../../img/pause.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} /> 
                                                        : <Image source={require('../../img/play.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />}
                                </TouchableOpacity> 
                            </View> 
                        : null}   
                        {this.props.enableReadAloud && this.state.paused ? 
                            <View style={style.bottomLeftUpButton}>
                                <TouchableOpacity onPress={() => { this.restartReading(); }}>
                                    <Image source={require('../../img/restart.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} /> 
                                </TouchableOpacity> 
                            </View> 
                        : null}                            
                        <View style={style.topRightButton}>
                            <TouchableOpacity onPress={() => this.home()}>
                                <Image source={require('../../img/home.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </TouchableOpacity>
                        </View>
                    </Image>
                </Animated.View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);