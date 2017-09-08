import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    
    mainMenuView: { flex:1, flexDirection: 'column', alignItems:'center', backgroundColor:'white' },
    pageView: { flex:1, backgroundColor:'#FAFAFA', flexDirection:'column' },
    h1: { fontSize:36, fontWeight:'bold' },
    h2: { fontSize:30, fontWeight:'bold' },
    h3: { fontSize:24, fontWeight:'bold' },
    title: { fontSize:48, fontWeight:'bold' },

    bookCoverView: { alignItems:'center', justifyContent:'center', width:200, height:200, margin:0 },
    pageFooterView: { alignItems: 'center', justifyContent:'space-between', flexDirection:'row', width:'100%', height:'20%'},

    bookList: { flexDirection: 'row', flexWrap:'wrap', alignItems:'center', justifyContent:'space-around' }
});