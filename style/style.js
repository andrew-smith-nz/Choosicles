import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    
    mainMenuView: { flex:1, flexDirection: 'column', alignItems:'center', backgroundColor:'white' },
    pageView: { flex:1, backgroundColor:'#FAFAFA', flexDirection:'column' },
    h1: { fontSize:36, fontFamily: 'summer_joy' },
    h2: { fontSize:30, fontFamily: 'summer_joy' },
    h3: { fontSize:24, fontFamily: 'summer_joy' },
    title: { fontSize:48, fontFamily: 'summer_joy' },

    bookCoverView: { alignItems:'center', justifyContent:'center', width:200, height:200, margin:0 },
    pageFooterView: { alignItems: 'center', justifyContent:'space-between', flexDirection:'row', width:'100%', height:'20%'},

    bookList: { flexDirection: 'row', flexWrap:'wrap', alignItems:'center', justifyContent:'space-around' },

    summerJoy: {fontFamily: 'summer_joy' }


    ,plainText: { fontSize:12, fontFamily: 'sans-serif' }
    ,smallPlainText: { fontSize:10, fontFamily: 'sans-serif' }
    ,text: { fontSize:12, fontFamily: 'summer_joy' }
    ,smallText: { fontSize:10, fontFamily: 'summer_joy' }
    ,centeredText: { textAlign:'center' }
    ,italic: { fontStyle:'italic' }
    
});