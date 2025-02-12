import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';

export type ListInfo = {
  id: string;
  name: string;
  isPrivate: boolean;
  creatorId: string;
};

export type ListContextType = {
  selectedList: ListInfo | null;
  setSelectedList: (list: ListInfo) => void;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

export const useListContext = () => {
  const value = useContext(ListContext);
  if (!value) {
    throw new Error('useListContext must be used within a <ListProvider />');
  }

  return value;
};

export const ListsProvider = ({ children }: PropsWithChildren) => {
  const [selectedList, setSelectedList] = useState<ListInfo | null>(null);

  return (
    <ListContext.Provider value={{ selectedList, setSelectedList }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListsProvider;
