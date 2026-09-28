import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RegisterButton = ({ onPress, label = 'Register' }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  text: { color: '#fff', fontWeight: 'bold' },
});

export default RegisterButton;
