
import './App.css'
import ClockIn from './components/clockin'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
    <AuthProvider>
      <ClockIn/>
    </AuthProvider>

    </>
  )
}

export default App
