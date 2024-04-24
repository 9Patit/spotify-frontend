import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import Playlist from "./Playlist";
import { PlaylistContext } from "../context/PlaylistContext";

// eslint-disable-next-line react/prop-types
const Library = ({ handlePlaylist }) => {
  const { refreshToken } = useAuthContext();
  const [playlists, setPlaylists] = useState(null);
  console.log("ข้อมูลในPlaylist:",playlists);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const { setPlaylist } = useContext(PlaylistContext);
 

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

  // const deletePlaylist = async (playlistId) => {
  //   try {
  //     const responseRefresh = await axios.post(
  //       "http://localhost:3001/refresh",
  //       {
  //         refreshToken,
  //       }
  //     );
  //     const accessToken = responseRefresh.data.accessToken;

  //     await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     refreshPlaylist();
  //   } catch (error) {
  //     console.error("Error deleting playlist:", error);
  //   }
  //   console.log("ลบไม่ได้ Status405 เลยยังลบplaylistId:",playlistId,"นี้ไม่ได้");
  // };
  const deletePlaylist = (playlistId) => {
    // console.log("จะลบPlaylistที่มีID:", playlistId);
    const foundPlaylist = playlists.items.find(
      (item) => item.id === playlistId
    );
    if (foundPlaylist) {
      // สร้างรายการใหม่โดยไม่รวม playlist ที่ต้องการลบ
      const updatedPlaylists = playlists.items.filter(
        (item) => item.id !== playlistId
      );
      // อัพเดท state ของ playlists
      setPlaylists((prevPlaylists) => ({
        ...prevPlaylists,
        items: updatedPlaylists,
      }));
    } else {
      console.log("ไม่พบ Playlist ที่มี ID:", playlistId);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-[360px] h-[297px] bg-[#121212] flex flex-col rounded-md mt-[10px] text-[#A7A7A7] p-4 ">
      <div className="text-xl flex justify-between item-center h-[30px]">
        <span>library</span>
        <button
          type="button"
          className="flex justify-center item-center h-[30px] p-0 w-[30px]  ml-[230px] rounded-full"
          onClick={openModal}
        >
          +
        </button>

        {isModalOpen && (
          <div className="modal">            
            <Playlist              
              onClose={() => {
                closeModal();                
                refreshPlaylist();
              }}
            />
          </div>
        )}
      </div>
      {playlists && playlists.items && (
        <div className="pt-3 overflow-y-auto max-h-96">
          {playlists.items.map((item) => (
            <div
              key={item.id}
              className=" cursor-pointer hover:bg-[#2A2A2A] "
              onClick={() => {
                setPlaylist(JSON.parse(JSON.stringify(item)));
                handlePlaylist();
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
                    onClick={() => deletePlaylist(item.id)}
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
