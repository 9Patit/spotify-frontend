import useAuth from "../hook/useAuth";
import Content from "./Content";
import Player from "./Player";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Logo from "../img/Logo.png";
import axios from "axios";
import { useAuthContext } from "../hook/useAuthContext";

// eslint-disable-next-line react/prop-types
const Dashboard = ({ code }) => {
  // eslint-disable-next-line no-unused-vars
  const accessToken = useAuth(code);
  // console.log(accessToken);
  const [status, setStatus] = useState("Main");
  const [serverReady, setServerReady] = useState(false);
  const { refreshToken } = useAuthContext();

  useEffect(() => {
    const checkServer = async () => {
      try {
        const responseRefresh = await axios.post(
          "https://spotify-server-1.onrender.com/refresh",

          {
            refreshToken,
          }
        );
        const accessToken = responseRefresh.data.accessToken;

        if (accessToken) {
          setServerReady(true);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
      }
    };

    checkServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  if (!serverReady) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#1DB954] ">
        <img src={Logo} alt="Logo" className="h-[200px]" />
        <div className="mt-[100px]">
          <h1 className="text-[#000000]">
            <b>Please wait a moment </b>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] h-screen w-screen  flex flex-col ">
      <div className="flex flex-row h-[90%] w-[100%] bg-[#000000] mt-[5px]">
        <div className="w-[25%] bg-[#000000] ml-[5px] rounded-lg">
          <Sidebar setStatus={setStatus} /> 
        </div>

        <div className="w-[75%]  bg-[#000000] ml-[5px] mr-[5px] rounded-lg overflow-hidden">
          <Content status={status} />       
        </div>
      </div>

      <Player />
     
    </div>
  );
};
export default Dashboard;
