import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) return <Login />;
  
  return (
    <AuthProvider>
      <Dashboard code={code} />
    </AuthProvider>
  )
  
}
export default App;
