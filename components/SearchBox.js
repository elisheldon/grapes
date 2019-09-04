import React from 'react'
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native'
import { connect } from 'react-redux'

import { searchWine } from '../redux/actions'

class SearchBox extends React.Component {
  state = {
    query: '',
  }

  handleQueryChange = query => {
    this.setState({query})
  }

  search = async() => {
    Keyboard.dismiss()
    this.props.searchWine(this.state.query)
  }

  render(){
    const loading = (this.props.wineResults === 'loading')
    return(
      <View style = {styles.searchContainer}>
        <TextInput
          style = {styles.searchTextBox}
          placeholder = 'Name, winery, vintage...'
          value = {this.state.query}
          onChangeText = {this.handleQueryChange}
          onSubmitEditing = {this.search}
        />
        <Button
          title = 'Search'
          color = '#92278f'
          onPress = {this.search}
          disabled = {loading}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  searchTextBox:{
    textAlign: 'left',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
  },
})

const mapStateToProps = state => ({
  wineResults: state.wineResults,
})

export default connect(mapStateToProps, {searchWine})(SearchBox)