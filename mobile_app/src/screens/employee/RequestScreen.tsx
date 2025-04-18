import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface, SegmentedButtons, Portal, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

type RequestType = 'second_entry' | 'out_pass';

interface RequestFormValues {
  type: RequestType;
  reason: string;
  date: Date;
  time: Date;
  duration?: string; // For out pass only
}

const validationSchema = Yup.object().shape({
  reason: Yup.string().required('Reason is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.date().required('Time is required'),
  duration: Yup.string().when('type', {
    is: 'out_pass',
    then: () => Yup.string().required('Duration is required'),
  }),
});

export const RequestScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleSubmit = async (values: RequestFormValues) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/requests', values);
      setSuccessModal(true);
    } catch (error) {
      console.error('Failed to submit request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineSmall" style={styles.title}>
          Submit Request
        </Text>

        <Formik
          initialValues={{
            type: 'second_entry' as RequestType,
            reason: '',
            date: new Date(),
            time: new Date(),
            duration: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
            <View style={styles.form}>
              <SegmentedButtons
                value={values.type}
                onValueChange={value => setFieldValue('type', value)}
                buttons={[
                  { value: 'second_entry', label: 'Second Entry' },
                  { value: 'out_pass', label: 'Out Pass' },
                ]}
              />

              <TextInput
                mode="outlined"
                label="Reason"
                value={values.reason}
                onChangeText={handleChange('reason')}
                multiline
                numberOfLines={3}
                style={styles.input}
              />
              {touched.reason && errors.reason && (
                <Text style={styles.errorText}>{errors.reason}</Text>
              )}

              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
              >
                {values.date.toLocaleDateString()}
              </Button>

              <Button
                mode="outlined"
                onPress={() => setShowTimePicker(true)}
                style={styles.input}
              >
                {values.time.toLocaleTimeString()}
              </Button>

              {values.type === 'out_pass' && (
                <TextInput
                  mode="outlined"
                  label="Duration (hours)"
                  value={values.duration}
                  onChangeText={handleChange('duration')}
                  keyboardType="numeric"
                  style={styles.input}
                />
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                style={styles.button}
              >
                Submit Request
              </Button>
            </View>
          )}
        </Formik>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setFieldValue('date', date);
              }
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            onChange={(event, time) => {
              setShowTimePicker(false);
              if (time) {
                setFieldValue('time', time);
              }
            }}
          />
        )}

        <Portal>
          <Modal
            visible={successModal}
            onDismiss={() => setSuccessModal(false)}
            contentContainerStyle={styles.modal}
          >
            <Text variant="headlineSmall" style={styles.modalTitle}>
              Request Submitted
            </Text>
            <Text style={styles.modalText}>
              Your request has been submitted successfully. You will be notified once it's approved.
            </Text>
            <Button
              mode="contained"
              onPress={() => setSuccessModal(false)}
              style={styles.modalButton}
            >
              OK
            </Button>
          </Modal>
        </Portal>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    marginTop: 8,
  },
}); 