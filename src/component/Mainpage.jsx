

const Mainpage = () => {
  return (
    <div className="flex items-center justify-center h-full text-zinc-400">      
      <main className="p-[1rem] flex flex-col gap-y-[1rem]">
        <h1 className="text-[2rem]">Welcome to spotify clone</h1>
        <div>How to play this project </div>
        <ul className="ml-[2rem]">
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]">Home</span>{" "}
            <span>- description what you can do</span>
          </li>
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]">Search</span>{" "}
            <span>- search song from spotify</span>
          </li>
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]"></span> <span>- play a song</span>
          </li>
          
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]"></span>{" "}
            <span>- save song to playlist you want</span>
          </li>
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]">Your Library</span>{" "}
            <span>- show your playlists</span>            
          </li>
          
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]"></span>{" "}
            <span>- create a new playlist &amp; delete playlist</span>
          </li>
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]">Playlist </span>{" "}
            <span>- play a song</span>
          </li>
          <li className="flex py-[0.1rem]">
            <span className="w-[100px]"></span>{" "}
            <span>- remove song from playlist</span>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default Mainpage
