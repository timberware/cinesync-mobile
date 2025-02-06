import React from 'react';
import { View, Text } from 'react-native';

type ListTitleProps = {
  title: string;
};

export const ListTitle = ({ title }: ListTitleProps) => {
  return (
    <View className="w-full bg-background rounded-xl py-2 px-3">
      <Text className="text-center text-text truncate">{title}</Text>
    </View>
  );
};
