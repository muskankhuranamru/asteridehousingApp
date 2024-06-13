import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {GeolocationResponse} from '@react-native-community/geolocation';

interface AppState {
  userLocation: GeolocationResponse | null;
}

interface AppContextProps {
  state: AppState;
  setUserLocation: Dispatch<SetStateAction<AppState>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, setState] = useState<AppState>({
    userLocation: null,
  });

  return (
    <AppContext.Provider value={{state, setUserLocation: setState}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
