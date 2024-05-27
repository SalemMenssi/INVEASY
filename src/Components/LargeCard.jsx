import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const LargeCard = ({card, action}) => {
  return (
    <TouchableOpacity onPress={action} style={styles.container}>
      <Image
        style={styles.img}
        source={require('../Assets/Images/Market.jpg')}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{card.title}</Text>
        <View style={styles.DateContainer}>
          <Text style={styles.info}>{card.date}</Text>
          <Text style={styles.info}>{card.time}</Text>
        </View>
        <Text style={styles.info}>duration : {card.duration}</Text>
      </View>
      <Text
        style={[
          styles.status,
          {color: card.status === 'Available' ? '#2B9406' : '#EE4E4E'},
        ]}>
        {card.status}
      </Text>
    </TouchableOpacity>
  );
};

export default LargeCard;

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    width: Width * 0.9,
    height: Height * 0.2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
    borderBottomWidth: 5,
    borderColor: '#3c2ceca6',
    marginVertical: 10,
  },
  img: {
    width: Width * 0.45,
    height: '100%',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  cardContent: {
    paddingVertical: 10,
  },
  title: {color: '#242424', fontSize: 26},
  DateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    marginVertical: 10,
  },
  info: {},
  status: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
