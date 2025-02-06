
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/routes';
import './App.css';
import ClockIn from './components/clockin';

function App() {

  return (
    <>
    <AuthProvider>
    <Routes/>
    <ClockIn/>
    </AuthProvider>
    </>
  )
}

export default App
