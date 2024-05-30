import React, {useEffect, useState} from 'react';
import {TextInput, View, Text, StyleSheet, ScrollView} from 'react-native';
import ButtonOutline from './ButtonOutline';
import DatePicker from 'react-native-date-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from 'react-native-check-box';

const DatePickerCustom = props => {
  return (
    <DatePicker
      textColor="#000"
      mode="datetime"
      date={props.time}
      onDateChange={props.setTime}
      style={{backgroundColor: '#fff', borderRadius: 10, padding: 10}}
    />
  );
};

const data = [
  {
    label: 'Available',
  },
  {
    label: 'Disable',
  },
];

const Users = [
  {username: 'user1'},
  {username: 'user2'},
  {username: 'user3'},
  {username: 'user4'},
  {username: 'user5'},
  {username: 'user6'},
  {username: 'user7'},
  {username: 'user8'},
];

const EditAddSession = ({session, onClose, onSave, isEdit, onAdd}) => {
  const [title, setTitle] = useState(session?.title || '');
  const [date, setDate] = useState(
    session?.date ? new Date(session.date) : new Date(),
  );
  const [duration, setDuration] = useState(session?.duration || '');
  const [status, setStatus] = useState(session?.status || '');
  const [selectedUsers, setSelectedUsers] = useState(
    session?.selectedUsers || [],
  );

  const handleSave = () => {
    const newSession = {
      ...session,
      title,
      date,
      duration,
      status,
      selectedUsers,
    };
    if (isEdit) {
      onSave(newSession);
    } else {
      onAdd(newSession);
    }
    onClose();
  };

  const toggleUserSelection = username => {
    setSelectedUsers(prevSelectedUsers =>
      prevSelectedUsers.includes(username)
        ? prevSelectedUsers.filter(user => user !== username)
        : [...prevSelectedUsers, username],
    );
  };
  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>
        {isEdit ? 'Edit Session' : 'Add Session'}
      </Text>
      <TextInput
        placeholderTextColor={'#28209C'}
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <DatePickerCustom time={date} setTime={setDate} />
      <TextInput
        placeholderTextColor={'#28209C'}
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={text => setDuration(text)}
      />
      <RadioButtonRN
        style={{width: '100%'}}
        data={data}
        selectedBtn={e => setStatus(e.label)}
        initial={status === 'Available' ? 1 : status === 'Disable' ? 2 : 0}
      />
      <ScrollView style={styles.scrollView}>
        {Users.map(user => (
          <CheckBox
            key={user.username}
            style={styles.checkbox}
            onClick={() => toggleUserSelection(user.username)}
            isChecked={selectedUsers.includes(user.username)}
            leftText={user.username}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonOutline
          text="Cancel"
          fontSize={16}
          width={'40%'}
          action={() => onClose()}
        />
        <ButtonOutline
          text="Save"
          fontSize={16}
          width={'40%'}
          action={handleSave}
        />
      </View>
    </View>
  );
};

export default EditAddSession;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#28209C',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  scrollView: {
    width: '100%',
    maxHeight: 150,
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
