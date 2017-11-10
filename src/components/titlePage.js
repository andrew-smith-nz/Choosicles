import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getCoverForBook } from './resourceManager.js';
import { backtrack, clearHistory, changePage} from '../actions/book.js';
import { getStartAudioForBook } from './resourceManager.js'
var Sound = require('react-native-sound');
import Reactotron from 'reactotron-react-native';


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
        BackHandler.addEventListener('hardwareBackPress', () => this.backHandler());
        this.state = {speaker:false}
    }

    loadAudio()
    {
        var sound = new Sound(getStartAudioForBook(this.props.book.id), Sound.MAIN_BUNDLE, 
            () => { if (this.props.enableAutoplayAudio) { this.setState({speaker:true}); sound.play(); }});  
        this.setState({sound: sound});
    }

    toggleReading(status)
    {
        if (status == null)
            status = !this.state.speaker;
        this.setState({speaker: status});
        var restarted = false;
        if (this.state.sound)
        {
            if (status)
            {                
                this.state.sound.play();
            }
            else
            {
                this.setState({paused: true});
                this.state.sound.pause();
            }
        }
    }
    
    restartReading()
    {
        if (this.state.sound)
        {
            this.state.sound.setCurrentTime(0);
            this.toggleReading();
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
        this.props.navigation.navigate("Page");
    }

    componentWillMount(){
        this.loadAudio();
    }

    home()
    {
        if (this.state.sound)
            this.state.sound.release();
        this.props.navigation.navigate("MainMenu")
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
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlePage);