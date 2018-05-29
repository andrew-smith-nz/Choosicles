import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Input, ActivityIndicator } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { addBooksById } from '../actions/store';
import Reactotron from 'reactotron-react-native';
import DeviceInfo from 'react-native-device-info';

function mapStateToProps(state) {
    return { 
        ownedBooks: state.products.ownedBooks
    };
}

function mapDispatchToProps(dispatch)
{
    return { 
        addBooksById: (books) => dispatch(addBooksById(books))
    };
}

class Sync extends Component {
    constructor(props)
    {
        super(props);
        //this.state = { email: "", password: "", syncInProgress: false, syncComplete: false, syncResult: [], syncSuccess: false }
        this.state = { email: "", password: "", syncInProgress: false, syncComplete: false, syncResult: [], syncSuccess: false }
    }

    startSync()
    {
        this.setState({syncInProgress: true});
        //this.state.syncResult = this.props.trySync(this.state.email, this.state.password);

        var body = {
            Email: this.state.email,
            Password: this.state.password,
            DeviceOS: DeviceInfo.getSystemName(),
            DeviceName: DeviceInfo.getDeviceName(),
            DeviceUUID: DeviceInfo.getUniqueID(),
            DeviceOwnedBooks: this.props.ownedBooks
        };
Reactotron.log(JSON.stringify(body));
        var url = 'http://www.choosicles.com/api/sync/';
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(function(data) { return data.json(); })
            .then(function(actualData) {
                if (actualData.Success)
                {
                    this.props.addBooksById(actualData.BooksOwned);
                    this.setState({syncComplete: true, syncResult: actualData.Messages, syncSuccess: true });
                }
                else
                {
                    this.setState({syncComplete: true, syncResult: actualData.Messages, syncSuccess: false });
                }
                this.setState({syncInProgress: false});
            }.bind(this))
            .catch(function(error) {
                Reactotron.log(error.message)
                this.setState({syncInProgress: false, syncComplete: true, syncSuccess: false, syncResult: ["Sorry, something went wrong.  Please check your internet connection and try again in a few minutes.  If this error persists please contact us."] });
            }.bind(this));
    }

    displayMessages()
    {
        if (this.state.syncResult)
            return this.state.syncResult.map(s => { return <Text style={[style.boldText16]} key={s}>{s}</Text>; });
    }

    render()
    {
        return (this.state.syncComplete) ?
        
        <View style={{flex:1, flexDirection:'column', width:'100%', height:'100%', padding:20, backgroundColor:'#F7E19E', borderColor:'black', borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flex:2, flexDirection:'column', height:'100%'}}>
                {this.displayMessages()}
            </View>
            {this.state.syncSuccess ?
            <TouchableOpacity style={{flex: 1, width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.props.cancelCallback()}>
                <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                    <Text style={[style.boldText16, style.buttonText]}>Close</Text>
                </Image>
            </TouchableOpacity>
            : 
            <TouchableOpacity style={{flex: 1, width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.setState({syncComplete: false})}>
                <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                    <Text style={[style.boldText16, style.buttonText]}>Back</Text>
                </Image>
            </TouchableOpacity>
            }
        </View>
        :
        
        <View style={{flex:1, flexDirection:'column', width:'100%', height:'100%', padding:20, backgroundColor:'#F7E19E', borderColor:'black', borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flex:1}}>
                <Text style={style.boldText16}>Enter your www.choosicles.com login to synchronise your purchases.</Text>
            </View>
            <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={[style.boldText16, style.syncLabel]}>Email Address</Text>
                <TextInput underlineColorAndroid='transparent' style={[style.textInput, style.boldText16]} onChangeText={(text) => { this.setState({email: text })}} value={this.state.email} />
            </View>
            <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={[style.boldText16, style.syncLabel]}>Password</Text>
                <TextInput underlineColorAndroid='transparent' secureTextEntry={true} style={[style.textInput, style.boldText16]} onChangeText={(text) => { this.setState({password: text })}} value={this.state.password} />
            </View>
            <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
                
            {this.state.syncInProgress ?
                <View style={{width:'20%', alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator size="large" />
                </View> :
                <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.startSync()}>
                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                        <Text style={[style.boldText16, style.buttonText]}>Sync</Text>
                    </Image>
                </TouchableOpacity>}
                <View style={{width:'20%'}} />
                <TouchableOpacity style={{width:'20%', alignItems:'center', justifyContent:'center', padding:1}} onPress={() => this.props.cancelCallback()}>
                    <Image style={{width:'100%', alignItems:'center', justifyContent:'center'}} source={require('../../img/button.png')} resizeMode="contain">
                        <Text style={[style.boldText16, style.buttonText]}>Cancel</Text>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sync);