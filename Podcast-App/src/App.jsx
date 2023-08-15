import './App.css'
import Data from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Seasons from './components/Seasons'
import Login from './components/Login'
import SignOut from './components/Signout'

function App() {
return (


<>
    <BrowserRouter>

    
    <Routes>
    
        <Route path='/' element={<Data />} />
        <Route path='/:id' element={<Seasons />} />
        <Route path= "/login" element={<Login />} />
       
    
    </Routes>


    </BrowserRouter>
{/*     
    <audio controls>
    <source  />
    </audio> */}

</>

)}

export default App
