import React, { Component } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, Modal, ScrollView, BackHandler, Alert } from 'react-native';
import style from '../../style/style.js';
import { toggleDisplayChoiceCounters, setDisplayMode, setEnableSoundEffects, setAutoplaySoundEffects, setEnableReadAloud, setAutoplayAudio, setShowText, setSilentMode, resetToDefaults } from '../actions/settings.js';
import { resetPageCounters } from '../actions/book.js';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const bookData = require('../../books.json');

function mapStateToProps(state) {
    return { 
        countersEnabled: state.changeSettings.showChoiceCounters,
        pageCounters: state.pageCounters.pageCounters,
        displayMode: state.changeSettings.displayMode,
        enableSoundEffects: state.changeSettings.enableSoundEffects,
        autoplaySoundEffects: state.changeSettings.autoplaySoundEffects,
        enableReadAloud: state.changeSettings.enableReadAloud,
        enableAutoplayAudio: state.changeSettings.enableAutoplayAudio,
        enableShowText: state.changeSettings.enableShowText,
        enableSilentMode: state.changeSettings.enableSilentMode,
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        setDisplayMode: (mode) => dispatch(setDisplayMode(mode)),
        setEnableSoundEffects: (enabled) => dispatch(setEnableSoundEffects(enabled)),
        setAutoplaySoundEffects: (enabled) => dispatch(setAutoplaySoundEffects(enabled)),
        setEnableReadAloud: (enabled) => dispatch(setEnableReadAloud(enabled)),
        setAutoplayAudio: (enabled) => dispatch(setAutoplayAudio(enabled)),
        setShowText: (enabled) => dispatch(setShowText(enabled)),
        setSilentMode: (enabled) => dispatch(setSilentMode(enabled)),
        toggleDisplayChoiceCounters: () => dispatch(toggleDisplayChoiceCounters()),
        resetPageCounters: (pages) => dispatch(resetPageCounters(pages)),
        resetToDefaults: () => dispatch(resetToDefaults())
    };
}

class Settings extends Component
{
    constructor(props)
    {
        super();
        this.state = { resetCountersModalVisible:false }
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }

    getTotalChoicesForBook(bookId)
    {
        var pages = bookData.books.filter(b => b.id === bookId)[0].pages;
        var counters = this.props.pageCounters.filter(p => pages.filter(q => q.id === p.pageId).length > 0);
        var c = 0;
        for (i = 0; i < counters.length; i++)
        {
             c += counters[i].count;
        }
        return c;
    }
    
    home()
    {
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'MainMenu'})]
                }));
    }

    render()
    {
        return  <View style={[style.mainMenuView, { backgroundColor:'#00CAFF', width:'100%', height:'100%', flexDirection:'column' } ]}>
                    <Image id="header" source={require("../../img/settings.png")} resizeMode='contain' style={style.topText} />
                    <View style={{height:'80%', flexDirection:'row', backgroundColor:'transparent'}}>
                        <View style={{flex:1, flexDirection:'column', backgroundColor:'transparent'}}>
                            <View style={style.padding10}>
                                <GroupBox title="Options">
                                    <View style={style.switchView}>
                                        <Text style={style.boldText16}>Silent Mode</Text>
                                        <Switch onValueChange={(value) => {this.props.setSilentMode(value)}} value={this.props.enableSilentMode} style={style.switch} />
                                    </View>
                                    <View style={style.switchView}>
                                        <Text style={style.boldText16}>Enable Audio Track</Text>
                                        <Switch onValueChange={(value) => {this.props.setEnableReadAloud(value)}} value={this.props.enableReadAloud} style={style.switch} />
                                    </View>
                                    <View style={style.switchView}>
                                        <Text style={style.boldText16}>Auto-Play Audio Track</Text>
                                        <Switch onValueChange={(value) => {this.props.setAutoplayAudio(value)}} value={this.props.enableAutoplayAudio} style={style.switch} />
                                    </View>
                                    <View style={style.switchView}>
                                        <Text style={style.boldText16}>Enable Sound Effects</Text>
                                        <Switch onValueChange={(value) => {this.props.setEnableSoundEffects(value)}} value={this.props.enableSoundEffects} style={style.switch} />
                                    </View>
                                    <View style={style.switchView}>
                                        <Text style={style.boldText16}>Auto-Play Sound Effects</Text>
                                        <Switch onValueChange={(value) => {this.props.setAutoplaySoundEffects(value)}} value={this.props.autoplaySoundEffects} style={style.switch} />
                                    </View>
                                    <View style={style.switchView}>
                                        <Text style={style.boldText16}>Show Text</Text>
                                        <Switch onValueChange={(value) => {this.props.setShowText(value)}} value={this.props.enableShowText} style={style.switch} />
                                    </View>
                                    <View style={[style.marginTop10, {alignItems:'center', width:'100%'}]}>
                                        <TouchableOpacity style={[style.blackBorder, style.padding10, {backgroundColor: '#FBC61E', borderRadius:20}]} 
                                                            onPress={() => this.props.resetToDefaults() }>
                                            <Text style={style.boldText16}>Reset to Defaults</Text>
                                        </TouchableOpacity>
                                    </View>
                                </GroupBox>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <View style={style.padding10}>
                                <GroupBox title="Choice Tracking">
                                    <Text style={style.text10}>Records the choices made at each branch of the story and displays how many times each one has been chosen.</Text>
                                    <View style={style.switchView}>
                                        <Text style={style.boldText16}>Display Choice Counters</Text>
                                        <Switch onValueChange={() => this.props.toggleDisplayChoiceCounters()} value={this.props.countersEnabled} style={style.switch} />
                                    </View>
                                    <View style={[style.marginTop10, {alignItems:'center', width:'100%'}]}>
                                        <TouchableOpacity style={[style.blackBorder, style.padding10, {backgroundColor: '#FBC61E', borderRadius:20}]} 
                                                            onPress={() => this.setState({ resetCountersModalVisible:true })}>
                                            <Text style={style.boldText16}>Reset Choice Counters</Text>
                                        </TouchableOpacity>
                                    </View>
                                </GroupBox>
                            </View>
                        </View>


                        <Modal animationType={"slide"} transparent={true} visible={this.state.resetCountersModalVisible} onRequestClose={() => this.setState({ resetCountersModalVisible:false })}
                                supportedOrientations={['landscape-left', 'landscape-right']}>
                            <TouchableOpacity style={{flex:1}} onPress={() => this.setState({ resetCountersModalVisible:false })} >
                                <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                    <TouchableOpacity onPress={null} style={{height:'80%', width:'50%', alignItems: 'center', justifyContent:'center'}} activeOpacity={1}>
                                            <View style={[style.fill, style.padding20, style.blackBorder, {flex:1, flexDirection:'column', backgroundColor:'#F7E19E', 
                                                    alignItems:'center', justifyContent:'space-between'}]}>
                                                <Text style={style.boldText16}>Reset Choice Counters for:</Text>
                                                <ScrollView style={[style.padding10, {width:'100%', backgroundColor:'#F7E19E'}]} contentContainerStyle={{alignItems:'center'}}>
                                                    <BookSelect key="All" title="All Books" callback={() => { this.props.resetPageCounters([]); }} />
                                                    {bookData.books.filter(b => !b.isMulti).map((book) => 
                                                    <BookSelect key={book.id} 
                                                                title={book.title.replace("\r\n", " ")} 
                                                                totalChoices={this.getTotalChoicesForBook(book.id)} 
                                                                callback={() => { this.props.resetPageCounters(book.pages); }} />)}
                                                </ScrollView>
                                            </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <TouchableOpacity style={style.topRightButton} onPress={() => this.home()}>
                        <Image source={require('../../img/home.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity>
                </View>;
    }
}

class BookSelect extends Component
{
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.callback()} style={style.bookSelectItem}>
                <Text style={style.boldText14}>{this.props.title}</Text>
                {(this.props.title != "All Books") ? <Text style={style.boldText10}>{this.props.totalChoices || 0} choice{this.props.totalChoices != 1 ? 's' : ''} made.</Text> : null}
            </TouchableOpacity>
        );
    }
}

export class GroupBox extends Component
{
    render() {
        return (
            <View>
                <View style={style.groupBoxContainer}>
                    {this.props.children}
                </View>
                <Text style={[style.boldText16, style.blackBorder, style.groupBoxHeader]}>{this.props.title}</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);