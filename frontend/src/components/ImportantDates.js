import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ImportantDates = ({ startDate, endDate }) => (
  <View style={styles.container}>
    <Text>Start: {new Date(startDate).toDateString()}</Text>
    <Text>End: {new Date(endDate).toDateString()}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16 },
});

export default ImportantDates;
