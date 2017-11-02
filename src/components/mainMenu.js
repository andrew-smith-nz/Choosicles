import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native';
import style from '../../style/style.js';
import BookCover from './bookCover.js';
import { connect } from 'react-redux';
import { changePage, setActiveBook, clearHistory } from '../actions/book.js';
import { GroupBox } from './settings.js';
import Reactotron from 'reactotron-react-native';


const bookData = require('../../books.json');

function mapStateToProps(state) {
    return { 
        pageId: state.pageId,
        pageData: state.pageData
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        clearHistory: () => dispatch(clearHistory()),
        changePage: (pageId) => dispatch(changePage(pageId)),
        setActiveBook: (book) => dispatch(setActiveBook(book))
    };
}

class MainMenu extends Component
{
    constructor(props)
    {
        super();
        this.selectBook = this.selectBook.bind(this);
        BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp());
        this.state = { myBooksIndex: 0 };
    }

    selectBook(book)
    {
        this.props.clearHistory();
        this.props.setActiveBook(book);
        this.props.changePage(book.pages[0].id);
        this.props.navigation.navigate("TitlePage");
    }

    settings()
    {
        this.props.navigation.navigate("Settings");
    }

    store()
    {
        this.props.navigation.navigate("Store");
    }

    componentDidMount()
    {
        // var book = bookData.books[0];
        // this.props.setActiveBook(book);
        // this.props.changePage(book.pages[0].id);
        // this.props.navigation.navigate("Page");

    }

    // Testing my books scroll
   /*  componentWillMount()
    {
        var colors = ['red', 'green', 'blue', 'yellow', 'purple', 'gray'];
        for (i = 0; i < 6; i++)
        {
            var book = JSON.parse(JSON.stringify(bookData.books[0]));
            book.backgroundColor = colors[i];
            book.id = i + this.guid().substr(1);
            bookData.books.push(book);
        }
    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      } */
    
    render()
    {
        return  <Image source={require("../../img/wallpaper.png")} resizeMode='stretch' style={[style.mainMenuView, { width:'100%', height:'100%' } ]}>
                    <Image source={require("../../img/choosicles_logo.png")} resizeMode="contain" style={{flex:1, marginTop:15}} />
                    <View style={{flexDirection:'row', flex:4, margin:20}}>
                        <View style={{flexDirection:'column', flex:32, alignItems:'center', marginTop:20}}>
                            <Image style={{height:25, marginBottom:-15}} resizeMode='contain' source={require('../../img/your_books.png')} />                      
                            <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center'}}>  
                                <View style={{width:50}}> 
                                    {(bookData.books.length > 3 && (this.state.myBooksIndex > 0)) ? <TouchableOpacity onPress={() => this.setState({myBooksIndex: this.state.myBooksIndex - 1})}>               
                                        <Image source={require('../../img/arrow_back.png')} />
                                    </TouchableOpacity> : null }
                                </View>
                                <View style={{flex:1}}>
                                    <View style={[style.bookList, {flex:1}]}>
                                        {bookData.books.slice(this.state.myBooksIndex, this.state.myBooksIndex + 3).map((book) => 
                                            <TouchableOpacity key={book.id} onPress={() => this.selectBook(book)} style={{backgroundColor:book.backgroundColor}}>
                                                <BookCover key={book.id} bookInfo={book} />
                                            </TouchableOpacity>)}
                                    </View>
                                </View>               
                                <View style={{width:50}}> 
                                    {(bookData.books.length > 3 && (this.state.myBooksIndex < bookData.books.length - 3)) ? <TouchableOpacity onPress={() => this.setState({myBooksIndex: this.state.myBooksIndex + 1})}>
                                        <Image source={require('../../img/arrow_forward.png')} />
                                    </TouchableOpacity> : null }
                                </View>
                            </View>
                        </View>
                        <View style={{flex:8, alignItems:'center', justifyContent: 'center', marginTop:'-10%', paddingLeft:'5%'}}>
                            <TouchableOpacity onPress={() => this.store()}>                         
                                <Image source={require('../../img/buy_books.png')} resizeMode='contain' style={{width:110, height:70}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{position:'absolute', right: 10, top:20}}>
                        <TouchableOpacity onPress={() => this.settings()}>
                            <Image source={require('../../img/cogwheel.png')} style={{height:40, width:42}} />
                        </TouchableOpacity>
                    </View>
                </Image>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);