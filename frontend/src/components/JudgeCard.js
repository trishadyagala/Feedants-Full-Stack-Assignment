import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JudgeCard = ({ name }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 12, marginRight: 8, borderRadius: 8, backgroundColor: '#f2f2f2' },
  name: { fontSize: 14, fontWeight: '600' },
});

export default JudgeCard;
