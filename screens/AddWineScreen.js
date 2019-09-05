import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Rating } from 'react-native-ratings'
import { StackActions} from 'react-navigation'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'


import { addWineToCellar } from '../redux/actions'

const GRAPE = require('../assets/grape.png')

class AddWineScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('name'),
  })

  state = {
    wine: this.props.navigation.state.params,
    notes: null,
    rating: 2.5,
    photo: null,
  }

  showInfo = key => {
    return(
      this.state.wine[key] != '' && 
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
    let newWine = {...this.state.wine} // create a new mutable object
    newWine.notes = this.state.notes
    newWine.rating = this.state.rating
    newWine.image = this.state.photo || this.props.navigation.state.params.image
    cellar = this.props.cellar || []
    if(!this.isWineInCellar(newWine,cellar)){
      this.props.addWineToCellar(newWine)
    }
    // clear the search stack AND navigate to cellar
    this.props.navigation.dispatch(StackActions.popToTop())
    this.props.navigation.navigate('Cellar')
  }

  handleNotesChange = notes => {
    this.setState({notes})
  }

  ratingCompleted = rating => {
    this.setState({rating})
  }

  handlePhotoButton = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to take a photo.');
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  }

  render(){
    const wine = this.state.wine
    return(
      <ScrollView style={styles.container}>
        <Rating
            type='custom'
            ratingImage={GRAPE}
            ratingColor='#92278f'
            ratingBackgroundColor='#cccccc'
            ratingCount={5}
            imageSize={40}
            fractions={1}
            showRating={true}
            onFinishRating={this.ratingCompleted}
          />
          <TextInput
            style={styles.notesBox}
            multiline
            numberOfLines={3}
            placeholder='Notes...'
            value = {this.state.notes} 
            onChangeText = {this.handleNotesChange}
          />
          {this.state.photo &&
            <View style={styles.photoView}>
              <Image source={{uri: this.state.photo}} style={styles.photo}/>
            </View>
          }
          <Button
            title={this.state.photo ? 'Retake photo' : 'Take a photo'}
            color='#92278f'
            onPress={this.handlePhotoButton}>
          </Button>
          <View style={styles.spaceAbove}>
            <Button
              title='Add to cellar'
              color='#92278f'
              onPress={this.handleAddButton}>
            </Button>
          </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  notesBox: {
    textAlign: 'left',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 20,
    padding: 5,
    fontSize: 16,
  },
  spaceAbove: {
    marginTop: 20,
  },
  photoView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    height: 240,
    width: 240,
  },
})

const mapStateToProps = state => ({
  cellar: state.cellar,
})

export default connect(mapStateToProps, {addWineToCellar})(AddWineScreen)