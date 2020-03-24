import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7d40e7' />
      <Routes />
    </>
  );
};