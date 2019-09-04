import React from 'react'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchScreen from './screens/SearchScreen'
import DetailsScreen from './screens/DetailsScreen'
import CellarScreen from './screens/CellarScreen'
import { store, persistor } from './redux/store'
import AddWineScreen from './screens/AddWineScreen'
import NewWineScreen from './screens/NewWineScreen'

const SearchStackNavigator = createStackNavigator({
  Search: SearchScreen,
  SearchDetails: DetailsScreen,
  AddWine: AddWineScreen,
  NewWine: NewWineScreen,
},
{
  initialRouteName: 'Search',
})

const CellarStackNavigator = createStackNavigator({
  Cellar: CellarScreen,
  CellarDetails: DetailsScreen,
},
{
  initialRouteName: 'Cellar',
})

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Search') {
    iconName = 'ios-search'
  } else if (routeName === 'Cellar') {
    iconName = 'ios-wine'
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const TabNavigator = createBottomTabNavigator({
  Search: SearchStackNavigator, 
  Cellar: CellarStackNavigator,
},
{
  initialRouteName: 'Search',
  //https://reactnavigation.org/docs/en/tab-based-navigation.html
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: '#92278f',
    inactiveTintColor: 'gray',
  },
})

const TabContainer = createAppContainer(TabNavigator)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TabContainer />
        </PersistGate>
    </Provider>
  )
}