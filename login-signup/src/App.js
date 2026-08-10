import { useState } from 'react';
import './App.css';
import LoginSignup from './Components/LoginSingup/LoginSignup';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const [loggedInEmail, setLoggedInEmail] = useState(null);

  if (loggedInEmail) {
    return <Dashboard email={loggedInEmail} onLogout={() => setLoggedInEmail(null)} />;
  }

  return (
    <div>
      <LoginSignup onLogin={(email) => setLoggedInEmail(email)} />
    </div>
  );
}

export default App;
