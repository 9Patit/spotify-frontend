

const Player = () => {
    const track = "234"
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
