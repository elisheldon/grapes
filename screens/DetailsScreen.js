import React from 'react'
import { StyleSheet, Text, ScrollView, View, Image, Button } from 'react-native'
import { connect } from 'react-redux'
import { Rating } from 'react-native-ratings'

import { removeWineFromCellar } from '../redux/actions'

const GRAPE = require('../assets/grape.png')

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('name'),
  })

  constructor(props) {
    super(props);
    // if the wine is in the cellar, use the cellar for data so we get notes and rating; otherwise, use search results which are passed in as props
    if(this.isWineInCellar(this.props.navigation.state.params, this.props.cellar)){
      this.state = {wine: this.props.cellar.find(wine => wine.code === this.props.navigation.state.params.code)}
    }
    else{
      this.state = {wine: this.props.navigation.state.params}
    }
  }

  showInfo = key => {
    return(
      this.state.wine[key] && 
        <Text style={styles.header}>{key.charAt(0).toUpperCase() + key.slice(1) + ': '} 
          <Text style={styles.info}>{this.state.wine[key]}</Text>
        </Text>
    )
  }

  isWineInCellar = (wine, cellar) => {
    return cellar.some(cellarWine => {
      return cellarWine.code === wine.code
    })
  }

  handleAddButton = () => {
    this.props.navigation.navigate('AddWine', this.state.wine)
  }

  handleRemoveButton = () => {
    myWine = this.state.wine
    cellar = this.props.cellar || []
    if(this.isWineInCellar(myWine,cellar)){
      this.props.removeWineFromCellar(myWine)
    }
    this.props.navigation.goBack()
  }

  render(){
    const wine = this.state.wine
    return(
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {wine.image &&
            <View style={styles.imageView}>
              <Image source={{uri: wine.image}} style={styles.image}/>
            </View>
          }
          {this.showInfo('name')}
          {this.showInfo('vintage')}
          {this.showInfo('type')}
          {this.showInfo('varietal')}
          {this.showInfo('winery')}
          {this.showInfo('region')}
          {this.showInfo('notes')}
          {this.isWineInCellar(wine,this.props.cellar) // if wine is in cellar, show ratings/notes/remove button, otherwise show add button
            ? 
              <View>
                <View style={styles.sideBySide}>
                  <Text style={styles.header}>Rating: </Text>
                  <Rating
                    type='custom'
                    readonly
                    startingValue={wine.rating}
                    ratingImage={GRAPE}
                    ratingColor='#92278f'
                    ratingBackgroundColor='#cccccc'
                    ratingCount={5}
                    imageSize={20}
                    fractions={1}
                  />
                </View>
                <View style={styles.vSpace}>
                  <Button
                    title='Remove from cellar'
                    color = '#92278f'
                    onPress={this.handleRemoveButton}>
                  </Button>
                </View>
              </View>
            : 
              <View style={styles.vSpace}>
                <Button
                  title='Rate and add wine'
                  color = '#92278f'
                  onPress={this.handleAddButton}>
                </Button>
              </View>
          }
          
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  imageView: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    height: 240,
    width: 240,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
  },
  info: {
      fontWeight: 'normal',
      color: '#92278f',
  },
  sideBySide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vSpace: {
    marginVertical: 15,
  },
})

const mapStateToProps = state => ({
  cellar: state.cellar,
})

export default connect(mapStateToProps, {removeWineFromCellar})(DetailsScreen)