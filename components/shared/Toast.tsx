import React from 'react';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.success}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={styles.text1style}
      text2Style={styles.text2style}
    />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styles.error}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={styles.text1style}
      text2Style={styles.text2style}
    />
  ),
};

const styles = StyleSheet.create({
  success: {
    borderLeftColor: '#2b6963',
    backgroundColor: '#0f0f0f',
  },
  text1style: {
    fontSize: 16,
    fontWeight: '400',
    color: '#f7f7f7',
  },
  text2style: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#f7f7f7',
  },
  error: {
    borderLeftColor: '#9e3641',
    backgroundColor: '#0f0f0f',
  },
});
