import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Dimensions, Modal } from 'react-native';
import style from '../../style/style.js';
import {Audio} from 'expo';
import { getImageForPage, getSoundEffectForPage, getReadingForPage } from './resourceManager.js'
import { backtrack, changePage, clearHistory, incrementPageCounter } from '../actions/book.js';
import { connect } from 'react-redux';
import NameMonster from './nameMonster.js';
import ShadowText from './shadowText.js';

function mapStateToProps(state) {
    return { 
        pageData: state.changePage.pageData,
        pageHistory: state.changePage.pageHistory,
        name: state.changeName.name,
        panDirection: state.changePage.direction,
        pageCounters: state.pageCounters.pageCounters
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        backtrack: () => dispatch(backtrack()),
        clearHistory: () => dispatch(clearHistory()),
        choose: (pageId) => dispatch(changePage(pageId)),
        incrementPageCounter: (pageId) => dispatch(incrementPageCounter(pageId))
    };
}

class Page extends Component
{
    constructor(props)
    {
        super();
        this.backtrack = this.backtrack.bind(this);
        this.animateIn = this.animateIn.bind(this);
        this.fadeInText = this.fadeInText.bind(this);
        this.getPageText = this.getPageText.bind(this);
        this.getPageCount = this.getPageCount.bind(this);
        this.state = { 
            currentText: 0, 
            speaker: false, 
            slideX: new Animated.Value(Dimensions.get('window').width), 
            textFadeOpacity: new Animated.Value(0),
            nameMonsterVisible: false,
            tabletMode: false
        };
        this._slideProgress = new Animated.Value(0);
    }

    componentWillReceiveProps(newProps)
    {
        this.setState({ 
                currentText: 0, 
                speaker: false, 
                slideX: new Animated.Value  ((newProps.panDirection == "forward" ? 1 : -1) * Dimensions.get('window').width) 
            },
            () => this.animateIn());   
    }

    animateIn()
    {
        Animated.timing(                  // Animate over time
            this.state.slideX,            // The animated value to drive
            {
                toValue: 0,
                duration: 150,            // Make it take a while
            }
        ).start();   
    }

    componentDidMount()
    {
        this.fadeInText();
        this.animateIn();
    }

    fadeInText()
    {
        Animated.timing(                  // Animate over time
            this.state.textFadeOpacity,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 400,              // Make it take a while
            }
          ).start();     
    }

    forward()
    {
        this.setState({currentText: this.state.currentText + 1, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText());        
    }
    
    back()
    {
        this.setState({currentText: this.state.currentText - 1, textFadeOpacity: new Animated.Value(0) }, () => this.fadeInText());
    }

    backtrack()
    {
        if (this.props.pageHistory.length == 1)
        {
            this.props.clearHistory();
            this.props.navigation.navigate("MainMenu");
        }
        else
        {            
            this.props.backtrack();
        }
    }

    async playSound()
    {
        Audio.setIsEnabledAsync(true);
        let sound = new Audio.Sound();
        await sound.loadAsync(getSoundEffectForPage(this.props.pageData.id));
        await sound.playAsync();
    }

    async toggleReading(status)
    {
        Audio.setIsEnabledAsync(true);
        let sound = this.state.playingSound;
        if (!sound)
        {
            sound = new Audio.Sound();
            this.setState({playingSound: sound});
        }
        if (status)
        {
            await sound.loadAsync(getReadingForPage(this.props.pageData.id));
            await sound.playAsync();
        }
        else
        {
            await sound.stopAsync();
            this.setState({playingSound: null});
        }
    }

    getPageText()
    {
        let originalText = "";
        if (this.state.tabletMode)
        {
            originalText = this.props.pageData.texts.map(t => t.text).join(" ");
        }
        else
        {
            originalText = this.props.pageData.texts[this.state.currentText].text;
        }
        if (this.props.name)
        {
            originalText = originalText.replace('your pet monster', this.props.name);
            originalText = originalText.replace('Your pet monster', this.props.name.substring(0,1).toUpperCase() + this.props.name.substring(1));
        }
        return originalText;
    }

    componentWillUpdate()
    {
        if (!this.props.pageData)
        {
            // either something has gone wrong, or we've navigated back to the home screen
            this.props.navigation.navigate("MainMenu");
        }
    }

    getPageCount(pageId)
    {
        var count = this.props.pageCounters.filter(c => c.pageId === pageId)[0]
        return count ? count.count : 0;
    }

    render()
    {
        let hasDecision = (this.state.currentText == (this.props.pageData.texts.length - 1) && this.props.pageData.navigationLinks.length > 0) || this.state.tabletMode;
        //let footerHeight = hasDecision ? '20%': '10%';
        return (
                <Animated.View style={[style.pageView, {transform: [
                    {
                    translateX: this.state.slideX
                    }
                ]}]}>
                    <Modal animationType={"slide"} transparent={true} visible={this.state.nameMonsterVisible} onRequestClose={() => this.setState({ nameMonsterVisible:false })}>
                        <TouchableOpacity style={{flex:1}} onPress={() => this.setState({ nameMonsterVisible:false })} >
                            <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                <TouchableOpacity onPress={null} style={{height:'40%', width:'40%', alignItems: 'center', justifyContent:'center'}}>
                                        <NameMonster callback={() => this.setState({ nameMonsterVisible:false })} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <Image style={{flex:1, width:"100%", height:"100%"}} 
                        source={getImageForPage(this.props.pageData.id)} 
                        resizeMode={"contain"}>
                        <View style={{position:'absolute', left:5, top:5, width:50, height:50}}>
                            <TouchableOpacity onPress={() => this.backtrack()}>
                                <Image source={require('../../img/back.png')} style={{width:50, height:50}} />
                            </TouchableOpacity> 
                        </View>
                        {(this.props.pageData.tier === 0) ? <View style={{position:'absolute', right:5, top:5, width:50, height:50}}>
                            <TouchableOpacity onPress={() => this.setState({nameMonsterVisible: true})}>
                                <Image source={require('../../img/pencil.png')} style={{width:50, height:50}} />
                            </TouchableOpacity> 
                        </View> : null}
                        <View style={{flexDirection:'row', width:'100%', height:'80%', alignItems:'center'}}>
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                {this.state.currentText > 0 && !this.state.tabletMode ? 
                                    <TouchableOpacity onPress={() => this.back()}>
                                        <Image source={require('../../img/arrow_back.png')} />
                                    </TouchableOpacity> 
                                : null }
                            </View>
                            <View style={{width:'80%'}} />
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                {(this.state.currentText < this.props.pageData.texts.length - 1) && !this.state.tabletMode ? 
                                <TouchableOpacity onPress={() => this.forward()}>
                                    <Image source={require('../../img/arrow_forward.png')} />
                                </TouchableOpacity>
                                : null }
                            </View>
                        </View>
                        <View style={style.pageFooterView}>
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => { this.toggleReading(!this.state.speaker); this.setState({speaker: !this.state.speaker});  }}>
                                    {this.state.speaker ? <Image source={require('../../img/speaker_off.png')} style={{width:30, height:30}} /> 
                                                        : <Image source={require('../../img/speaker_on.png')} style={{width:30, height:30}} />}
                                </TouchableOpacity> 
                            </View>
                            <View style={{position:'absolute', bottom:10, left:'10%', alignItems:'center', justifyContent:'center', width:'80%'}}>
                                <Animated.Text style={{opacity:this.state.textFadeOpacity, color:'black', textAlign:'center', padding:10, fontWeight:'bold', backgroundColor:'rgba(255,255,255,0.5)'}}>
                                    {this.getPageText()}
                                </Animated.Text>
                                {hasDecision ? 
                                    <View style={{marginTop: 10, marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        {this.props.pageData.navigationLinks.map((nav) => 
                                        <TouchableOpacity key={nav.id} onPress={() => { this.props.incrementPageCounter(nav.targetPageId); this.props.choose(nav.targetPageId); } }>
                                            <Animated.Text key={nav.id} style={{opacity:this.state.textFadeOpacity, textAlign:'center', borderColor:'black', borderWidth:0.5, borderRadius:50, width:50, height:50, padding:10, marginLeft: 10, marginRight:10, backgroundColor:'white'}}>
                                                {nav.text}
                                            </Animated.Text>
                                            <View style={{position:'absolute', borderColor:'black', borderWidth:0.5, padding:1, right:10, top:2, backgroundColor:'white', zIndex: 0}}>
                                                <Text style={{fontSize:8}}>{this.getPageCount(nav.targetPageId)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        )}
                                    </View>
                                : null}
                            </View>      
                            <View style={{width:'10%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.playSound()}>
                                    <Image source={require('../../img/sound_effect.png')} style={{width:30, height:30}} />
                                </TouchableOpacity>
                            </View>              
                        </View>
                    </Image>
                </Animated.View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);