import React from 'react'
import { StyleSheet, View} from 'react-native'

import SearchResultsList from '../components/SearchResultsList'
import SearchBox from '../components/SearchBox'


export default class SearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Find a wine'
  }

  handleSelectWine = wine => {
    this.props.navigation.push('SearchDetails', wine)
  }

  render(){
    return(
      <View style={styles.container}>
        <SearchBox/>
        <SearchResultsList
          onSelectWine={this.handleSelectWine}
          navigation={this.props.navigation}
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