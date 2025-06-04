
import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Dificuldade } from '../pages/Dificuldade'
import { Ranking } from '../pages/Ranking'
import Instrucoes from '../pages/Instrucoes'
import { Idioma } from '../pages/Idioma'
import { Game } from '../pages/Game'

import ModelScore from "../pages/ModelScore"; 


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/jogo" element={<Dificuldade />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/instrucoes" element={<Instrucoes />} />
      <Route path="/idioma" element={<Idioma />} />
      <Route path="/modelScore" element={< ModelScore />} />
      <Route path="/jogo/:nivel" element={<Game />} />
    </Routes>
  )
}
