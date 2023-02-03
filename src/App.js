import React from 'react';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { Tags } from './pages/Tags';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/posts/:id' element={<FullPost />} exact />
          <Route path='/posts/:id/edit' element={<AddPost />} exact />
          <Route path='/tags/:type' element={<Tags />} exact />
          <Route path='/add-post' element={<AddPost />} exact />
          <Route path='/login' element={<Login />} exact />
          <Route path='/register' element={<Registration />} exact />
        </Routes>
      </Container>
    </>
  );
}

export default App;
