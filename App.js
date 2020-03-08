import React, {Component} from 'react';
import {StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import FlatListExample from './src/components/FlatList';
import axios from 'axios';

const {width} = Dimensions.get('window');

export default class App extends Component {
  state = {
    name: '',
    surname: '',
    loading: true
  };

  componentDidMount() {
    axios
      .get('https://randomuser.me/api/')
      .then(user => user.data.results[0])
      .then(user => {
        this.setState({
          name: user.name.first,
          surname: user.name.last,
          loading: false,
        });
      });
  }

  render() {
    const {name, surname, loading} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {/*<FlatListExample />*/}

        {loading ? (
          <Text>loading...</Text>
        ) : (
          <Text>
            {name} {surname}
          </Text>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
