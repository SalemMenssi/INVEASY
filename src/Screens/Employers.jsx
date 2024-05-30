import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProfileHeader from '../Components/ProfileHeader';
import EmployerCard from '../Components/EmployerCard';
import EditAddEmployer from '../Components/EditAddEmployer';

const Employers = () => {
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [employers, setEmployers] = useState([
    {
      id: 1,
      name: 'Eya BouKadida',
      avatarColors: ['#3c2ceca6'],
      email: 'EyaBouKadida@gmail.com',
    },
    {
      id: 2,
      name: 'John Doe',
      avatarColors: ['#ff6347'],
      email: 'EyaBouKadida@gmail.com',
    },
    {
      id: 3,
      name: 'Jane Smith',
      avatarColors: ['#4682b4'],
      email: 'EyaBouKadida@gmail.com',
    },
    {
      id: 4,
      name: 'Michael Brown',
      avatarColors: ['#32cd32'],
      email: 'EyaBouKadida@gmail.com',
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      avatarColors: ['#ff69b4'],
      email: 'EyaBouKadida@gmail.com',
    },
  ]);

  const handleEdit = employer => {
    setSelectedEmployer(employer);
    setisEdit(true);
    setModalVisible(true);
  };
  const handleAdd = (name, email) => {
    setEmployers([...employers, {name, email, id: employers.length + 1}]);
  };
  const handleSave = updatedEmployer => {
    const updatedEmployers = employers.map(employer =>
      employer.id === updatedEmployer.id ? updatedEmployer : employer,
    );
    setEmployers(updatedEmployers);
    setSelectedEmployer({email: '', name: ''});
  };

  return (
    <View style={styles.container}>
      <ProfileHeader name={'Eya BouKadida'} />
      <View style={styles.CardsBox}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setisEdit(false);
          }}
          style={styles.addButton}>
          <Image
            style={styles.addIcon}
            resizeMode="contain"
            source={require('../Assets/Icons/addUser.png')}
          />
        </TouchableOpacity>
        <Text style={styles.Header}>List Of Employers</Text>
        <ScrollView style={styles.scrollContainer}>
          {employers.map(e => (
            <EmployerCard employer={e} onEdit={handleEdit} key={e.id} />
          ))}
        </ScrollView>
      </View>
      <Modal
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        visible={isModalVisible}>
        <EditAddEmployer
          employer={selectedEmployer}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          isEdit={isEdit}
          onAdd={handleAdd}
        />
      </Modal>
    </View>
  );
};

export default Employers;

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff'},
  CardsBox: {
    width: Width,
    paddingTop: Height * 0.1,
    backgroundColor: '#fff',
    height: Height * 0.6,
    borderRadius: 50,
    top: -Height * 0.12,
  },
  scrollContainer: {},
  addButton: {
    width: Width * 0.17,
    height: Width * 0.17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 100,
    right: 20,
    top: 20,
    // paddingHorizontal: Width * 0.05,
    backgroundColor: '#28209C',
  },
  addIcon: {width: '50%'},
  Header: {
    position: 'absolute',
    zIndex: 100,
    left: 50,
    top: Height * 0.04,
    fontSize: 22,
  },
});
