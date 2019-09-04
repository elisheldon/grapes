import React from 'react'
import { FlatList, StyleSheet, Image, View, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import WineRow from './WineRow'

class SearchResultsList extends React.Component {
  handleCreateButton = () => {
    this.props.navigation.push('NewWine')
  }

  render(){
    // show create button if a search has been started and we're not loading results
    let showCreate = false
    if(this.props.wineResults[0] && this.props.wineResults[0] !== 'l'){
      showCreate = true
    }
    return(
      <ScrollView style={styles.container}>
      {this.props.wineResults === 'loading' 
      ? 
        <View style={styles.sideBySide}>
          <Image style={styles.grape} source={require('../assets/grape_spin.gif')} />
          <Image style={styles.grape} source={require('../assets/grape_spin.gif')} />
          <Image style={styles.grape} source={require('../assets/grape_spin.gif')} />
          <Image style={styles.grape} source={require('../assets/grape_spin.gif')} />
          <Image style={styles.grape} source={require('../assets/grape_spin.gif')} />
        </View>
      :
        this.props.wineResults[0] !== 'no results' && <FlatList
          renderItem={
            ({item}) => <WineRow {...item} onSelectWine={this.props.onSelectWine}/>
          }
          data={this.props.wineResults}
          keyExtractor={(item, index) => item.code}
        />
        }
        <View>
          {showCreate && <View style={styles.createButton}>
            <Button
              title="Can't find it by search? Add a new wine"
              color = '#92278f'
              onPress={this.handleCreateButton}>
            </Button>
          </View>}
        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  sideBySide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grape: {
    width: 32,
    height: 32,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  createButton: {
    marginTop: 10,
  },
})

const mapStateToProps = state => ({
  wineResults: state.wineResults,
})

export default connect(mapStateToProps)(SearchResultsList)