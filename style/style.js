import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    
    mainMenuView: { flex:1, flexDirection: 'column', alignItems:'center', backgroundColor:'white' },
    pageView: { flex:1, backgroundColor:'#FAFAFA', flexDirection:'column' },
    h1: { fontSize:36, fontWeight:'bold' },
    title: { fontSize:48, fontWeight:'bold' },

    bookCoverView: { alignItems:'center', justifyContent:'center', width:100, height:100, margin:10 },
    pageFooterView: { alignItems: 'center', justifyContent:'space-between', flexDirection:'row', width:'100%', height:'20%'},

    bookList: { flexDirection: 'row', flexWrap:'wrap', alignItems:'center', justifyContent:'space-around' }
});