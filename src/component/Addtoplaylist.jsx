import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hook/useAuthContext";

// eslint-disable-next-line react/prop-types
function Addtoplaylist({selectedTrack,selectedTrackId}) {
  const [playlists, setPlaylists] = useState(null);
  const { refreshToken } = useAuthContext();
  const [playlistId,setPlaylistsID] = useState("")
 
  

  const handlePlaylistClick = (playlistId) => {
    setPlaylistsID(playlistId);    
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const responseRefresh = await axios.post(
          "http://localhost:3001/refresh",
          {
            refreshToken,
          }
        );
        const accessToken = responseRefresh.data.accessToken;

        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
      }
    };

    fetchPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);
  

useEffect(() => {
  const addTrackToPlaylist = async () => {
    try {
      const responseRefresh = await axios.post(
        "http://localhost:3001/refresh",
        {
          refreshToken,
        }
      );
      const accessToken = responseRefresh.data.accessToken;

      const response = await axios.post(
        
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            uris: [`spotify:track:${selectedTrackId}`],
            position: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert(`Add ${selectedTrack} to playlist Successful`);
      
      setPlaylists(response.data);
       
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  };

  if (playlistId) {
    addTrackToPlaylist();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [playlistId, refreshToken]);
  



  return (
    <div className="w-[360px] h-[200PX] bg-[#121212] flex flex-col rounded-md mt-[10px] text-[#A7A7A7] p-4 ">
      <div className="text-xl flex flex-col justify-between item-center h-[30px]">
        <div>
          <span>add {selectedTrack} to playlist</span>
        </div>

        {playlists && playlists.items && (
          <div>
            {playlists.items.map((item) => (
              <div
                key={item.id}
                className=" cursor-pointer hover:bg-[#2A2A2A] "
                onClick={() => handlePlaylistClick(item.id)}
              >
                <h2>{item.name}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Addtoplaylist;
