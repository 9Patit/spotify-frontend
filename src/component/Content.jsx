import Mainpage from "./Mainpage"
import Playlistdisplay from "./Playlistdisplay"
import Search from "./Search"


// eslint-disable-next-line react/prop-types
const Content = ({status}) => {
  return (
    <div className="w-full h-full bg-[#121212] flex flex-col  rounded-md ">
       {status === "Main" ? <Mainpage /> : status === "Search" ? <Search /> : <Playlistdisplay/>}
    </div>
  )
}

export default Content
