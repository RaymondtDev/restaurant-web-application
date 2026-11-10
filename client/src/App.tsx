import { MobileStateProvider } from './contexts/MobileStateProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Contact from './pages/Contact/Contact';
import Account from './pages/Account/Account';
import Login from './pages/Account/Login';
import Cart from './pages/Account/Cart';
import IndexPage from './pages/IndexPage';
import Register from './pages/Account/Register';
import { AuthProvider } from './contexts/AuthProvider';
import { DisplayToastProvider } from './contexts/DisplayToastProvider';

function App() {
  return (
    <DisplayToastProvider>
    <MobileStateProvider>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<IndexPage />}>
          <Route index element={<Home />} />
          <Route path='menu/:category?' element={<Menu />} />
          <Route path='contact' element={<Contact />} />
          <Route path='account' element={<Account />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<h1 className='text-center text-3xl font-bold mt-10'>404 - Page Not Found</h1>} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
    </MobileStateProvider>
    </DisplayToastProvider>
  )
}

export default App
