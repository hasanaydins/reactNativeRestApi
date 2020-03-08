import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import dataIcerik from '../../data';

const {width} = Dimensions.get('window');

export default class FlatListExample extends Component {
  state = {
    text: '',
    contacts: dataIcerik,
  };

  renderContactsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 0 ? 'white' : '#efefef'},
        ]}>
        <Image source={{uri: item.picture}} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    const {text} = this.state;
    return (
      <TextInput
        onChangeText={text => {
          this.setState({
            text,
          });

          this.searchFilter(text);
        }}
        value={text}
        style={styles.myInput}
        secureTextEntry={false}
        autoCapitalize="words" // characters, sentences ,  none
        placeholder="Bir isim giriniz"
      />
    );
  };

  searchFilter = text => {
    const newData = dataIcerik.filter(item => {
      const listItem = `${item.name.toLowerCase()}${item.company.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });

    this.setState({
      contacts: newData,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderContactsItem}
          data={this.state.contacts}
          keyExtractor={(item, index) => index.toString()} // veya keyExtractor={ item=> item._id }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eeee',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    marginTop: 5,
  },
  myInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dddd',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 12,
  },
});
