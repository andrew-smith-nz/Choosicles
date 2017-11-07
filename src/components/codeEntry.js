import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Picker, Alert } from 'react-native';
import style from '../../style/style.js';
import Reactotron from 'reactotron-react-native';

const bookData = require('../../books.json');

export default class CodeEntry extends Component
{
    constructor(props)
    {
        super();
        this.tryRedeemCode = this.tryRedeemCode.bind(this);
        this.buildBookPicker = this.buildBookPicker.bind(this);
        this.state = { giftCode: "", responseText:"", chooseABook:false, codeValid:false }
    }

    tryRedeemCode()
    {   
        var code = this.state.giftCode;
        var isValid = false;
        var booksAllowed;
        var mulitpleBooks = false;
        var url = 'http://www.choosicles.com/api/verifycode/' + code;
        fetch(url)
            .then(function(data) { return data.json(); })
            .then(function(actualData) {
                if (!actualData.Valid)
                {
                    var  responseText="Sorry, that does not appear to be a valid gift code.  If you believe the code should be valid, please contact support at techmonster@choosicles.com and we will investigate.";
                    this.setState({responseText, codeValid:false});
                }
                var booksAllowed = actualData.Books;
                var multipleBooks = actualData.MultipleBooks;
                if (booksAllowed.length == 1)
                {
                    var responseText = "This code is valid for " + this.constructBookTitleList(booksAllowed) + ".  Would you like to redeem it now?";
                    this.setState({responseText, codeValid:true});
                }
                if (booksAllowed.length > 1 && !booksAllowed.multipleBooks)
                {
                    var responseText = "This code is valid for one Choosicles book of your choice.  Please select from the following:";
                    this.setState({responseText, codeValid:true, chooseABook:true});
                }
                if (booksAllowed.length > 1 && booksAllowed.multipleBooks)
                {
                    var responseText = "This code is valid for  " + booksAllowed.length + " Choosicles books: " + this.constructBookTitleList(booksAllowed) + ".  Would you like to redeem it now?";
                    this.setState({responseText, codeValid:true});
                }
            }.bind(this));
    }

    constructBookTitleList(books)
    {
        var s = "";
        for (i = 0; i < books.length; i++)
        {
            var book = bookData.books.filter((b) => b.id === books[i])[0];
            if (book)
            {
                if (i > 0 && i < books.length - 1)
                    s += ", ";
                if (books.length > 1 && i == books.length - 1)
                    s += " and ";
                s += "'" + book.title + "'";
            } 
        }
        return s;
    }

    confirmCode()
    {
        // TODO: this needs to go through Google IAP for purchase resumption on reinstall etc.
        // We need to validate our own codes so it will be effectively submitting an invisible(if poss) $0 purchase request.
        // make sure not to consume the code until the purchase is verified through Google (and in the case of 'choose your own', is a valid choice they don't already own)
        Alert.alert('Code confirmed.  Thanks!');
    }

    buildBookPicker()
    {
        //return this.props.activities.map(a => { return (<Picker.Item label={a.activityName} value={a.activityId} key={a.activityId} />) });        
        return bookData.books.map((book) => { return <Picker.Item label={book.title} value={book.id} key={book.id} style={style.boldText16}></Picker.Item>});
    }

    render()
    {
        return  <View style={[style.blackBorder, {flex:1 ,flexDirection:'row', alignItems:'stretch', justifyContent:'space-between', padding: 10, backgroundColor:'#F7E19E'}]}>
                    <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>
                        <View style={{flex:5, width:'100%', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', padding:10}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Text style={[style.boldText24, {flex:1}]}>Enter your Gift Code</Text>
                                <TextInput underlineColorAndroid='transparent' style={[style.boldText24, style.textInput]}
                                 onChangeText={(text) => { this.setState({giftCode: text })}} value={this.state.giftCode}></TextInput>
                            </View>
                            <View style={{flex:2, width:'100%', flexDirection:'column'}}>
                            <Text style={[style.boldText16, {flex:1, width:'100%'}]}>{this.state.responseText}</Text>
                                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    {(this.state.chooseABook) ? <Picker style={{flex:2, height:'100%'}}>{this.buildBookPicker()}</Picker> : null}
                                </View>
                            </View>
                        </View>
                        <View style={{flex:2, width:'100%'}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20}}>
                                {(this.state.codeValid) ? 
                                    <TouchableOpacity style={{width:'30%', alignItems:'center', justifyContent:'center'}} onPress={() => this.confirmCode()}>
                                        <Image style={{width:'70%', alignItems:'center', justifyContent:'center'}} 
                                                source={require('../../img/button.png')}
                                                resizeMode="contain">
                                            <Text style={[style.boldText16, { textAlign:"center"} ]}>Confirm</Text>
                                        </Image>
                                    </TouchableOpacity> : null}
                                {(!this.state.codeValid) ? 
                                    <TouchableOpacity style={{width:'30%', alignItems:'center', justifyContent:'center'}}
                                                    onPress={() => this.tryRedeemCode()} disabled={this.state.giftCode.length == 0}>
                                    <Image style={{width:'70%', alignItems:'center', justifyContent:'center'}} 
                                            source={(this.state.giftCode.length > 0) ? require('../../img/tall_button.png') : require('../../img/tall_button_disabled.png')} 
                                            resizeMode="contain">
                                        <Text style={[style.boldText16, { textAlign:"center"} ]}>Redeem</Text>
                                    </Image>
                                </TouchableOpacity> : null }
                                <TouchableOpacity style={{width:'30%', alignItems:'center', justifyContent:'center'}}
                                                    onPress={() => this.props.cancelCallback()}>
                                    <Image style={{width:'70%', alignItems:'center', justifyContent:'center'}} 
                                            source={require('../../img/tall_button.png')}
                                            resizeMode="contain">
                                        <Text style={[style.boldText16, { textAlign:"center"} ]}>{(!this.state.codeValid) ? "Close" : "Cancel"}</Text>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>;
    }
}