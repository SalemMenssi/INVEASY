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
import SessionCard from '../Components/SessionCard';
import EditAddSession from '../Components/EditAddSession';

const Sessions = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Title 1',
      date: new Date(2024, 6, 12),
      duration: '2 hours',
      status: 'Available',
    },
    {
      id: 2,
      title: 'Title 2',
      date: new Date(2024, 6, 13),
      duration: '1.5 hours',
      status: 'Available',
    },
    {
      id: 3,
      title: 'Title 3',
      date: new Date(2024, 6, 14),
      duration: '3 hours',
      status: 'Unavailable',
    },
  ]);

  const handleEdit = session => {
    setSelectedSession(session);
    setisEdit(true);
    setModalVisible(true);
  };
  const handleAdd = (title, date, duration, status) => {
    setSessions([
      ...sessions,
      {title, date, duration, status, id: sessions.length + 1},
    ]);
  };
  const handleSave = updatedSession => {
    const updatedSessions = sessions.map(session =>
      session.id === updatedSession.id ? updatedSession : session,
    );
    setSessions(updatedSessions);
    setSelectedSession({
      title: '',
      date: new Date(),
      duration: '',
      status: '',
    });
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
            source={require('../Assets/Icons/clock.png')}
          />
        </TouchableOpacity>
        <Text style={styles.Header}>List Of Sessions</Text>
        <ScrollView style={styles.scrollContainer}>
          {sessions.map(e => (
            <SessionCard session={e} onEdit={handleEdit} key={e.id} />
          ))}
        </ScrollView>
      </View>
      <Modal
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        visible={isModalVisible}>
        <EditAddSession
          session={selectedSession}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          isEdit={isEdit}
          onAdd={handleAdd}
        />
      </Modal>
      {/* list of users userNames */}
    </View>
  );
};

export default Sessions;

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
