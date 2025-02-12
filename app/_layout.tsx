import '../App';
import '../global.css';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './auth/context/AuthContext';
import { ListsProvider } from './list/context/ListContext';
import {
  SIGN_IN_SCREEN_PATH,
  SIGN_UP_SCREEN_PATH,
  TABS_PATH,
} from '../constants';

const Layout = () => {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <ListsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={TABS_PATH} />
            <Stack.Screen name={SIGN_IN_SCREEN_PATH} />
            <Stack.Screen name={SIGN_UP_SCREEN_PATH} />
          </Stack>
        </ListsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
