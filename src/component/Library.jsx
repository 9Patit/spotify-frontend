import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import Playlist from "./Playlist";





const Library = () => {
    const { refreshToken } = useAuthContext();
    const [playlists, setPlaylists] = useState(null);
    const [addplaylist, setAddPlaylist] = useState(false);

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



      const refreshPlaylist = async () => {
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


  return (
    <div className="w-[360px] h-[300px] bg-[#121212] flex flex-col rounded-md mt-[10px] text-[#A7A7A7] p-4 ">
      <div className="text-xl flex justify-between item-center h-[30px]">
        <span>library</span>
        <button
          type="button"          
          className="flex justify-center item-center h-[30px] p-0 w-[30px]  ml-[100px] rounded-full"
          onClick={() => setAddPlaylist(true)}
        >
          +
        </button>

        <Playlist
        addplaylist={addplaylist}
        onClose={() => {
          setAddPlaylist(false);
          refreshPlaylist();
        }}
      />
      </div>
      {playlists && playlists.items && (
        <div className="pt-3 overflow-y-auto max-h-96">
          {playlists.items.map((item) => (
            <div
              key={item.id}
              className=" cursor-pointer hover:bg-[#2A2A2A] "
              onClick={() => {
                // setPlaylist(JSON.parse(JSON.stringify(item)));
                // handlePlaylist();
              }}
            >
              <div className=" flex justify-between">
                <div>
                  <h2>{item.name}</h2>
                  <h2>{item.owner.display_name}</h2>
                </div>
                <div>
                  <button
                    className="
                  mt-[10px] mr-[5px] 
                  flex justify-center 
                  item-center h-[30px] 
                  p-0 w-[30px]  ml-[100px]
                  rounded-full bg-[#121212]"
                //   onClick={() => deletePlaylist(item.id)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
