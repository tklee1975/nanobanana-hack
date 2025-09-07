import { useState } from 'react'
import './App.css'
// import Button from '@mui/material/Button';
import Router from './routes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>Kencoder Test</h1>
      <div className="card">
        <Button variant="contained">Hello World</Button>

      </div> */}
      <Router></Router>
    </>
  )
}

export default App
