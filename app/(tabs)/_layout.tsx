import { Tabs, Redirect } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import { useAuthContext } from '../auth/context/AuthContext';
import { SIGN_IN_SCREEN_PATH } from '../../constants';

const TabLayout = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Redirect href={SIGN_IN_SCREEN_PATH} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f7f7f7',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lists',
          tabBarStyle: { backgroundColor: '#1f1f1f' },
          tabBarIcon: ({ color }) => (
            <Foundation name="list" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarStyle: { backgroundColor: '#1f1f1f' },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
