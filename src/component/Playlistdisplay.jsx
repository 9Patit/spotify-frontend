import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { useAuthContext } from "../hook/useAuthContext";
import axios from "axios";
import { TrackContext } from "../context/TrackContext";

const Playlistdisplay = () => {
  const { playlist } = useContext(PlaylistContext);
  const playlistId = playlist ? playlist.id : console.log("ไม่ได้รับPlaylist");
  const { refreshToken } = useAuthContext();
  const [accessToken, setAccessToken] = useState(null);
  const [tracks, setTracks] = useState(null);
  const { setTrack } = useContext(TrackContext);
  const [searchTerm, setSearchTerm] = useState("");
  const minutes = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const responseRefresh = await axios.post(
          "http://localhost:3001/refresh",
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

    if (!accessToken) {
      fetchAccessToken();
    }
  }, [refreshToken, accessToken]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        if (accessToken && playlistId) {
          const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setTracks(response.data.items);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการรับเพลง:", error);
      }
    };
    fetchTracks();
  }, [accessToken, playlistId]);

  const deleteTrack = async (trackId) => {
    try {
      await axios.delete(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            tracks: [{ uri: `spotify:track:${trackId}` }],
          },
        }
      );

      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTracks(response.data.items);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบเพลง:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row m-[10px]">
        <div>
          <input
            type="text"
            placeholder="Search for songs in the playlist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#2A2A2A] pl-[5px] rounded-full w-[300px] h-11 text-slate-300 "
          />
        </div>

        <div className="flex flex-grow justify-end">
          {playlist ? (
            <h2 className="text-[#A7A7A7] ml-[20px] mr-[80px] mt-2">{playlist.name}</h2>
          ) : (
            <h2>.....</h2>
          )}
        </div>
      </div>

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

        {tracks &&
          tracks.map(
            (trackData, index) =>
              (!searchTerm ||
                trackData.track.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) && (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-[#2A2A2A]"
                  onClick={() => {
                    setTrack(trackData.track.id);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex">
                      <div className="w-[40px] mt-[5px]">
                        <img
                          className="rounded-md"
                          src={trackData.track.album.images[0].url}
                          alt={trackData.track.album.name}
                        />
                      </div>
                      <div className="ml-[10px]">
                        <div>{trackData.track.name}</div>
                        {trackData.track.artists.map((artist, index) => (
                          <span key={index}>{artist.name}</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td>{trackData.track.album.name}</td>
                  <td>{minutes(trackData.track.duration_ms)}</td>
                  <td>
                    <button
                      className="
              flex justify-center item-center 
              h-[30px] p-0 w-[30px]  ml-[100px] 
              rounded-full bg-[#121212]"
                      onClick={() => deleteTrack(trackData.track.id)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              )
          )}
      </table>
    </div>
  );
};

export default Playlistdisplay;
