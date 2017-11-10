import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getEndForBook, getEndSoundForBook } from './resourceManager.js'
var Sound = require('react-native-sound');


function mapStateToProps(state) {
    return { 
        book: state.changePage.activeBook,
        enableSoundEffects: state.changeSettings.enableSoundEffects
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        backtrack: () => dispatch(backtrack()),
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
        var sound = new Sound(getEndSoundForBook(this.props.book.id), Sound.MAIN_BUNDLE);
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
        this.props.changePage(this.props.book.pages[0].id)
        this.props.navigation.navigate("Page");
    }

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getEndForBook(this.props.book.id, true)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch' />
                    <TouchableOpacity style={style.topLeftButton} onPress={() => this.backtrack()}>
                        <Image source={require('../../img/back.png')} resizeMode="contain" style={{width:'100%', height:'100%'}}  />
                    </TouchableOpacity>
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
                    <TouchableOpacity style={style.centerBottomLargeButton} onPress={() => this.startBook()}>
                        <Image style={style.fill} source={require('../../img/start_button.png')} resizeMode="contain" />
                    </TouchableOpacity>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);