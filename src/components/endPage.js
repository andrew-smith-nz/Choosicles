import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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
                    <Image source={getCoverForBook(this.props.book.id)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch'>
                        <Text style={{fontWeight:'bold', fontSize:48, textAlign:'center', color:'black', backgroundColor:'rgba(221, 221, 221, 0.7)'}}>The End</Text>
                    </Image>
                    <View style={{position:'absolute', left:0, bottom:20, width:'100%', zIndex: 0, alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MainMenu")}>
                            <Image source={require('../../img/home_large.png')} style={{width:100, height:100}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute', left:10, top:10, width:50, height:50}}>
                        <TouchableOpacity onPress={() => this.backtrack()}>
                            <Image source={require('../../img/back.png')} style={{width:50, height:50}} />
                        </TouchableOpacity> 
                    </View>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);