import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Atendente from './pages/Atendente'
import Cliente from './pages/Cliente'
import Login from './pages/Login'
import SignIm from './pages/SignIn'

import './App.css'

function App() {

  return (
    <>
      <Header />

      <Routes>

        <Route path='/' element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path='/atendente' element={<Atendente />} />
          <Route path='/cliente' element={<Cliente />} />
        </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
