import '../App';
import { Stack } from 'expo-router';
import { AuthProvider } from './auth/context/AuthContext';
import { SIGN_IN_SCREEN_PATH } from '../constants/urls';
import { SIGN_UP_SCREEN_PATH } from '../constants/urls';
import { TABS_PATH } from '../constants/urls';

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
