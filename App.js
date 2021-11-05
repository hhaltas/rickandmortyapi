import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//ROUTER
import RouterPage from '../rickandmortyapi/src/router/router';
//REDUX
import { Provider } from 'react-redux';
import configureStore from './src/redux/reducers/configure_store';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store} style={{ flex: 1 }}>
        <View style={styles.container}>
          <RouterPage />
        </View>
      </Provider>

    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});