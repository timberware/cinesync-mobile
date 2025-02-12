import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ListsContainer } from './ListsContainer';
import { useUserLists } from '../../hooks/useUserLists';

export const Lists = () => {
  const [showModal, setShowModal] = useState(false);
  const { lists, sharedLists, loading, error } = useUserLists();

  return (
    <View>
      <View className="flex-row justify-between items-center bg-secondary px-4 py-3">
        <Text className="text-2xl font-bold text-text">Your Lists</Text>
        <Pressable onPress={() => setShowModal(true)}>
          <AntDesign name="pluscircle" size={24} color="#f7f7f7" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <ListsContainer lists={lists} />
      </ScrollView>

      {sharedLists?.length ? (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <ListsContainer lists={sharedLists} />
        </ScrollView>
      ) : null}
    </View>
  );
};
