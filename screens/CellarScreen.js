import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CellarList from '../components/CellarList'

export default class CollectionScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'My Cellar'
  }

  handleSelectWine = wine => {
    this.props.navigation.push('CellarDetails', wine)
  }

  render(){
    return(
      <View style={styles.container}>
        <CellarList
          onSelectWine={this.handleSelectWine}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
})