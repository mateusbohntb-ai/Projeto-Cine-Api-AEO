import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Atendente from './pages/Atendente'
import Cliente from './pages/Cliente'
import Filme from './pages/Filme'
import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './routes/PrivateRoute'

import './App.css'

function App() {

  return (
    <>
      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cliente' element={<Cliente />} />
        <Route path='/filmes/:id' element={<Filme />} />

        <Route element={<PrivateRoute />}>
          <Route path='/atendente' element={<Atendente />} />
        </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App