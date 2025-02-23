import '../App';
import '../global.css';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { SWRConfig } from 'swr';
import { AuthProvider } from './auth/context/AuthContext';
import { ListsProvider } from './list/context/ListContext';
import { toastConfig } from '../components/shared/Toast';
import {
  SIGN_IN_SCREEN_PATH,
  SIGN_UP_SCREEN_PATH,
  TABS_PATH,
} from '../constants';

const Layout = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }}
    >
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
      <Toast config={toastConfig} />
    </SWRConfig>
  );
};

export default Layout;
