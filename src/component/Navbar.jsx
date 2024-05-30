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
    <div className="h-full bg-[#000000] ">
      
        <ul className="text-[#A7A7A7]  flex flex-col  bg-[#121212]  rounded-lg h-[20%] ">
          <div className="flex flex-col  h-[49%]">
            <button
              type="button"
              className="text-left h-full"
              onClick={handleMain}
            >
              <i className="bi bi-house pr-[15px] text-[20px]"></i>Home
            </button>
          </div>
          <div className="flex flex-col h-[49%]">
            <button
              type="button"
              className="text-left h-full"
              onClick={handleSearch}
            >
              <i className="bi bi-search pr-[15px] text-[20px]"></i> Search
            </button>
          </div>
        </ul>
      
      <div className="h-[79%] bg-[#121212] mt-[5px] rounded-lg">
        <Library handlePlaylist={handlePlaylist} />
      </div>
    </div>
  );
};

export default Navbar;
