import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export const BackHeader: React.FC<{ title?: string }> = ({
  title = 'Go Back',
}) => {
  const router = useRouter();

  return (
    <View className="bg-secondary px-4 py-3 flex-row items-center">
      <Pressable onPress={() => router.back()} className="mr-4">
        <AntDesign name="arrowleft" size={24} color="#999999" />
      </Pressable>
      <Text className="text-2xl font-bold text-text">{title}</Text>
    </View>
  );
};
