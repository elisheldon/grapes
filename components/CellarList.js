import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import WineRow from './WineRow'

const CellarList = props => (
  <FlatList
    renderItem={
      ({item}) => <WineRow {...item} onSelectWine={props.onSelectWine}/>
    }
    data={props.cellar}
    keyExtractor={(item, index) => item.code}
  />
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => ({
  cellar: state.cellar,
})

export default connect(mapStateToProps)(CellarList)