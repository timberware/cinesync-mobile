import { ScrollView } from 'react-native';
import { Lists } from '../../components/Lists/Lists';

const Tab = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Lists />
    </ScrollView>
  );
};

export default Tab;
