import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TableScreen from './TableScreen';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <TableScreen />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Table'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
