import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import { TrackProvider } from "./context/TrackContext";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  console.log(code);
  if (!code) return <Login />;

  return (
    <AuthProvider>
      <PlaylistProvider>
        <TrackProvider>
          <Dashboard code={code} />
        </TrackProvider>
      </PlaylistProvider>
    </AuthProvider>
  );
}
export default App;
