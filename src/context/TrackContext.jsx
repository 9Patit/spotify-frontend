import  { createContext, useState } from "react";

export const TrackContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const TrackProvider = ({ children }) => {
  const [track, setTrack] = useState(null)
 
    
  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  );
}
