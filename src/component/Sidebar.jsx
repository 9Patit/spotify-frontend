import Navbar from "./Navbar"

Navbar
// eslint-disable-next-line react/prop-types
const Sidebar = ({setStatus}) => {
  return (
    <div className="w-[360px] h-[470px] bg-[#000000] flex flex-col rounded-md ml-[5px]">
      <Navbar setStatus={setStatus} />     
    </div>
  )
}

export default Sidebar
