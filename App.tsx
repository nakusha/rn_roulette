/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {SafeAreaView, View} from 'react-native';
import Wheels from './src/Wheels';

const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const colors = [
  '#FFDDC1',
  '#FFD700',
  '#FF6347',
  '#90EE90',
  '#1E90FF',
  '#FFDDC1',
  '#FFD700',
  '#FF6347',
  '#90EE90',
  '#1E90FF',
  '#FFDDC1',
];
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Wheels items={items} colors={colors} />
    </SafeAreaView>
  );
}

export default App;
