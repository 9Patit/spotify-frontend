import useAuth from "../hook/useAuth";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { useState } from "react";


// eslint-disable-next-line react/prop-types
const Dashboard = ({ code }) => {
  // eslint-disable-next-line no-unused-vars
  const accessToken = useAuth(code);
  // console.log(accessToken);
  const [status, setStatus] = useState("Main");

  return (
    <div className="bg-[#000000] h-screen w-screen m-0 p-0 flex flex-col ">
      <div className="flex flex-row h-[440px]">
        <div>
          <Sidebar setStatus={setStatus}  />
        </div>
        <div>
          <Content status={status} />
        </div>
      </div>
      <div><p>player</p></div>
    </div>
  );
};
export default Dashboard;
