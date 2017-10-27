import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import BookCover from './bookCover.js';
import BookInfo from './bookInfo.js';

const bookData = require('../../books.json');

function mapStateToProps(state) {
    return { 
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
    };
}

class Store extends Component
{
    constructor(props)
    {
        super();
        this.state = { bookInfoVisible: false, book: null };
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate("MainMenu"));
    }

    selectBook()
    {
        // Call out to Google Play API
        Alert.alert("Buying book ... " + this.state.book.id);
    }

    render()
    {
        return  <Image source={require("../../img/wallpaper.png")} resizeMode='stretch' style={[style.mainMenuView, { width:'100%', height:'100%', flexDirection:'column' } ]}>
                    <Image source={require("../../img/store.png")} resizeMode='contain' style={{height:'15%'}} />
                    <View style={{flexDirection:'row', height:'85%', alignItems:'center', justifyContent:'center'}}>
                    {bookData.books.map((book) => 
                            <TouchableOpacity style={{flexDirection:'column', width:200, alignItems:'center'}} key={book.id} 
                                              onPress={() => this.setState({ bookInfoVisible:true, book:book })}>
                                <BookCover key={book.id} bookInfo={book} />
                                <Text style={{textAlign:'center', fontFamily:'berrylicious_bold', fontSize:16}}>$5.99</Text>
                            </TouchableOpacity>)}
                    </View>
                    <View style={{position:'absolute', right:10, top:10, zIndex: 0, alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity style={{padding:5}} onPress={() => this.props.navigation.navigate("MainMenu")}>
                            <Image source={require('../../img/home.png')} style={{width:50, height:50}} />
                        </TouchableOpacity>
                    </View>
                    <Modal transparent={true} visible={this.state.bookInfoVisible} onRequestClose={() => this.setState({ bookInfoVisible:false, book:null })}>
                        <TouchableOpacity style={{flex:1}} onPress={() => this.setState({ bookInfoVisible:false, book:null })} >
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <TouchableOpacity activeOpacity={1} onPress={null} style={{height:'80%', width:'80%', alignItems: 'center', justifyContent:'center'}}>
                                        <BookInfo callback={() => this.selectBook()} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </Image>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);