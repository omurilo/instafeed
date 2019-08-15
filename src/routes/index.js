import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Feed from '../pages/Feed';

import logo from '../assets/instagram.png';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Feed,
    },
    {
      headerLayoutPreset: 'center',
      defaultNavigationOptions: {
        headerTitle: <Image source={logo} />,
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  ),
);

export default Routes;
