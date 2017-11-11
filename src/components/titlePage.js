import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getCoverForBook } from './resourceManager.js';
import { backtrack, clearHistory, changePage} from '../actions/book.js';
import { getStartAudioForBook } from './resourceManager.js'
var Sound = require('react-native-sound');
import Reactotron from 'reactotron-react-native';
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
        changePage: (pageId) => dispatch(changePage(pageId)),
    };
}

class TitlePage extends Component
{
    constructor(props)
    {
        super();
        this.backtrack = this.backtrack.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
        this.setCanRestartAudio = this.setCanRestartAudio.bind(this);
        BackHandler.addEventListener('hardwareBackPress', () => this.backHandler());
        this.state = {audioPaused:!props.enableAutoplayAudio, canRestartAudio: false}
    }

    loadAudio()
    {
        if (this.state.initialisingAudio) return;
        this.setState({initialisingAudio: true});

        var sound = new Sound(getStartAudioForBook(this.props.book.id), Sound.MAIN_BUNDLE, 
            () => { if (this.props.enableAutoplayAudio) { sound.play(); }});  
        
        this.setState({audioPlayers: [ sound ], initialisingAudio: false});
    }
    
    componentWillUnmount()
    {
        if (this.state.audioPlayers)
            this.state.audioPlayers[0].release();
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
    
    backHandler()
    {
        this.backtrack(); 
        return true; 
    }
    
    backtrack()
    {
        if (this.state.sound)
            this.state.sound.release();
        this.props.clearHistory();
        this.props.navigation.navigate("MainMenu");
    }

    startBook()
    {
        if (this.state.sound)
            this.state.sound.release();
        this.props.changePage(this.props.book.pages[0].id)
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Page'})]
                }));
    }

    componentWillMount(){
        this.loadAudio();
    }

    home()
    {
        if (this.state.sound)
            this.state.sound.release();
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'MainMenu'})]
                }));
    }

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getCoverForBook(this.props.book.id, true)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch' />
                    <TouchableOpacity style={style.centerBottomLargeButton} onPress={() => this.startBook()}>
                        <Image style={style.fill} source={require('../../img/start_button.png')} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.home()}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity>
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
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlePage);