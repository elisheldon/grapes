import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'

const WineRow = props => (
  <TouchableOpacity
    style={styles.result}
    onPress={() => props.onSelectWine(props)}
  >
    <Text style={styles.headerRow} numberOfLines = {1}>
      {props.vintage ? props.vintage + ' ' : ''}
      {props.name ? props.name + ' ' : ''}
    </Text>
    <Text style={styles.detailsRow} numberOfLines = {1}>
      {props.winery ? props.winery + ' ' : 'Winery unknown'}
    </Text>
    <Text style={styles.detailsRow} numberOfLines = {1}>
      {props.varietal ? props.varietal + ' ' : 'Varietal unknown'}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  result: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    padding: 5,
  },
  headerRow: {
  },
  detailsRow: {
    color: '#888',
  }
})

export default WineRow