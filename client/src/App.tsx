import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PostDetail from './pages/PostDetail';
import User from './pages/User';
import ProtectedRoute from './components/ProtectedRoute';
import Setting from './pages/Setting';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<PostDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/setting' element={<Setting />} />
        </Route>
        <Route path='/user/:id' element={<User />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
