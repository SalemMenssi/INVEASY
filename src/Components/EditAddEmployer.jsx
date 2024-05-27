import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet} from 'react-native';
import ButtonOutline from './ButtonOutline';

const EditAddEmployer = ({employer, onClose, onSave, isEdit, onAdd}) => {
  const [name, setName] = useState(employer?.name || '');
  const [email, setEmail] = useState(employer?.email || '');

  const handleSave = () => {
    isEdit ? onSave({...employer, name, email}) : onAdd(name, email);
    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>
        {isEdit ? 'Edit Employer' : 'Add Employer'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={text => setEmail(text)}
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

export default EditAddEmployer;

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
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
