import React from 'react'
import { StyleSheet, TextInput, View, Button } from 'react-native'


export default class NewWineScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Add a wine',
  })

  state = {}

  handleAddButton = () => {
    let wine = {}
    wine.name = this.state.name
    wine.vintage = this.state.vintage
    wine.type = this.state.type
    wine.winery = this.state.winery
    wine.region = this.state.region
    wine.code = Math.random().toString(36).substring(2, 15) // create a random local code for this wine
    this.props.navigation.navigate('AddWine', wine)
  }

  handleNameChange = name => {this.setState({name})}
  handleVintageChange = vintage => {this.setState({vintage})}
  handleTypeChange = type => {this.setState({type})}
  handleVarietalChange = varietal => {this.setState({varietal})}
  handleWineryChange = winery => {this.setState({winery})}
  handleRegionChange = region => {this.setState({region})}

  render(){
    return(
      <View style={styles.container}>
          <TextInput style={styles.fieldInput} placeholder='Name...' value = {this.state.name} onChangeText = {this.handleNameChange} />
          <TextInput style={styles.fieldInput} placeholder='Vintage...' value = {this.state.vintage} onChangeText = {this.handleVintageChange} />
          <TextInput style={styles.fieldInput} placeholder='Type (Red / White / Rose...)' value = {this.state.type} onChangeText = {this.handleTypeChange} />
          <TextInput style={styles.fieldInput} placeholder='Varietal (Bordeaux, Sangiovese...)' value = {this.state.varietal} onChangeText = {this.handleVarietalChange} />
          <TextInput style={styles.fieldInput} placeholder='Winery...' value = {this.state.winery} onChangeText = {this.handleWineryChange} />
          <TextInput style={styles.fieldInput} placeholder='Region...' value = {this.state.region} onChangeText = {this.handleRegionChange} /> 
          <Button
            title='Rate and add wine'
            color = '#92278f'
            onPress={this.handleAddButton}>
          </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  fieldInput:{
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    padding: 5,
    fontSize: 16,
  },
})