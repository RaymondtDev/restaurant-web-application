import Header from './components/Header';
import { MobileStateProvider } from './contexts/MobileStateProvider';
import Home from './pages/Home/Home';

function App() {
  return (
    <MobileStateProvider>
      <Header />
      <Home />
    </MobileStateProvider>
  )
}

export default App
