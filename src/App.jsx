import { useState } from 'react'
import Game from './components/Game'
import './styles/App.css'

function App() {

  return (
    <>
    <div className="min-h-screen w-full h-full flex justify-center items-center bg-base-200">
      <Game/>
    </div>
    </>
  )
}

export default App
