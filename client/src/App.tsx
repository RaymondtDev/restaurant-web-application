import Header from './components/Header';
import { MobileStateProvider } from './contexts/MobileStateProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Contact from './pages/Contact/Contact';
import Account from './pages/Account/Account';
import Login from './pages/Account/Login';
import Cart from './pages/Account/Cart';

function App() {
  return (
    <MobileStateProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='menu/:category?' element={<Menu />} />
        <Route path='contact' element={<Contact />} />
        <Route path='account' element={<Account />} />
        <Route path='login' element={<Login />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<h1 className='text-center text-3xl font-bold mt-10'>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    </MobileStateProvider>
  )
}

export default App
