import { ScrollView } from 'react-native';
import { List } from '../../components/List/List';

const Tab = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <List />
    </ScrollView>
  );
};

export default Tab;
