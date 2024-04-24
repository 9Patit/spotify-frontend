import Logo from "../img/Logo.png";

const clientId = "e0e2d01268884c5c86bef49f2533af70";

const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20playlist-modify-public%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return (
    <div className=" flex  flex-col  justify-center items-center h-screen w-screen bg-[#1DB954] ">
      <div>
        <img src={Logo} alt="Logo" className="h-[200px]"/>
      </div>
      <div className=" mt-[100px]">
        <a
          className="bg-[#000000] text-[#1db954] px-4 py-2 text-lg rounded-full"
          href={AUTH_URL}
        >
          Login with Spotify
        </a>
      </div>
    </div>
  );
};

export default Login;
