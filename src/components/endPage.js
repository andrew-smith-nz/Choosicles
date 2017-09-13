import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return { 
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
    };
}

class EndPage extends Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={require("../../img/pages/b86a34c8-1103-450d-a3dc-1b18da529f5b/cover.png")} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch'>
                    </Image>
                    <View style={{position:'absolute', left:0, bottom:20, width:'100%', zIndex: 0, alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity style={{borderWidth:0.5, borderColor:'black', padding:5, backgroundColor:'white'}} onPress={() => this.props.navigation.navigate("MainMenu")}>
                            <Text style={{fontWeight:'bold', fontSize:16}}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);