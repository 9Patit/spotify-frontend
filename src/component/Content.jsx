import Mainpage from "./Mainpage"
import Search from "./Search"




// eslint-disable-next-line react/prop-types
const Content = ({status}) => {
  return (
    <div className="w-[890px] h-[422px] bg-[#121212] flex flex-col  rounded-md ml-[10px]">
       {status === "Main" ? <Mainpage /> : status === "Search" ? <Search /> : <p>playlistdisplay</p>}
    </div>
  )
}

export default Content
