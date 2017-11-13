
import React from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import global from '../global.js'

export default StyleSheet.create({
    
    mainMenuView: { flex:1, flexDirection: 'column', alignItems:'center', backgroundColor:'white', width:'100%', height:'100%' }
    ,pageView: { flex:1, backgroundColor:'#FAFAFA', flexDirection:'column' }

    ,bookCoverView: { alignItems:'center', justifyContent:'center', margin:10 * global.WIDTH_RATIO, width: 250 * global.WIDTH_RATIO, height: 150 * global.HEIGHT_RATIO}
    ,bookCoverHalfView: { alignItems:'flex-start', justifyContent:'flex-start', margin:10 * global.WIDTH_RATIO, width: 80 * global.WIDTH_RATIO, height: 120 * global.HEIGHT_RATIO}
    ,pageFooterView: { alignItems: 'center', justifyContent:'space-between', flexDirection:'row', width:'100%', height:'20%'}

    ,bookList: { flexDirection: 'row', flexWrap:'wrap', alignItems:'center', justifyContent:'space-around' }

    ,centeredText: { textAlign:'center' }
    ,italic: { fontStyle:'italic' }

    ,padding10: { padding: 10 * global.WIDTH_RATIO }
    ,padding20: { padding: 20 * global.WIDTH_RATIO }
    ,marginTop10: { marginTop: 10 * global.HEIGHT_RATIO }

    ,groupBoxContainer:  {borderWidth:0.5 * global.WIDTH_RATIO, borderColor:'black', padding:10 * global.HEIGHT_RATIO, paddingTop: 20 * global.HEIGHT_RATIO, 
            backgroundColor:'#F7E19E', borderRadius:30}
    ,groupBoxHeader: {position:'absolute', paddingLeft:7 * global.WIDTH_RATIO, paddingRight:7 * global.WIDTH_RATIO, left: 10 * global.WIDTH_RATIO, top: -10 * global.WIDTH_RATIO, 
            backgroundColor: '#FBC61E'}

    ,choiceButtonView: { flexDirection:'row', justifyContent:'space-between', marginBottom:-2 * global.HEIGHT_RATIO, width:180 * global.WIDTH_RATIO }
    ,choiceButton: { marginTop:5 * global.HEIGHT_RATIO, height:45 * global.HEIGHT_RATIO, width:80 * global.WIDTH_RATIO }
    ,choiceCounterView: {position:'absolute', borderColor:'black', borderWidth:0.5 * global.WIDTH_RATIO, borderRadius:15 * global.WIDTH_RATIO, padding:2 * global.WIDTH_RATIO, 
            right:3 * global.WIDTH_RATIO, top:5  * global.WIDTH_RATIO, backgroundColor:'white', zIndex: 0 }

    ,topText: { marginTop: 20 * global.HEIGHT_RATIO, height: 40 * global.HEIGHT_RATIO, width: '100%', marginBottom: 10 * global.HEIGHT_RATIO }
    ,textInput: { flex:1, height: 40 * global.HEIGHT_RATIO, margin:5 * global.HEIGHT_RATIO, padding:5 * global.HEIGHT_RATIO, borderColor:'black', borderWidth:0.5 * global.HEIGHT_RATIO, borderRadius:5 * global.HEIGHT_RATIO }
    ,textWithSwitch: { marginRight: 10 * global.WIDTH_RATIO }
    ,switch: { transform: [{scaleX: global.WIDTH_RATIO}, {scaleY: global.HEIGHT_RATIO}], marginRight: 10 * global.WIDTH_RATIO }
    ,switchView: {flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:5 * global.WIDTH_RATIO}

    ,fill: { width:'100%', height:'100%' }
    ,blackBorder: {borderWidth:0.5 * global.WIDTH_RATIO, borderColor:'black'}
    ,centeredContent: {alignItems:'center', justifyContent:'center'}

    ,bookSelectItem: { borderWidth:0.5 * global.WIDTH_RATIO, borderColor:'black', width:'80%', backgroundColor:'#FBC61E', alignItems:'center', marginBottom:5 * global.HEIGHT_RATIO }

    
    ,topLeftButton: {position:'absolute', left:5 * global.WIDTH_RATIO, top:5 * global.HEIGHT_RATIO, width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}
    ,topRightButton: {position:'absolute', right:5 * global.WIDTH_RATIO, top:5 * global.HEIGHT_RATIO, width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}
    ,bottomLeftButton: {position:'absolute', left:5 * global.WIDTH_RATIO, bottom:5 * global.HEIGHT_RATIO, width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}
    ,bottomLeftUpButton: {position:'absolute', left:5 * global.WIDTH_RATIO, bottom:60 * global.HEIGHT_RATIO, width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}
    ,bottomRightButton: {position:'absolute', right:5 * global.WIDTH_RATIO, bottom:5 * global.HEIGHT_RATIO, width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}
    ,middleLeftButton: {position:'absolute', left:5 * global.WIDTH_RATIO, top:155 * global.HEIGHT_RATIO, width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}
    ,middleRightButton: {position:'absolute', right:5 * global.WIDTH_RATIO, top:155 * global.HEIGHT_RATIO, width:50 * global.WIDTH_RATIO, height:50 * global.HEIGHT_RATIO}

    ,centerRightLargeButton: {position:'absolute', width:120 * global.WIDTH_RATIO, height:100 * global.HEIGHT_RATIO, top: 130 * global.HEIGHT_RATIO, right: 16 * global.WIDTH_RATIO}
    ,centerBottomLargeButton: {position:'absolute', width:140 * global.WIDTH_RATIO, height:60 * global.HEIGHT_RATIO, bottom: 10 * global.HEIGHT_RATIO, right: 250 * global.WIDTH_RATIO}
    ,centerBottomLargerButton: {position:'absolute', width:185 * global.WIDTH_RATIO, height:80 * global.HEIGHT_RATIO, bottom: 10 * global.HEIGHT_RATIO, right: 228 * global.WIDTH_RATIO}
    ,centerBottomLongButton: {position:'absolute', width:150 * global.WIDTH_RATIO, height:45 * global.HEIGHT_RATIO, bottom: 10 * global.HEIGHT_RATIO, right: 245 * global.WIDTH_RATIO}
                                 
    ,...Platform.select({
                ios:
                {
                    pageText: { fontSize:18 * global.WIDTH_RATIO, fontFamily:'Berrylicious', fontWeight:'bold', marginTop:5 * global.HEIGHT_RATIO,
                    borderRadius:30 * global.WIDTH_RATIO, textAlign:'center', padding:5 * global.WIDTH_RATIO, paddingLeft:7 * global.WIDTH_RATIO, paddingLeft:7 * global.WIDTH_RATIO }
            
                    ,summerJoy: {fontFamily: 'SummerJoy', backgroundColor:'transparent' }
                    ,h1: { fontSize:36 * global.WIDTH_RATIO, fontFamily: 'SummerJoy', backgroundColor:'transparent' }
                    ,h2: { fontSize:30 * global.WIDTH_RATIO, fontFamily: 'SummerJoy', backgroundColor:'transparent' }
                    ,h3: { fontSize:24 * global.WIDTH_RATIO, fontFamily: 'SummerJoy', backgroundColor:'transparent' }
                    ,h4: { fontSize:16 * global.WIDTH_RATIO, fontFamily: 'SummerJoy', backgroundColor:'transparent' }
                    ,title: { fontSize:48 * global.WIDTH_RATIO, fontFamily: 'SummerJoy', backgroundColor:'transparent' }
                    ,plainText: { fontSize:12 * global.WIDTH_RATIO, fontFamily: 'Helvetica', backgroundColor:'transparent' }
                    ,smallPlainText: { fontSize:10 * global.WIDTH_RATIO, fontFamily: 'Helvetica', backgroundColor:'transparent' }
                    ,text10: { fontSize:10 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', backgroundColor:'transparent' }
                    ,boldText10: { fontSize:10 * global.WIDTH_RATIO, fontFamily:'Berrylicious', fontWeight:'bold', backgroundColor:'transparent' }
                    ,text12: { fontSize:12 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', backgroundColor:'transparent' }
                    ,boldText12: { fontSize:12 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', fontWeight:'bold', backgroundColor:'transparent' }
                    ,text14: { fontSize:14 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', backgroundColor:'transparent' }
                    ,boldText14: { fontSize:14 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', fontWeight:'bold', backgroundColor:'transparent' }
                    ,text16: { fontSize:16 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', backgroundColor:'transparent' }
                    ,boldText16: { fontSize:16 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', fontWeight:'bold', backgroundColor:'transparent' }
                    ,boldText24: { fontSize:18 * global.WIDTH_RATIO, fontFamily: 'Berrylicious', fontWeight:'bold', backgroundColor:'transparent' }
                },
                android: {
                    pageText: { fontSize:18 * global.WIDTH_RATIO, fontFamily: 'berrylicious_bold', marginTop:5 * global.HEIGHT_RATIO,
                    borderRadius:30 * global.WIDTH_RATIO, textAlign:'center', padding:5 * global.WIDTH_RATIO, paddingLeft:7 * global.WIDTH_RATIO, paddingLeft:7 * global.WIDTH_RATIO }
            
                    ,summerJoy: {fontFamily: 'summer_joy' }
                    ,h1: { fontSize:36 * global.WIDTH_RATIO, fontFamily: 'summer_joy' }
                    ,h2: { fontSize:30 * global.WIDTH_RATIO, fontFamily: 'summer_joy' }
                    ,h3: { fontSize:24 * global.WIDTH_RATIO, fontFamily: 'summer_joy' }
                    ,h4: { fontSize:16 * global.WIDTH_RATIO, fontFamily: 'summer_joy' }
                    ,title: { fontSize:48 * global.WIDTH_RATIO, fontFamily: 'summer_joy' }
                    ,plainText: { fontSize:12 * global.WIDTH_RATIO, fontFamily: 'sans-serif' }
                    ,smallPlainText: { fontSize:10 * global.WIDTH_RATIO, fontFamily: 'sans-serif' }
                    ,text10: { fontSize:10 * global.WIDTH_RATIO, fontFamily: 'berrylicious' }
                    ,boldText10: { fontSize:10 * global.WIDTH_RATIO, fontFamily:'berrylicious_bold' }
                    ,text12: { fontSize:12 * global.WIDTH_RATIO, fontFamily: 'berrylicious' }
                    ,boldText12: { fontSize:12 * global.WIDTH_RATIO, fontFamily: 'berrylicious_bold' }
                    ,text14: { fontSize:14 * global.WIDTH_RATIO, fontFamily: 'berrylicious' }
                    ,boldText14: { fontSize:14 * global.WIDTH_RATIO, fontFamily: 'berrylicious_bold' }
                    ,text16: { fontSize:16 * global.WIDTH_RATIO, fontFamily: 'berrylicious' }
                    ,boldText16: { fontSize:16 * global.WIDTH_RATIO, fontFamily: 'berrylicious_bold' }
                    ,boldText24: { fontSize:18 * global.WIDTH_RATIO, fontFamily: 'berrylicious_bold' }
                }
            })
});
