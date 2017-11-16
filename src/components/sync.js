import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Input, ActivityIndicator } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { trySyncWithWebsite, setSyncComplete } from '../actions/store';
import Reactotron from 'reactotron-react-native';

function mapStateToProps(state) {
    return { 
        syncComplete: state.sync.syncComplete,
        syncResult: state.sync.syncResult,
    };
}

function mapDispatchToProps(dispatch)
{
    return { 
        trySync: (email, password) => dispatch(trySyncWithWebsite(email, password)),
    };
}

class Sync extends Component {
    constructor(props)
    {
        super(props);
        this.state = { email: "vulpesnz@gmail.com", password: "ajs123", syncInProgress: false, syncComplete: false }
    }

    startSync()
    {
        this.setState({syncInProgress: true});
        this.state.syncResult = this.props.trySync(this.state.email, this.state.password);
    }

    render()
    {
        return (this.props.syncComplete) ?
        
        <View style={{flex:1, flexDirection:'column', width:'100%', height:'100%', padding:20, backgroundColor:'#F7E19E', borderColor:'black', borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'space-between'}}>
            <Text style={[style.boldText16]}>{this.props.syncResult}</Text>
            <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.props.cancelCallback()}>
                <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                    <Text style={[style.boldText16, { textAlign:"center", lineHeight: 25 * global.HEIGHT_RATIO} ]}>Close</Text>
                </Image>
            </TouchableOpacity>
        </View>
        :
        
        <View style={{flex:1, flexDirection:'column', width:'100%', height:'100%', padding:20, backgroundColor:'#F7E19E', borderColor:'black', borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flex:1}}>
                <Text style={style.boldText16}>Enter your login details for Choosicles.com to retrieve your purchases.</Text>
            </View>
            <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={[style.boldText16, {width:100 * global.WIDTH_RATIO}]}>Email Address</Text>
                <TextInput underlineColorAndroid='transparent' style={[style.textInput, style.boldText16]} onChangeText={(text) => { this.setState({email: text })}} value={this.state.email} />
            </View>
            <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={[style.boldText16, {width:100 * global.WIDTH_RATIO}]}>Password</Text>
                <TextInput underlineColorAndroid='transparent' secureTextEntry={true} style={[style.textInput, style.boldText16]} onChangeText={(text) => { this.setState({password: text })}} value={this.state.password} />
            </View>
            <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
                
            {this.props.syncInProgress ?
                <View style={{width:'20%', alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator size="large" />
                </View> :
                <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.startSync()}>
                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                        <Text style={[style.boldText16, { textAlign:"center", lineHeight: 25 * global.HEIGHT_RATIO} ]}>Submit</Text>
                    </Image>
                </TouchableOpacity>}
                <View style={{width:'20%'}} />
                <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.props.cancelCallback()}>
                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                        <Text style={[style.boldText16, { textAlign:"center", lineHeight: 25 * global.HEIGHT_RATIO} ]}>Cancel</Text>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sync);