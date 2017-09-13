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
    };
}

class TitlePage extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getCoverForBook(this.props.book.id)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='contain'>
                        <Text style={{fontWeight:'bold', fontSize:48, textAlign:'center', color:'black', backgroundColor:'rgba(221, 221, 221, 0.7)'}}>{this.props.book.title}</Text>
                    </Image>
                    <View style={{position:'absolute', left:0, bottom:20, width:'100%', zIndex: 0, alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity style={{borderWidth:0.5, borderColor:'black', padding:5, backgroundColor:'white'}} onPress={() => this.props.navigation.navigate("Page")}>
                            <Text style={{fontWeight:'bold', fontSize:24, padding:10}}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlePage);