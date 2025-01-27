import './global.css';
import { View } from 'react-native';

const App = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

export default App;
