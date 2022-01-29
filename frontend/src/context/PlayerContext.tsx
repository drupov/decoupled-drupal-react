import {createContext} from 'react';

export default createContext<any>({
  activePlayerId: 0,
  setActivePlayerId: () => {}
});
