import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import BookCover from './bookCover.js';
import BookInfo from './bookInfo.js';
import CodeEntry from './codeEntry.js';
import Reactotron from 'reactotron-react-native';

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
        this.state = { codeEntryVisible:false, bookInfoVisible: false, book: null };
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate("MainMenu"));
        //bookData.books.push(bookData.books.slice());
    }

    selectBook()
    {
        // Call out to Google Play API
        Alert.alert("Thanks for buying " + this.state.book.title + "!");
    }

    render()
    {
        return  <Image source={require("../../img/wallpaper.png")} resizeMode='stretch' style={[style.mainMenuView, { width:'100%', height:'100%', flexDirection:'column' } ]}>
                    <Image source={require("../../img/buy_more_books.png")} resizeMode='contain' style={style.topText} />
                    <View style={{flexDirection:'row', flex:5, alignItems:'center', justifyContent:'center', margin:'5%'}}>
                        {bookData.books.map((book) => 
                        <View style={[style.bookCoverView, {flex:1, flexDirection:'row'}]} key={book.id} >
                            <TouchableOpacity style={{flex:1, flexDirection:'column'}} key={book.id} 
                                              onPress={() => this.setState({ bookInfoVisible:true, book:book })}>
                                <BookCover key={book.id} bookInfo={book} />
                                <Text style={[style.boldText24, {color:'transparent', textAlign:'center'}]}>$5.99</Text>
                            </TouchableOpacity>
                        </View>)}
                    </View>      
                    <View style={{flex:3}} />            
                    <TouchableOpacity style={style.centerBottomLargeButton} onPress={() => this.setState({ codeEntryVisible:true })}>
                        <Image style={style.fill} source={require('../../img/giftcode_button.png')} resizeMode="contain">
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.props.navigation.navigate("MainMenu")}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={style.fill} />
                    </TouchableOpacity>
                    <Modal transparent={true} visible={this.state.bookInfoVisible} onRequestClose={() => this.setState({ bookInfoVisible:false, book:null })} supportedOrientations={['landscape-left', 'landscape-right']}>
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <View style={{height:'80%', width:'80%', alignItems: 'center', justifyContent:'center'}}>
                                        <BookInfo bookInfo={this.state.book} callback={() => this.selectBook()} cancelCallback={() => this.setState({ bookInfoVisible:false, book:null })} />
                                </View>
                            </View>
                    </Modal>                    
                    <Modal transparent={true} visible={this.state.codeEntryVisible} onRequestClose={() => this.setState({ codeEntryVisible:false })} supportedOrientations={['landscape-left', 'landscape-right']}>
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <View style={{height:'80%', width:'80%', alignItems: 'center', justifyContent:'center'}}>
                                        <CodeEntry cancelCallback={() => this.setState({ codeEntryVisible:false })} />
                                </View>
                            </View>
                    </Modal>
                </Image>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);