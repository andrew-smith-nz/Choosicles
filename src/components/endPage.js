import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getCoverForBook } from './resourceManager.js'


function mapStateToProps(state) {
    return { 
        book: state.changePage.activeBook
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

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getCoverForBook(this.props.book.id, true)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch' />
                    <TouchableOpacity style={style.topLeftButton} onPress={() => this.backtrack()}>
                        <Image source={require('../../img/back.png')} resizeMode="contain" style={{width:'100%', height:'100%'}}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.props.navigation.navigate("MainMenu")}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);