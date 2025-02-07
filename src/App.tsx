import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes/routes";
import "./App.css";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <>
      <HeroUIProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </HeroUIProvider>
    </>
  );
}

export default App;
