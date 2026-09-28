import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompetitionHeader = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
});

export default CompetitionHeader;
