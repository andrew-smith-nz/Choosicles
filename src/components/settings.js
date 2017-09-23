import React, { Component } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, Modal, ScrollView } from 'react-native';
import style from '../../style/style.js';
import { toggleDisplayChoiceCounters, setDisplayMode, setEnableSoundEffects, setEnableReadAloud } from '../actions/settings.js';
import { resetPageCounters } from '../actions/book.js';
import { connect } from 'react-redux';

const bookData = require('../../books.json');

function mapStateToProps(state) {
    return { 
        countersEnabled: state.changeSettings.showChoiceCounters,
        pageCounters: state.pageCounters.pageCounters,
        displayMode: state.changeSettings.displayMode,
        enableSoundEffects: state.changeSettings.enableSoundEffects,
        enableReadAloud: state.changeSettings.enableReadAloud,
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
        setDisplayMode: (mode) => dispatch(setDisplayMode(mode)),
        setEnableSoundEffects: (enabled) => dispatch(setEnableSoundEffects(enabled)),
        setEnableReadAloud: (enabled) => dispatch(setEnableReadAloud(enabled)),
        toggleDisplayChoiceCounters: () => dispatch(toggleDisplayChoiceCounters()),
        resetPageCounters: (pages) => dispatch(resetPageCounters(pages))
    };
}

class Settings extends Component
{
    constructor(props)
    {
        super();
        this.state = { resetCountersModalVisible:false }
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

    render()
    {
        return  <Image source={require("../../img/wallpaper.png")} resizeMode='stretch' style={[style.mainMenuView, { width:'100%', height:'100%', flexDirection:'column' } ]}>
                    <Image source={require("../../img/settings.png")} resizeMode='contain' style={{height:'20%'}} />
                    <View style={{height:'80%', flexDirection:'row'}}>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <View style={{padding:10}}>
                                <GroupBox title="Display Mode">
                                    <Text style={[style.smallPlainText]}>Tablet mode displays the entire page.  Phone mode breaks page text into sections to minimise blocking the illustrations.</Text>
                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:10}}>
                                        <TouchableOpacity style={{borderWidth: this.props.displayMode === 'tablet' ? 1 : 0.5, borderColor:'black', padding:10, backgroundColor: '#FBC61E'}} 
                                                            onPress={() => this.props.setDisplayMode("tablet")}>
                                            <Text style={{fontWeight: this.props.displayMode === 'tablet' ? 'bold' : 'normal'}}>Tablet</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{borderWidth: this.props.displayMode === 'phone' ? 1 : 0.5, borderColor:'black', padding:10, backgroundColor: '#FBC61E'}} 
                                                            onPress={() => this.props.setDisplayMode("phone")}>
                                            <Text style={{fontWeight: this.props.displayMode === 'phone' ? 'bold' : 'normal'}}>Phone</Text>
                                        </TouchableOpacity>
                                    </View>
                                </GroupBox>
                            </View>
                            <View style={{padding:10}}>
                                <GroupBox title="Audio">
                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:5}}>
                                        <Text style={{marginRight:10}}>Enable Read Aloud</Text>
                                        <Switch onValueChange={(value) => {this.props.setEnableReadAloud(value)}} value={this.props.enableReadAloud} />
                                    </View>
                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:5}}>
                                        <Text style={{marginRight:10}}>Enable Sound Effects</Text>
                                        <Switch onValueChange={(value) => {this.props.setEnableSoundEffects(value)}} value={this.props.enableSoundEffects} />
                                    </View>
                                </GroupBox>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <View style={{padding:10}}>
                                <GroupBox title="Choice Tracking">
                                    <Text style={{fontSize:10, fontStyle:'italic'}}>Records the choices made at each branch of the story and displays how many times each one has been chosen.</Text>
                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:5}}>
                                        <Text style={{marginRight:10}}>Display Choice Counters</Text>
                                        <Switch onValueChange={() => this.props.toggleDisplayChoiceCounters()} value={this.props.countersEnabled} />
                                    </View>
                                    <View style={{alignItems:'center', width:'100%', marginTop:10}}>
                                        <TouchableOpacity style={{borderWidth:0.5, borderColor:'black', padding:10, backgroundColor: '#FBC61E'}} 
                                                            onPress={() => this.setState({ resetCountersModalVisible:true })}>
                                            <Text>Reset Choice Counters</Text>
                                        </TouchableOpacity>
                                    </View>
                                </GroupBox>
                            </View>
                        </View>


                        <Modal animationType={"slide"} transparent={true} visible={this.state.resetCountersModalVisible} onRequestClose={() => this.setState({ resetCountersModalVisible:false })}>
                            <TouchableOpacity style={{flex:1}} onPress={() => this.setState({ resetCountersModalVisible:false })} >
                                <View style={{flex:1, backgroundColor:'#00000080', alignItems: 'center', justifyContent:'center'}}>
                                    <TouchableOpacity onPress={null} style={{height:'80%', width:'50%', alignItems: 'center', justifyContent:'center'}} activeOpacity={1}>
                                            <View style={{flex:1, flexDirection:'column', width:'100%', height:'100%', padding:20, backgroundColor:'white', borderColor:'black', borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'space-between'}}>
                                                <Text>Reset Choice Counters for:</Text>
                                                <ScrollView style={{paddingTop:10, width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                                                    <BookSelect key="All" title="All Books" callback={() => this.props.resetPageCounters([])} />
                                                    {bookData.books.map((book) => 
                                                    <BookSelect key={book.id} 
                                                                title={book.title.replace("\r\n", " ")} 
                                                                totalChoices={this.getTotalChoicesForBook(book.id)} 
                                                                callback={() => this.props.resetPageCounters(book.pages)} />)}
                                                </ScrollView>
                                            </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <View style={{position:'absolute', right:10, top:10, zIndex: 0, alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity style={{padding:5}} onPress={() => this.props.navigation.navigate("MainMenu")}>
                            <Image source={require('../../img/home.png')} style={{width:50, height:50}} />
                        </TouchableOpacity>
                    </View>
                </Image>;
    }
}

class BookSelect extends Component
{
    render() {
        return (
        <View style={{borderWidth:0.5, borderColor:'black', padding:5, margin:5, width:'80%'}}>
            <TouchableOpacity onPress={() => this.props.callback()} style={{width:'100%'}}>
                <Text style={{fontWeight:'bold', fontSize:14, width:'100%'}}>{this.props.title}</Text>
                {this.props.totalChoices > 0 ?
                <Text style={{fontSize:10}}>{this.props.totalChoices} choice{this.props.totalChoices != 1 ? 's' : ''} made.</Text>
                : null }
            </TouchableOpacity>
        </View>
        );
    }
}

class GroupBox extends Component
{
    render() {
        return (
            <View>
                <View style={{borderWidth:0.5, borderColor:'black', padding:10, paddingTop: 20, width:'100%', backgroundColor:'#F7E19E'}}>
                    {this.props.children}
                </View>
                <Text style={[style.text, {position:'absolute', left: 10, top: -10, backgroundColor: '#FBC61E', borderWidth:0.5, borderColor:'black', paddingLeft:5, paddingRight:5}]}>{this.props.title}</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);