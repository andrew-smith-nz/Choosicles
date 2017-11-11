import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getEndForBook, getEndSoundForBook } from './resourceManager.js'
import { backtrack, changePage, clearHistory } from '../actions/book.js';
var Sound = require('react-native-sound');
import { NavigationActions } from 'react-navigation';


function mapStateToProps(state) {
    return { 
        book: state.changePage.activeBook,
        enableSoundEffects: state.changeSettings.enableSoundEffects,
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
    }
    
    backtrack()
    {
        this.props.navigation.navigate("Page");
    }

    componentWillMount()
    {
        this.loadSoundEffect();
    }
    
    loadSoundEffect(){                
        var sound = new Sound(getEndSoundForBook(this.props.book.id), Sound.MAIN_BUNDLE, 
        () => { if (this.props.enableAutoplayAudio) { sound.play(); } } );  
        this.setState({soundEffect: sound});
    }   

    playSound()
    {
        if (this.state.soundEffect)
        {
            this.state.soundEffect.play();
        }
    } 
    
    startBook()
    {
        this.props.clearHistory();
        this.props.changePage(this.props.book.pages[0].id)
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Page'})]
                }));
    }

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getEndForBook(this.props.book.id, true)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch' />
                    <TouchableOpacity style={style.middleLeftButton} onPress={() => this.backtrack()}>
                        <Image source={require('../../img/arrow_back.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity> 
                    {this.props.enableSoundEffects ? 
                        <View style={style.bottomRightButton}>
                            <TouchableOpacity onPress={() => this.playSound()}>
                                <Image source={require('../../img/speaker_on.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </TouchableOpacity>
                        </View> 
                    : null}     
                    <TouchableOpacity style={style.centerBottomLargerButton} onPress={() => this.startBook()}>
                        <Image style={style.fill} source={require('../../img/start_again.png')} resizeMode="contain" />
                    </TouchableOpacity>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);