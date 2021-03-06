import './reactotronConfig';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, StatusBar, AppState, Dimensions, Platform } from 'react-native';
import MainMenu from './src/components/mainMenu.js';
import Page from './src/components/page.js';
import Settings from './src/components/settings.js';
import Store from './src/components/store.js';
import TitlePage from './src/components/titlePage.js';
import EndPage from './src/components/endPage.js';
import ParentalGate from './src/components/parentalGate.js';
import { StackNavigator } from 'react-navigation';
import { compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { changePage, changeName, pageCounters } from './src/reducers/book.js'
import { products } from './src/reducers/store.js'
import { changeSettings } from './src/reducers/settings.js'
import { persistStore, autoRehydrate, applyMiddleware } from 'redux-persist';
import Orientation from 'react-native-orientation';
import Reactotron from 'reactotron-react-native';

let store = createStore(combineReducers({changePage, changeName, pageCounters, changeSettings, products}), compose(autoRehydrate({log:true})));

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { rehydrated: false, showSplash:true }

    global.WIDTH_RATIO = Dimensions.get('window').width  / 640;
    global.HEIGHT_RATIO = Dimensions.get('window').height  / 360;
  }

  componentWillMount()
  {
    Orientation.lockToLandscape();    
    const persistor = persistStore(store, {storage: AsyncStorage, whitelist:['pageCounters', 'changeSettings', 'products']}, () => { this.setState({ rehydrated: true })});
    if (Platform.OS === "android")
    {
      setTimeout(function(){ this.setState({ showSplash: false })}.bind(this), 1000);
    }
    else
    {
      this.setState({ showSplash: false });
    }
  }

  componentDidMount()
  {
    AppState.addEventListener('change', this.setLandscape);
  }

  setLandscape()
  {
    Orientation.lockToLandscape();    
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
        <StatusBar hidden={true}/>
          {this.state.showSplash ? <View style={{backgroundColor: '#00CAFF', width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} resizeMode='stretch'>
            <Image source={require("./img/choosicles_logo.png")} resizeMode='contain' style={{height:'20%'}} />
            </View>
            : <Navigator /> }
        </View>
      </Provider>
    );
  }
}

const Navigator = StackNavigator({
    MainMenu: {
      screen: MainMenu
    },
    Page: {
      screen: Page
    },
    Settings: {
      screen: Settings
    },
    Store: {
      screen: Store
    },
    TitlePage: {
      screen: TitlePage
    },
    EndPage: {
      screen: EndPage
    },
    ParentalGate: {
      screen: ParentalGate
    }
  },
  {
    headerMode:'none',
    cardStyle:{ backgroundColor:'white', margin:0, padding:0 }
  }
);
