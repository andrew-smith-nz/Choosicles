import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { changeName, backtrack } from '../actions/book.js'

function mapStateToProps(state) {
    return { 
        name: state.changeName.name
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        changeName: (name) => dispatch(changeName(name))
    };
}

class NameMonster extends Component {
    constructor(props)
    {
        super(props);
        this.state = {name: this.props.name}
    }

    render()
    {
        return <View style={{flex:1, flexDirection:'column', width:'100%', height:'100%', padding:20, backgroundColor:'white', borderColor:'black', borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'space-between'}}>
                    <Text>What is your pet monster called?</Text>
                    <TextInput autoCapitalize="sentences" underlineColorAndroid='transparent' style={{margin:5, padding:5, width:'80%', borderColor:'black', borderWidth:0.5, borderRadius:5}} onChangeText={(text) => { this.setState({name: text })}} value={this.state.name} />
                    <TouchableOpacity style={{padding:10, height:35, width:'60%', alignItems:'center', borderColor:'black', borderWidth:0.5, borderRadius:10}} 
                        onPress={() => { this.props.changeName(this.state.name); this.props.callback() }}>
                        <Text>OK</Text>
                    </TouchableOpacity>
                </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameMonster);