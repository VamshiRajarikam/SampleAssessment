import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
export default class TableScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      tableHead: ['A', 'B', 'C', 'D', 'E'],
      tableData: []
    };
  }
  componentDidMount() {
    let data = [];
    const rowCount = 200;
    const colCount = 5;
    let number = 1;
    for (let index = 1; index <= rowCount; index++) {
      let eachRow = [];
      for (let i = 1; i <= colCount; i++) {
        let x = '';
        if (number % 3 == 0 && number % 5 == 0) {
          x = 'FizzBuzz';
        } else if (number % 3 == 0) {
          x = 'Fizz';
        } else if (number % 5 == 0) {
          x = 'Buzz';
        } else {
          x = number.toString();
        }
        eachRow.push(x);
        number++;
      }
      data.push(eachRow);
    }
    this.setState({ tableData: data, ready: true });
  }
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        {state.ready && (
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center' }
});
