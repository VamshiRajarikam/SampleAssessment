import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Col
} from 'react-native-table-component';
const { height, width } = Dimensions.get('window');
export default class SquareScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      possibleSquaresOnX: 10,
      possibleSquaresOnY: 0,
      squareList: [],
      pressCount: 0,
      resultMatrix: []
    };
  }

  componentDidMount() {
    const { possibleSquaresOnX } = this.state;
    let size = parseInt(width / possibleSquaresOnX);
    const possibleSquaresOnY = 10;
    this.setState({ size, possibleSquaresOnY });
    let squareList = [];
    let sampleList = [];
    let count = 0;
    for (let i = 0; i < possibleSquaresOnY; i++) {
      let horizontalSquares = [];
      let newHorizontalSquares = [];
      for (let j = 0; j < possibleSquaresOnX; j++) {
        horizontalSquares.push(0);
        newHorizontalSquares.push(count);
        count++;
      }
      sampleList.push(newHorizontalSquares);
      squareList.push(horizontalSquares);
    }
    this.setState({ squareList });
    this.matrixOrder();
    this.renderSquare();
    this.matrixOrder(possibleSquaresOnX, 10, sampleList);
  }

  matrixOrder(m, n, a) {
    let i,
      k = 0,
      l = 0;
    let z = 0;
    let size = m * n;
    let b = new Array(1000);
    while (k < m && l < n) {
      let val;
      for (i = l; i < n; ++i) {
        val = a[k][i];
        b[z] = val;
        ++z;
      }
      k++;
      for (i = k; i < m; ++i) {
        val = a[i][n - 1];
        b[z] = val;
        ++z;
      }
      n--;

      if (k < m) {
        for (i = n - 1; i >= l; --i) {
          val = a[m - 1][i];
          b[z] = val;
          ++z;
        }
        m--;
      }
      if (l < n) {
        for (i = m - 1; i >= k; --i) {
          val = a[i][l];
          b[z] = val;
          ++z;
        }
        l++;
      }
    }
    let result = [];
    for (let x = size - 1; x >= 0; --x) {
      if (b[x]) result.push(b[x]);
    }
    this.setState({ resultMatrix: result });
  }
  onSquarePress() {
    let { resultMatrix, pressCount, squareList } = this.state;
    if (resultMatrix[pressCount] !== undefined) {
      let val = resultMatrix[pressCount];
      let row = Math.floor(val / 10);
      let col = val % 10;
      squareList[row][col] = 1;
      pressCount++;
      this.setState({ squareList, pressCount });
    } else {
      squareList[0][0] = 1;
      this.setState({ squareList });
      alert('Allowed Screen is full');
    }
  }
  renderSquare() {
    let count = 0;
    const { size } = this.state;
    const all = this.state.squareList.map((yitem, indexi) => {
      const row = yitem.map((xitem, indexj) => {
        count++;
        return (
          <TouchableOpacity
            key={count}
            onPress={() => this.onSquarePress(indexi, indexj)}
          >
            <View
              style={
                this.state.squareList[indexi][indexj] == 0
                  ? { height: size, width: size, backgroundColor: '#FFFFF' }
                  : {
                      height: size,
                      width: size,
                      backgroundColor: '#D35400',
                      borderColor: '#BA4A00',
                      borderWidth: 2
                    }
              }
            />
          </TouchableOpacity>
        );
      });
      return (
        <View
          key={indexi}
          style={{
            flexDirection: 'row'
          }}
        >
          {row}
        </View>
      );
    });
    return all;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Optima',
            marginVertical: 10
          }}
        >
          Tap at the center of Square
        </Text>
        <View
          style={{
            borderColor: '#2E4053',
            borderWidth: 2
          }}
        >
          {this.state.squareList.length > 0 && this.renderSquare()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  square: {
    height: height * 0.1,
    width: width * 0.1,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'green'
  },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  title: { flex: 1, backgroundColor: '#808B97' }
});
