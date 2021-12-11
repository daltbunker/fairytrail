import React, {Component} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Text,
} from 'react-native';

const images = [
  require('../assets/images/profile-1.jpg'),
  require('../assets/images/profile-2.jpg'),
  require('../assets/images/profile-3.jpg'),
];

class PictureList extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
    };
  }

  onSlideSwiped = ({nativeEvent}) => {
    const newCurrent = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    this.setState(prevState => {
      if (prevState !== newCurrent) {
        return {current: newCurrent};
      }
    });
  };

  render() {
    const imgArray = images.map((image, i) => {
      return <Image key={i} source={image} style={styles.image} />;
    });

    const indicatorArray = images.map((image, i) => (
      <Text
        key={i}
        style={{
          color: i === this.state.current ? '#ffffff' : '#ffffff66',
          margin: 4,
        }}>
        &#11044;
      </Text>
    ));
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={this.onSlideSwiped}
          showsHorizontalScrollIndicator={false}>
          {imgArray}
        </ScrollView>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Paid</Text>
        </View>
        <View style={styles.scrollIndicator}>{indicatorArray}</View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
const imgWidth = width - 40; // 40 repesents padding on screen view
const imgHeight = height * 0.4;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  image: {
    height: imgHeight,
    width: imgWidth,
    resizeMode: 'cover',
  },
  tag: {
    position: 'absolute',
    backgroundColor: '#E53B90',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    overflow: 'hidden',
    borderBottomRightRadius: 20,
  },
  tagText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollIndicator: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  circle: {
    borderRadius: 60 / 2,
    borderColor: 'white',
    borderWidth: 3,
  },
});

export default PictureList;
