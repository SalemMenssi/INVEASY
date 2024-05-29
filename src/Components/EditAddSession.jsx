import React, {useEffect, useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet} from 'react-native';
import ButtonOutline from './ButtonOutline';
import DatePicker from 'react-native-date-picker';
import RadioButtonRN from 'radio-buttons-react-native';

const DatePickerCostum = props => {
  return (
    <DatePicker
      textColor="#000"
      mode="datetime"
      date={props.time}
      onDateChange={props.setTime}
      style={{backgroundColor: '#fff', borderRadius: 10, padding: 10}} // Add your custom styles here
    />
  );
};
const data = [
  {
    label: 'Availble',
  },
  {
    label: 'Disable',
  },
];
const EditAddSession = ({session, onClose, onSave, isEdit, onAdd}) => {
  // title, date, time, duration, status
  const [title, setTitle] = useState(session?.title || '');
  const [date, setDate] = useState(
    session?.date ? new Date(session.date) : new Date(),
  );

  const [duration, setDuration] = useState(session?.duration || '');
  const [status, setStatus] = useState();

  const handleSave = () => {
    isEdit
      ? onSave({...session, title, date, duration, status})
      : onAdd(title, date, duration, status);
    onClose();
  };

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

      {/* <TextInput
        placeholderTextColor={'#28209C'}
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={text => setDate(text)}
      /> */}
      <DatePickerCostum time={date} setTime={setDate} />
      {/* <TextInput
        placeholderTextColor={'#28209C'}
        style={styles.input}
        placeholder="Time"
        value={time}
        onChangeText={text => setTime(text)}
      /> */}
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
});
