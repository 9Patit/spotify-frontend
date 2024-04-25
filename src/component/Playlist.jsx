import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hook/useAuthContext";

// eslint-disable-next-line react/prop-types
const Playlist = ({ onClose }) => {
  const { refreshToken } = useAuthContext();
  const [playlistName, setPlaylistName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const userId = "314iwgzfj4vw7h7ewcbdk4uvwuoy";
 
 

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const responseRefresh = await axios.post(
          "https://spotify-server-1.onrender.com/refresh",
          {
            refreshToken,
          }
        );
        const accessToken = responseRefresh.data.accessToken;
        setAccessToken(accessToken);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการรับโทเค็น:", error);
      }
    };

    fetchAccessToken();
  }, [refreshToken]);

  const handleInputChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      if (!playlistName) {
        console.error("กรุณากรอกชื่อ playlist");
        alert("กรุณากรอกชื่อ playlist");
        return;
      }

      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: playlistName,
          description: "New playlist description",
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("สร้าง playlist สำเร็จ:", response.data);

      onClose(); // ปิดกล่อง
    } catch (error) {
      console.error("Create failed!!:", error);
      alert("สร้าง playlist ไม่สำเร็จ!!!");
      onClose();
    }
  };

  return (
    <div>
      <h2>Create Playlist</h2>
      <br />
      <div className=" flex ">
        <input
          type="text"
          placeholder="Playlist Name?"
          value={playlistName}
          onChange={handleInputChange}
          className="h-full bg-[#2A2A2A] w-[60%] rounded-lg"
        />
        <button
          onClick={handleConfirm}
          className="h-[30px] bg-[#2A2A2A] flex items-center ml-[10px]"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
};

export default Playlist;
