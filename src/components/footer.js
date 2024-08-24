import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity>
        <Image source={require('../assets/Home.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/history.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/contact.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/profile.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E2A38',
    paddingVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
};

export default Footer;
