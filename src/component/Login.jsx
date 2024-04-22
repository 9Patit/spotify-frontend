const clientId = "e0e2d01268884c5c86bef49f2533af70";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20playlist-modify-public%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;


const Login = () => {
  return(
    <div className="flex items-center justify-center h-screen w-screen">
      <a className="bg-green-500 text-white px-4 py-2 text-lg rounded-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </div>
  )
};

export default Login;
