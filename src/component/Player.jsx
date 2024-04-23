import { useContext } from "react";
import { TrackContext } from "../context/TrackContext";

const Player = () => {
  const {track} = useContext(TrackContext);
  return (
    <section className="mt-[5px]  " >
      <iframe
        title="Spotify Embed: Recommendation Playlist "          
        src={`https://open.spotify.com/embed/track/${track}?utm_source=generator`}      
        className="w-full h-[80px]  rounded-xl  "
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"       
      ></iframe>
    </section>
  )
}

export default Player
