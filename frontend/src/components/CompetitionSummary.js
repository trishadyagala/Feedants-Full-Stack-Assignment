import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompetitionSummary = ({ description }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16 },
  text: { fontSize: 14, color: '#333' },
});

export default CompetitionSummary;
