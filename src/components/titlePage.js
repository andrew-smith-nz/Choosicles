import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import style from '../../style/style.js';
import { connect } from 'react-redux';
import { getCoverForBook } from './resourceManager.js';
import { backtrack, clearHistory, changePage} from '../actions/book.js';


function mapStateToProps(state) {
    return { 
        book: state.changePage.activeBook
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        backtrack: () => dispatch(backtrack()),
        clearHistory: () => dispatch(clearHistory()),
        changePage: (pageId) => dispatch(changePage(pageId)),
    };
}

class TitlePage extends Component
{
    constructor(props)
    {
        super();
        this.backtrack = this.backtrack.bind(this);
        this.backHandler = this.backHandler.bind(this);
        BackHandler.addEventListener('hardwareBackPress', () => this.backHandler());
    }
    
    backHandler()
    {
        this.backtrack(); return true; 
    }
    
    backtrack()
    {
        this.props.clearHistory();
        this.props.navigation.navigate("MainMenu");
    }

    startBook()
    {
        this.props.changePage(this.props.book.pages[0].id)
        this.props.navigation.navigate("Page");
    }

    render()
    {
        return  (<View style={{flex:1}}>
                    <Image source={getCoverForBook(this.props.book.id, true)} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch' />
                    <TouchableOpacity style={style.centerBottomLargeButton} onPress={() => this.startBook()}>
                        <Image style={style.fill} source={require('../../img/start_button.png')} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.props.navigation.navigate("MainMenu")}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity>
                </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlePage);