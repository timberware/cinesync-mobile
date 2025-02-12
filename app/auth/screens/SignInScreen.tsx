import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useAuthContext } from '../context/AuthContext';
import { directors, TABS_PATH } from '../../../constants';

const SignInScreen = () => {
  const { signIn, user, isLoading } = useAuthContext();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  if (user) {
    return <Redirect href={TABS_PATH} />;
  }

  const handleSignIn = async () => {
    if (email && password) {
      try {
        setError(undefined);
        await signIn(email, password);
      } catch (error) {
        setError('failed to sign in');
        console.error(error);
      }
    } else {
      setError('please provide both email and password');
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="container mx-auto">
        <Text className="text-7xl text-center mt-20 text-text">cinesync</Text>
      </View>

      <View className="max-w-md mx-auto mt-5">
        <View className="flex-row justify-center py-2">
          <Text className="w-24 text-center text-text mt-3">email</Text>
          <TextInput
            className="pl-1 w-60 bg-secondary text-text rounded"
            placeholder={directors()}
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="flex-row justify-center py-2">
          <Text className="w-24 text-center text-text mt-3">password</Text>
          <TextInput
            className="pl-1 w-60 bg-secondary text-text rounded"
            placeholder="password"
            placeholderTextColor="#999999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {error ? (
        <Text className="text-error text-center mt-2">{error}</Text>
      ) : null}

      <View className="flex-row max-w-xs mx-auto pt-5 justify-around">
        <Pressable
          className="bg-secondary px-4 py-2 rounded"
          onPress={handleSignIn}
        >
          <Text className="text-text">login</Text>
        </Pressable>
      </View>

      <View className="max-w-xs mx-auto pt-5">
        <Text className="text-text text-center">Don't have an account?</Text>
        <Link href="./SignUpScreen" asChild>
          <Pressable>
            <Text className="text-primary text-center">Sign up now!</Text>
          </Pressable>
        </Link>
      </View>

      {isLoading && (
        <Text className="text-text text-center mt-2">Loading...</Text>
      )}
    </ScrollView>
  );
};

export default SignInScreen;
