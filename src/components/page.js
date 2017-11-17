import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Dimensions, Modal, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { getImageForPage, getSoundEffectForPage, getChoiceImageForPage } from './resourceManager.js'
import { backtrack, changePage, clearHistory, incrementPageCounter, changeText } from '../actions/book.js';
import { connect } from 'react-redux';
import NameMonster from './nameMonster.js';
import ShadowText from './shadowText.js';
import Reactotron from 'reactotron-react-native';
import { NavigationActions } from 'react-navigation';
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
        enableShowText: state.changeSettings.enableShowText,
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
        //this.loadReadingAudio = this.loadReadingAudio.bind(this);
        this.state = { 
            speaker: false, 
            slideX: new Animated.Value(Dimensions.get('window').width), 
            textFadeOpacity: new Animated.Value(0),
            nameMonsterVisible: false,
            tabletMode: false,
            audioPaused: !props.enableAutoplayAudio,
            currentPlayingAudioIndex: 0,
            audioIsLoaded: false,
            initialisingAudio: false,
            canRestartAudio: false ,
            soundEffects: []      
        };
        this._slideProgress = new Animated.Value(0);
    }

    componentWillMount()
    {
        this.initialiseAudio(this.props, true);
    }
    
    componentWillReceiveProps(newProps)
    {
        if (newProps.currentText != this.props.currentText || newProps.pageData.id != this.props.pageData.id)
        {
            this.initialiseAudio(newProps, (newProps.pageData.id != this.props.pageData.id));
        }
    }

    componentWillUnmount()
    {
        this.releaseAudioPlayers();
        this.releaseSoundEffects();
    }
    
    componentDidMount()
    {
        this.fadeInText();
        this.animateIn();
        BackHandler.addEventListener('hardwareBackPress', () => this.backHandler());
    }
    
    initialiseAudio(props, initSoundEffect)
    {
        if (this.state.initialisingAudio) return;
        this.setState({initialisingAudio: true, audioPaused: !this.props.enableAutoplayAudio, canRestartAudio: false});
        var players = [];
        this.releaseAudioPlayers();
        if (initSoundEffect)
            this.releaseSoundEffects();
        if (props.enableShowText)
        {
            var sound = new Sound(props.pageData.assetCode + '_' + (props.currentText + 1) + '_audio.mp3', Sound.MAIN_BUNDLE, 
                () => { 
                    players.push(sound);
                    if (props.enableAutoplayAudio) 
                        this.playAudio(0); 
                    });
        }
        else
        {
            for (i = 1; i <= props.pageData.texts.length; i++)
            {     
                let isFirst = (i == 1);
                let sound = new Sound(props.pageData.assetCode + '_' + i + '_audio.mp3', Sound.MAIN_BUNDLE, 
                () => { 
                    players.push(sound);
                    if (props.enableAutoplayAudio && isFirst) 
                        this.playAudio(0); 
                    });
            }
        }
        this.setState({audioPlayers: players, initialisingAudio: false});

        if (initSoundEffect)
            this.loadSoundEffects(props.pageData.assetCode);
    }
    
    setCanRestartAudio()
    {        
        this.setState({canRestartAudio: false});
        if (this.state.audioPlayers)
        {
            for (i = 0; i < this.state.audioPlayers.length; i++)
                this.state.audioPlayers[i].getCurrentTime(function(seconds, isPlaying) { if (seconds > 0) this.setState({canRestartAudio: true}) }.bind(this))
        }
    }
    
    loadSoundEffects(assetCode){    
        this.setState({soundEffects: []});
        var i = 1;
        while (i <= 3)
        {
            let player = new Sound(assetCode + '_' + i + '_soundeffect.mp3', Sound.MAIN_BUNDLE, () => {this.state.soundEffects.push(player)});
            i++;
        }
    }   

    stopAllPlayers()
    {        
        if (this.state.audioPlayers)
        {
            for (i = 0; i < this.state.audioPlayers.length; i++)
            {
                this.state.audioPlayers[i].stop();
            }
        }
    }
    
    releaseAudioPlayers()
    {        
        if (this.state.audioPlayers)
        {
            for (i = 0; i < this.state.audioPlayers.length; i++)
            {
                this.state.audioPlayers[i].release();
            }
        }
        this.setState({audioPaused: !this.props.enableAutoplayAudio});
    }

    releaseSoundEffects()
    {
        if (this.state.soundEffects)
        {
            for (i = 0; i < this.state.soundEffects.length; i++)
            {
                this.state.soundEffects[i].release();
            }
        }
    }

    playAudio(i)
    {
        this.setState({currentPlayingAudioIndex: i});
        if (this.state.audioPlayers && this.state.audioPlayers[i])
        {
            this.setState({audioPaused:false});
            this.state.audioPlayers[i].play(() => { 
                if (this.props.enableShowText && this.props.currentText < this.props.pageData.texts.length - 1)
                {                    
                    this.forward();
                }
                else if (!this.props.enableShowText && this.state.audioPlayers.length > i + 1) 
                    this.playAudio(i + 1); 
                else
                    this.setState({audioPaused: true});
            })
        }
    }

    pauseAudio(){
        if (this.state.audioPlayers)
        {
            for (i = 0; i < this.state.audioPlayers.length; i++)
                this.state.audioPlayers[i].pause(() => { this.setState({audioPaused:true})});
        }
        this.setCanRestartAudio();
    }

    restartAudio()
    {
        if (this.state.audioPlayers)
        {
            this.state.audioPlayers[0].setCurrentTime(0).stop(() => this.playAudio(0));
            for (i = 1; i < this.state.audioPlayers.length; i++)
                this.state.audioPlayers[i].setCurrentTime(0).stop();
        }
    }
    
    playSoundEffect(i)
    {
        if (this.state.soundEffects.length > 0)
        {
            var order = [];
            for (i = 0; i < this.state.soundEffects.length; i++)
            {
                order.push(i);
            }
            order = this.shuffle(order);
            this.trySoundEffect(order, 0);
        }
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }     
        return array;
      }

    trySoundEffect(order, i)
    {
        if (i >= order.length) return;
        let effect = this.state.soundEffects[order[i]];
        effect.getCurrentTime((seconds, isPlaying) => { 
             if (!isPlaying)
             {
                 this.state.soundEffects[order[i]].play(
                    //  (success) => {
                    // if (success) {
                    //     Reactotron.log('successfully finished playing');
                    // } else {
                    //     Reactotron.log('playback failed due to audio decoding errors');
                    //   // reset the player to its uninitialized state (android only)
                    //   // this is the only option to recover after an error occured and use the player again
                    //   //whoosh.reset();
                    // }}
                );
             }
             else
             {
                this.trySoundEffect(order, i + 1);
             }
        });
    }

    toggleAudio()
    {
        if (this.state.audioPaused)
        {
            this.playAudio(this.state.currentPlayingAudioIndex);
        }
        else
        {
            this.pauseAudio();
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
        if (this.props.currentText < this.props.pageData.texts.length - 1 && !(!this.props.enableShowText && this.props.pageData.navigationLinks.length == 0))
        {            
            this.props.changeText(1);
            this.setState({ textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText()); 
        }
        else
        {
            this.props.navigation.dispatch(NavigationActions.reset(
                {
                   index: 0,
                   actions: [
                     NavigationActions.navigate({ routeName: 'EndPage'})
                   ]
                 }));
        }
    }
    
    back()
    {
        if (this.props.currentText == 0 || !this.props.enableShowText)
        {
            this.backtrack();
        }
        else
        {
            this.props.changeText(-1);
            this.setState({textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText());
        }
    }

    backtrack()
    {
        if (this.props.pageHistory.length == 1)
        {
            this.releaseAudioPlayers();
            this.releaseSoundEffects();
            BackHandler.removeEventListener('hardwareBackPress', () => this.backHandler());
            this.props.navigation.dispatch(NavigationActions.reset(
                {
                   index: 0,
                   actions: [
                     NavigationActions.navigate({ routeName: 'TitlePage'})
                   ]
                 }));
        }
        else
        {            
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
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [ NavigationActions.navigate({ routeName: 'MainMenu'})]
            }));
        }
    }

    getPageCount(pageId)
    {
        var count = this.props.pageCounters.filter(c => c.pageId === pageId)[0]
        return count ? count.count : 0;
    }

    home()
    {
        this.releaseAudioPlayers();
        this.releaseSoundEffects();
        this.props.clearHistory();
        this.props.navigation.dispatch(NavigationActions.reset({
               index: 0,
               actions: [ NavigationActions.navigate({ routeName: 'MainMenu'})]
             }));
    }

    choose(targetPageId)
    {
        this.releaseAudioPlayers();
        this.releaseSoundEffects();
        this.setState({currentPlayingAudioIndex: 0, audioPaused: false}); 
        this.props.incrementPageCounter(targetPageId); 
        this.props.choose(targetPageId); 
    }

    render()
    {
        let hasDecision = !this.props.enableShowText || (this.props.currentText == (this.props.pageData.texts.length - 1) && this.props.pageData.navigationLinks.length > 0);
        let textPosition = this.props.pageData.texts[this.props.currentText].textPosition;
        let backgroundOpacity = this.props.pageData.texts[this.props.currentText].backgroundOpacity;
        if (!backgroundOpacity) backgroundOpacity = this.props.pageData.backgroundOpacity;
        if (!backgroundOpacity) backgroundOpacity = 0.6;
        if (!textPosition) textPosition = 'bottom';
        let leftPosition = '13%';
        let bottomPosition = '0%';
        let topPosition = '0%';
        let width = '74%';
        var backgroundColor = 'rgba(255,255,255,' + backgroundOpacity.toString() + ')';
        let pageTextView = !this.props.enableShowText ? null : ( 
            <Animated.Text style={[ style.pageText, {backgroundColor:backgroundColor, opacity:this.state.textFadeOpacity, color:this.props.pageData.textColor }]}>
                {this.getPageText()}
            </Animated.Text> );
        return (
                <Animated.View style={[style.pageView, {transform: [
                    {
                    translateX: this.state.slideX
                    }
                ]}]}>
                    <Image style={{flex:1, width:"100%", height:"100%", backgroundColor:'black'}} source={getImageForPage(this.props.pageData.id)} resizeMode="contain">
                        <View style={{position:'absolute', left:leftPosition, top:topPosition, width:width}}>
                               {(textPosition == 'top') ? pageTextView : null}
                        </View>
                                    
                        <View style={{flexDirection:'column', position:'absolute', bottom:bottomPosition, left:leftPosition, width:width, padding:5, alignItems:'center', justifyContent:'center'}}>                          
                                    {(textPosition == 'bottom') ? pageTextView : null}
                                <View style={[style.centeredContent, style.choiceButtonView]}>  
                                    {hasDecision ? 
                                        this.props.pageData.navigationLinks.map((nav) => 
                                            <TouchableOpacity key={nav.id} onPress={() => { this.choose(nav.targetPageId) } }>
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
                            {(!this.props.enableShowText && (this.props.pageData.navigationLinks.length == 0)) || (this.props.enableShowText && ((this.props.pageData.navigationLinks.length == 0) || (this.props.currentText < this.props.pageData.texts.length - 1))) ? 
                                <TouchableOpacity onPress={() => this.forward()}>
                                    <Image source={require('../../img/arrow_forward.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                                </TouchableOpacity>
                                : null }
                        </View>
                        {this.props.enableSoundEffects ? 
                        <View style={style.bottomRightButton}>
                            <TouchableOpacity onPress={() => this.playSoundEffect()}>
                                <Image source={require('../../img/speaker.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </TouchableOpacity>
                        </View> : null}        
                        {this.props.enableReadAloud ? 
                            <View style={style.bottomLeftButton}>
                                <TouchableOpacity onPress={() => { this.toggleAudio(); }}>
                                    {this.state.audioPaused ? <Image source={require('../../img/play.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} /> 
                                                        : <Image source={require('../../img/pause.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />}
                                </TouchableOpacity> 
                            </View> 
                        : null}   
                        {this.props.enableReadAloud && this.state.audioPaused && this.state.canRestartAudio ? 
                            <View style={style.bottomLeftUpButton}>
                                <TouchableOpacity onPress={() => { this.restartAudio(); }}>
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