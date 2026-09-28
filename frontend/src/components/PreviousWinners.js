import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PreviousWinners = ({ winners = [] }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Previous Winners</Text>
    <FlatList
      data={winners}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text>{item}</Text>}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
});

export default PreviousWinners;
