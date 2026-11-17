import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Layout from './componentes/Layout'
import Inicio from './pages/Inicio'
import Cursos from './pages/Cursos'
import Nosotros from './pages/Nosotros'
import Accesibilidad from './pages/Accesibilidad'
import Contacto from './pages/Contacto'
import "./CSS/estilosPrincipales.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
            <Route path="/" element={<Layout><Inicio /></Layout>}/>

            <Route path="/cursos" element={<Layout><Cursos/></Layout>} />

            <Route path="/nosotros" element={<Layout><Nosotros/></Layout>} />

            <Route path="/accesibilidad" element={<Layout><Accesibilidad/></Layout>} />

            <Route path="/contacto" element={<Layout><Contacto/></Layout>} />
        </Routes>
    </>
  )
}

export default App
