import React from 'react';
import { View, Text, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = () => {
  return (
    <Appbar.Header style={{ backgroundColor: '#1E2A38' }}>
      <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
        TrainEase
      </Text>
    </Appbar.Header>
  );
};

export default Header;
