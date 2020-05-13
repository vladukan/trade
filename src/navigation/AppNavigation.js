import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { AboutScreen } from '../screens/AboutScreen'
import { THEME } from '../theme'
import {ListScreen} from "../screens/ListScreen";
import {SocketScreen} from "../screens/SocketScreen";
import {ListItemScreen} from "../screens/ListItemScreen";

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
  }
}

const ListNavigator = createStackNavigator(
    {
        List: ListScreen,
        ListItem: ListItemScreen,
    },
    navigatorOptions
)

const SocketNavigator = createStackNavigator(
    {
        Socket: SocketScreen,
    },
    navigatorOptions
)


const AboutNavigator = createStackNavigator(
  {
    About: AboutScreen
  },
  navigatorOptions
)



const MainNavigator = createDrawerNavigator(
  {
      ListTabs: {
          screen: ListNavigator,
          navigationOptions: {
              drawerLabel: 'Задание 1'
          }
      },
      SocketTabs: {
          screen: SocketNavigator,
          navigationOptions: {
              drawerLabel: 'Задание 2'
          }
      },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'О приложении'
      }
    },
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'open-bold'
      }
    }
  }
)

export const AppNavigation = createAppContainer(MainNavigator)
