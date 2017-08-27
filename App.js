import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './src/components/mainMenu.js';
import Page from './src/components/page.js';
import { StackNavigator } from 'react-navigation';
import { compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { changePage, changeName } from './src/reducers/book.js'

let store = createStore(combineReducers({changePage, changeName}));

export default class App extends React.Component {

  constructor(props){
    super(props);
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
