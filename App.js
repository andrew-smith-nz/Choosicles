import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './src/components/mainMenu.js';
import Book from './src/components/book.js';
import { StackNavigator } from 'react-navigation';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Navigator />
      </View>
    );
  }
}

const Navigator = StackNavigator({
    MainMenu: {
      screen: MainMenu
    },
    Book: {
      screen: Book
    }
  },
  {
    headerMode:'none',
    cardStyle:{backgroundColor:'white', margin:0, padding:0}
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
