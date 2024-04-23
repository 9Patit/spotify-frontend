import Library from "./Library";


// eslint-disable-next-line react/prop-types
const Navbar = ({ setStatus }) => {
  const handleMain = () => {
    setStatus("Main");
  };

  const handleSearch = () => {
    setStatus("Search");
  };

  const handlePlaylist = () => {
    setStatus("Playlist");
  };

  return (
    <div>
      <div className="w-[360px] h-[112px] bg-[#121212] flex flex-col rounded-md ">      
        <ul className="text-[#A7A7A7]  flex flex-col  justify-center h-full ">
          <div className="flex flex-col">
            <button type="button" className="text-left" onClick={handleMain}>
              <i className="bi bi-house pr-[15px] text-[20px]"></i>Home
            </button>
          </div>
          <div className="flex flex-col">
            <button  type="button" className="text-left" onClick={handleSearch}>
              <i className="bi bi-search pr-[15px] text-[20px]"></i> Search
            </button>
          </div>
        </ul>
      </div>
      <div>
        <Library handlePlaylist={handlePlaylist}/>
      </div>
    </div>
  );
};

export default Navbar;
