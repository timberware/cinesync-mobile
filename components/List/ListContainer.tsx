import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ListType } from '../../ambient';
import { ListItem } from './ListItem';

type ListContainerProps = {
  lists: ListType[];
};

export const ListContainer: React.FC<ListContainerProps> = ({ lists }) => {
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
        {lists?.map((item) => (
          <ScrollView
            key={item.id}
            style={styles.item}
            contentContainerStyle={{
              justifyContent: 'center',
            }}
          >
            <ListItem
              id={item.id}
              title={item.name}
              movies={item.movies}
              sharees={item.sharees}
              imageUrl={item.posterUrl || ''}
            />
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
