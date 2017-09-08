import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import MainMenu from './src/components/mainMenu.js';
import Page from './src/components/page.js';
import Settings from './src/components/settings.js';
import Store from './src/components/store.js';
import { StackNavigator } from 'react-navigation';
import { compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { changePage, changeName, pageCounters } from './src/reducers/book.js'
import { changeSettings } from './src/reducers/settings.js'
import { persistStore, autoRehydrate, applyMiddleware } from 'redux-persist';

let store = createStore(combineReducers({changePage, changeName, pageCounters, changeSettings}), compose(autoRehydrate({log:true})));

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { rehydrated: false }
  }

  componentWillMount()
  {
    const persistor = persistStore(store, {storage: AsyncStorage, whitelist:['pageCounters', 'changeSettings']}, () => { this.setState({ rehydrated: true })});
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <Navigator />
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
    }
  },
  {
    headerMode:'none',
    cardStyle:{ backgroundColor:'white', margin:0, padding:0 }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
