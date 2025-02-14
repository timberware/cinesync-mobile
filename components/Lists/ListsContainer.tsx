import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ListType } from '../../types';
import { ListsItem } from './ListsItem';

type ListContainerProps = {
  lists: ListType[];
};

export const ListsContainer: React.FC<ListContainerProps> = ({ lists }) => {
  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {lists?.map((list) => (
          <ScrollView
            key={list.id}
            style={styles.item}
            contentContainerStyle={{
              justifyContent: 'center',
            }}
          >
            <ListsItem list={list} />
          </ScrollView>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingTop: 25,
  },
});
