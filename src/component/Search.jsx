import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import axios from "axios";
import { TrackContext } from "../context/TrackContext";
import Addtoplaylist from "./Addtoplaylist";

const Search = () => {
  const { refreshToken } = useAuthContext();
  // console.log('refreshToken--------------------------------------มานะ',refreshToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log("ข้อมูลsearchResults", searchResults);
  const { setTrack } = useContext(TrackContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const minutes = (milliseconds) => {
    // แปลง milliseconds เป็นนาทีและวินาที
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const responseRefresh = await axios.post(
          "https://spotify-server-1.onrender.com/refresh",
          {
            refreshToken,
          }
        );
        // console.log(refreshToken);
        const accessToken = responseRefresh.data.accessToken;
        // console.log(accessToken);

        const response = await axios.get(`https://api.spotify.com/v1/search`, {
          params: {
            q: searchTerm,
            type: "track",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSearchResults(response.data.tracks.items.slice(0, 7));
        console.log("เพลง", searchResults); 
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
      }
    };

    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" m-[10px] overflow-hidden">
      <input
        type="text"
        placeholder="What do you want to play?"
        className="bg-[#2A2A2A] pl-[5px] rounded-full w-1/3 h-11 text-slate-300 "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className=" w-full mt-[15px] text-[#A7A7A7]  ">
        <thead className="bg-[#1A1A1A] w-100% ">
          <tr>
            <th className="text-left w-[35px]">#</th>
            <th className="text-left">Title</th>
            <th className="text-left">Album</th>
            <th>
              <i className="bi bi-clock "></i>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((track, index) => (
            <tr
              key={index}
              className=" cursor-pointer hover:bg-[#2A2A2A]"
              onClick={() => {
                setTrack(track.id);
              }}
            >
              <td>{index + 1}</td>
              <td>
                <div className="flex">
                  <div className=" w-[40px] mt-[5px]">
                    <img
                      className="rounded-md"
                      src={track.album.images[0].url}
                      alt={track.album.name}
                    />
                  </div>
                  <div className="ml-[10px]">
                    <div>{track.name}</div>
                    {track.artists.map((artist, index) => (
                      <span key={index}>{artist.name}</span>
                    ))}
                  </div>
                </div>
              </td>
              <td>{track.album.name}</td>
              <td>{minutes(track.duration_ms)}</td>{" "}
              <td>
                <button
                  className=" flex justify-center item-center h-[30px] p-0 w-[30px]  ml-[100px] rounded-full bg-[#121212]"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedTrack(track.name);
                    setSelectedTrackId(track.id);
                  }}
                >
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <Addtoplaylist
            selectedTrack={selectedTrack}
            selectedTrackId={selectedTrackId}
            onClose={() => {
              closeModal();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
