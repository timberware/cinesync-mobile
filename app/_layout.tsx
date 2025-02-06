import '../App';
import { Stack } from 'expo-router';
import { AuthProvider } from './auth/context/AuthContext';
import {
  SIGN_IN_SCREEN_PATH,
  SIGN_UP_SCREEN_PATH,
  TABS_PATH,
} from '../constants';

const Layout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={TABS_PATH} />
        <Stack.Screen name={SIGN_IN_SCREEN_PATH} />
        <Stack.Screen name={SIGN_UP_SCREEN_PATH} />
      </Stack>
    </AuthProvider>
  );
};

export default Layout;
