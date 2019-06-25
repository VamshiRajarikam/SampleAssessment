import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Modal
} from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
export default class PictureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesArr: [],
      refreshing: false,
      modalVisible: false,
      selectedImage: ''
    };
  }

  componentDidMount() {
    this.renderImages();
  }
  imageSelected = url => {
    this.setState({ modalVisible: true, selectedImage: url });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  renderImages = async () => {
    try {
      this.setState({ refreshing: true });
      let response = await axios.get(
        'https://pixabay.com/api/?key=8831308-43b25262292e472328c29755f&q=yellow+flowers&image_type=photo&pretty=true'
      );
      const data = response.data;
      let imagesArrAll = [];
      let imagesArr = [];
      data.hits.map((item, index) => {
        if (item.webformatURL) {
          imagesArrAll.push(item.webformatURL);
        }
      });
      let x = 0;
      while (x < imagesArrAll.length) {
        let tempImages = [];
        tempImages.push(imagesArrAll[x]);
        tempImages.push(imagesArrAll[x + 1]);
        tempImages.push(imagesArrAll[x + 2]);
        imagesArr.push(tempImages);
        x = x + 3;
      }
      this.setState({
        imagesArr: [...this.state.imagesArr, ...imagesArr],
        refreshing: false
      });
    } catch (e) {
      console.error(e);
    }
  };
  render() {
    let { imagesArr, refreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.renderImages}
          />
        }
      >
        {imagesArr.length > 0 &&
          imagesArr.map((item, index) => {
            return (
              <Card key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TouchableOpacity onPress={() => this.imageSelected(item[0])}>
                    <Image
                      source={{ uri: item[0] }}
                      style={{ width: 200, height: 200 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View
                    style={{ flexDirection: 'column', paddingHorizontal: 10 }}
                  >
                    <TouchableOpacity
                      onPress={() => this.imageSelected(item[1])}
                    >
                      <Image
                        source={{ uri: item[1] }}
                        style={{
                          width: 100,
                          height: 100
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.imageSelected(item[2])}
                    >
                      <Image
                        source={{ uri: item[2] }}
                        style={{
                          width: 100,
                          height: 100
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  style={{ flex: 0.5 }}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#3498DB',
                        borderColor: '#2E86C1',
                        borderWidth: 2,
                        borderRadius: 10
                      }}
                    >
                      {this.state.selectedImage != '' && (
                        <Image
                          source={{ uri: this.state.selectedImage }}
                          style={{ width: 400, height: 500, borderRadius: 10 }}
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                      >
                        <View style={{ justifyContent: 'center' }}>
                          <Text style={{ textAlign: 'center', fontSize: 16 }}>
                            Close Image
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </Card>
            );
          })}
      </ScrollView>
    );
  }
}
PictureScreen.navigationOptions = {
  title: 'Pictures'
};
