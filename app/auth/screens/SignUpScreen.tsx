import { useState } from 'react';
import { Text, TextInput, Pressable, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { directors } from '../../../constants';

const SignUpScreen = () => {
  const { signUp, isLoading } = useAuth();
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSignUp = async () => {
    if (email && username && password) {
      try {
        setError(undefined);
        await signUp(email, username, password);
      } catch (error) {
        setError('failed to sign up.');
        console.error(error);
      }
    } else {
      setError('please provide email, username, and password');
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
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row justify-center py-2">
          <Text className="w-24 text-center text-text mt-3">username</Text>
          <TextInput
            className="pl-1 w-60 bg-secondary text-text rounded"
            placeholder="cinephile"
            placeholderTextColor="#999999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row justify-center py-2">
          <Text className="w-24 text-center text-text mt-3">password</Text>
          <TextInput
            className="pl-1 w-60 bg-secondary text-text rounded"
            placeholder="password"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      {error ? (
        <Text className="text-error text-center mt-2">{error}</Text>
      ) : null}

      <View className="flex-row max-w-xs mx-auto pt-5 justify-around">
        <Pressable
          className="bg-secondary px-4 py-2 rounded"
          onPress={handleSignUp}
        >
          <Text className="text-text">Sign Up</Text>
        </Pressable>
      </View>

      <View className="max-w-xs mx-auto pt-5">
        <Text className="text-text text-center">Already have an account?</Text>
        <Link href="./SignInScreen" asChild>
          <Pressable>
            <Text className="text-primary text-center">Log in now!</Text>
          </Pressable>
        </Link>
      </View>

      {isLoading && (
        <Text className="text-text text-center mt-2">Loading...</Text>
      )}
    </ScrollView>
  );
};

export default SignUpScreen;
