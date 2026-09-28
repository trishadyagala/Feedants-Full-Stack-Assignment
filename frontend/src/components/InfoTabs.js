import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InfoTabs = ({ tabs = [] }) => {
  const [active, setActive] = useState(0);

  return (
    <View>
      <View style={styles.tabRow}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => setActive(index)}>
            <Text style={active === index ? styles.activeTab : styles.tab}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        {tabs[active] && <Text>{tabs[active].content}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabRow: { flexDirection: 'row', padding: 16 },
  tab: { marginRight: 16, color: '#888' },
  activeTab: { marginRight: 16, color: '#000', fontWeight: 'bold' },
  content: { padding: 16 },
});

export default InfoTabs;
