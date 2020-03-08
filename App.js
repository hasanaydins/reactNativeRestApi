import React, {Component} from 'react';
import {StyleSheet, Dimensions, SafeAreaView, Text, Button} from 'react-native';
import FlatListExample from './src/components/FlatList';
import axios from 'axios';

const {width} = Dimensions.get('window');

export default class App extends Component {
  state = {
    name: '',
    surname: '',
    loading: true,
  };
  getRandomUser = async () => {
    this.setState({
      loading: true,
    });

    const {
      data: {results},
    } = await axios.get('https://randomuser.me/api/');

    const {
      name: {first, last},
    } = results[0];

    this.setState({
      name: first,
      surname: last,
      loading: false,
    });
  };

  componentDidMount() {
    this.getRandomUser();
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

        <Button title="Random User" onPress={this.getRandomUser} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
