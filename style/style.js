import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
    
    mainMenuView: { flex:1, flexDirection: 'column', alignItems:'center', backgroundColor:'white' }
    ,pageView: { flex:1, backgroundColor:'#FAFAFA', flexDirection:'column' }
    ,h1: { fontSize:36, fontFamily: 'summer_joy' }
    ,h2: { fontSize:30, fontFamily: 'summer_joy' }
    ,h3: { fontSize:24, fontFamily: 'summer_joy' }
    ,h4: { fontSize:16, fontFamily: 'summer_joy' }
    ,title: { fontSize:48, fontFamily: 'summer_joy' }

    ,bookCoverView: { alignItems:'center', justifyContent:'center', width:110, height:200, margin:0 }
    ,pageFooterView: { alignItems: 'center', justifyContent:'space-between', flexDirection:'row', width:'100%', height:'20%'}

    ,bookList: { flexDirection: 'row', flexWrap:'wrap', alignItems:'center', justifyContent:'space-around' }

    ,centeredText: { textAlign:'center' }
    ,italic: { fontStyle:'italic' }
    
    ,blackBorder: {borderWidth:0.5, borderColor:'black'}
    ,centeredContent: {alignItems:'center', justifyContent:'center'}
                                 
    ,...Platform.select({
                ios:
                {
                    summerJoy: {fontFamily: 'Summer Joy' }
                    ,plainText: { fontSize:12, fontFamily: 'sans-serif' }
                    ,smallPlainText: { fontSize:10, fontFamily: 'sans-serif' }
                    ,text10: { fontSize:10, fontFamily: 'berrylicious' }
                    ,boldText10: { fontSize:10, fontFamily:'berrylicious', fontWeight:'bold' }
                    ,text12: { fontSize:12, fontFamily: 'berrylicious' }
                    ,boldText12: { fontSize:12, fontFamily: 'berrylicious', fontWeight:'bold' }
                    ,text14: { fontSize:14, fontFamily: 'berrylicious' }
                    ,boldText14: { fontSize:14, fontFamily: 'berrylicious', fontWeight:'bold' }
                    ,text16: { fontSize:16, fontFamily: 'berrylicious' }
                    ,boldText16: { fontSize:16, fontFamily: 'berrylicious', fontWeight:'bold' }
                    ,boldText24: { fontSize:24, fontFamily: 'berrylicious', fontWeight:'bold' }
                },
                android: {
                    summerJoy: {fontFamily: 'summer_joy' }
                    ,plainText: { fontSize:12, fontFamily: 'sans-serif' }
                    ,smallPlainText: { fontSize:10, fontFamily: 'sans-serif' }
                    ,text10: { fontSize:10, fontFamily: 'berrylicious' }
                    ,boldText10: { fontSize:10, fontFamily:'berrylicious_bold' }
                    ,text12: { fontSize:12, fontFamily: 'berrylicious' }
                    ,boldText12: { fontSize:12, fontFamily: 'berrylicious_bold' }
                    ,text14: { fontSize:14, fontFamily: 'berrylicious' }
                    ,boldText14: { fontSize:14, fontFamily: 'berrylicious_bold' }
                    ,text16: { fontSize:16, fontFamily: 'berrylicious' }
                    ,boldText16: { fontSize:16, fontFamily: 'berrylicious_bold' }
                    ,boldText24: { fontSize:24, fontFamily: 'berrylicious_bold' }
                }
            })
});
