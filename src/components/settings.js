import React, { Component } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, Modal, ScrollView } from 'react-native';
import style from '../../style/style.js';
import { toggleDisplayChoiceCounters } from '../actions/settings.js';
import { resetPageCounters } from '../actions/book.js';
import { connect } from 'react-redux';

const bookData = require('../../books.json');

function mapStateToProps(state) {
    console.log(state);
    return { 
        countersEnabled: state.changeSettings.showChoiceCounters,
        pageCounters: state.pageCounters,
    }
}

function mapDispatchToProps(dispatch)
{
    return { 
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
        return  <View>
                    <Text style={[style.h2, {textAlign:'center'}]}>Settings</Text>
                    <View style={{flexDirection:'column'}}>
                        <Text>Choice Tracking</Text>
                        <Text>Records the choices made at each branch of the story and displays how many times each one has been chosen.</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text>Display Choice Counters</Text>
                                <Switch onValueChange={() => this.props.toggleDisplayChoiceCounters()} value={this.props.countersEnabled} />
                            </View>
                        <TouchableOpacity onPress={() => this.setState({ resetCountersModalVisible:true })}>
                            <Text>Reset Choice Counters</Text>
                        </TouchableOpacity>
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
                                                <BookSelect key={book.id} title={book.title.replace("\r\n", " ")} totalChoices={this.getTotalChoicesForBook(book.id)} callback={() => this.props.resetPageCounters(book.pages)} />)}
                                            </ScrollView>
                                        </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);