import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getEndForBook, getEndAudioForBook } from './resourceManager.js'
import { backtrack, changePage, clearHistory } from '../actions/book.js';
var Sound = require('react-native-sound');
import { NavigationActions } from 'react-navigation';


function mapStateToProps(state) {
    return { 
        book: state.changePage.activeBook,
        enableReadAloud: state.changeSettings.enableReadAloud,
        enableAutoplayAudio: state.changeSettings.enableAutoplayAudio
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        backtrack: () => dispatch(backtrack()),
        clearHistory: () => dispatch(clearHistory()),
        changePage: (id) => dispatch(changePage(id))
    };
}

class EndPage extends Component
{
    constructor(props)
    {
        super();
        this.state = {audioPaused:!props.enableReadAloud, canRestartAudio: false}
    }
    
    backtrack()
    {
        this.releaseAudioPlayers();
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Page'})]
                }));
    }

    componentWillMount()
    {
        this.loadAudio();
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

    loadAudio()
    {
        if (this.state.initialisingAudio) return;
        this.setState({initialisingAudio: true});

        var sound = new Sound(getEndAudioForBook(this.props.book.id), Sound.MAIN_BUNDLE, 
            () => { if (this.props.enableAutoplayAudio) { this.playAudio(0); }});  
        
        this.setState({audioPlayers: [ sound ], initialisingAudio: false});
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

    toggleAudio()
    {
        if (this.state.audioPaused)
        {
            this.playAudio(0);
        }
        else
        {
            this.pauseAudio();
        }
    }

    playAudio(i)
    {
        this.setState({currentPlayingAudioIndex: i});
        if (this.state.audioPlayers)
        {
            this.setState({audioPaused:false});
            this.state.audioPlayers[i].play(() => { 
                if (this.state.audioPlayers.length > i + 1) 
                    this.playAudio(i + 1); 
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
    
    startBook()
    {
        this.releaseAudioPlayers();
        this.props.clearHistory();
        this.props.changePage(this.props.book.pages[0].id)
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Page'})]
                }));
    }
    
    home()
    {
        this.releaseAudioPlayers();
        this.props.clearHistory();
        this.props.navigation.dispatch(NavigationActions.reset({
               index: 0,
               actions: [ NavigationActions.navigate({ routeName: 'MainMenu'})]
             }));
    }

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getEndForBook(this.props.book.id, true)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch' />
                    <TouchableOpacity style={style.middleLeftButton} onPress={() => this.backtrack()}>
                        <Image source={require('../../img/arrow_back.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity> 
                    {/* {this.props.enableSoundEffects ? 
                        <View style={style.bottomRightButton}>
                            <TouchableOpacity onPress={() => this.playAudio()}>
                                <Image source={require('../../img/speaker.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </TouchableOpacity>
                        </View> 
                    : null}      */}
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
                    <View style={{flexDirection:'column', padding:5, alignItems:'center', justifyContent:'center'}}>                          
                        <TouchableOpacity style={style.centerBottomLeftLargerButton} onPress={() => this.startBook()}>
                            <Image style={style.fill} source={require('../../img/play_large.png')} resizeMode="contain" />
                        </TouchableOpacity>  
                        <TouchableOpacity style={style.centerBottomRightLargerButton} onPress={() => this.home()}>
                            <Image style={style.fill} source={require('../../img/home_large.png')} resizeMode="contain" />
                        </TouchableOpacity>       
                    </View>               
                    <View style={style.topRightButton}>
                        <TouchableOpacity onPress={() => this.home()}>
                            <Image source={require('../../img/home.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                        </TouchableOpacity>
                    </View>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);