import  { createContext, useState } from "react";

const PlaylistContext = createContext(null);

// eslint-disable-next-line react/prop-types
const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(null)
    
  return (
    <PlaylistContext.Provider value={{ playlist, setPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export {PlaylistProvider, PlaylistContext};
