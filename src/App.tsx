
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/routes';
import './App.css';
import Header from './components/Header';

function App() {

  return (
    <>
    <AuthProvider>
      <Header/>
    <Routes/>
    </AuthProvider>
    </>
  )
}

export default App
