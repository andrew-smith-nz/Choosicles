import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getEndForBook, getEndSoundForBook } from './resourceManager.js'
import { Player } from 'react-native-audio-toolkit';


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
        var player = new Player(getEndSoundForBook(this.props.book.id), { autoDestroy:false });
        player.prepare(() => {this.setState({soundEffect: player})});
    }   

    playSound()
    {
        if (this.state.soundEffect)
        {
            this.state.soundEffect.play();
        }
    } 

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getEndForBook(this.props.book.id, true)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch' />
                    <TouchableOpacity style={style.topLeftButton} onPress={() => this.backtrack()}>
                        <Image source={require('../../img/back.png')} resizeMode="contain" style={{width:'100%', height:'100%'}}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.props.navigation.navigate("MainMenu")}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity>
                    {this.props.enableSoundEffects ? 
                        <View style={style.bottomRightButton}>
                            <TouchableOpacity onPress={() => this.playSound()}>
                                <Image source={require('../../img/sound_effect.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </TouchableOpacity>
                        </View> 
                    : null}     
                    
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);