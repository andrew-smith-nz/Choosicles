import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getCoverForBook } from './resourceManager.js';
import { backtrack, clearHistory } from '../actions/book.js';


function mapStateToProps(state) {
    return { 
        book: state.changePage.activeBook
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        backtrack: () => dispatch(backtrack()),
        clearHistory: () => dispatch(clearHistory()),
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
    }
    
    backHandler()
    {
        this.backtrack(); return true; 
    }
    
    backtrack()
    {
        this.props.clearHistory();
        this.props.navigation.navigate("MainMenu");
    }

    render()
    {
        return  (<View style={{flex:1, backgroundColor:'transparent'}}>
                    <Image source={getCoverForBook(this.props.book.id)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}} resizeMode='stretch'>
                    </Image>
                    <View style={{position:'absolute', left:5, top:5, width:50, height:50}}>
                        <TouchableOpacity onPress={() => this.backtrack()}>
                            <Image source={require('../../img/back.png')} style={{width:50, height:50}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute', left:0, bottom:20, width:'100%', zIndex: 0, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
                        <TouchableOpacity style={{borderWidth:0.5, borderColor:'black', padding:5, backgroundColor:'transparent'}} onPress={() => this.props.navigation.navigate("Page")}>
                            <Text style={[style.boldText24, {padding:10}]}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlePage);