import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { PlaylistProvider } from "./context/PlaylistContext";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) return <Login />;

  return (
    <AuthProvider>
      <PlaylistProvider>
        <Dashboard code={code} />
      </PlaylistProvider>
    </AuthProvider>
  );
}
export default App;
