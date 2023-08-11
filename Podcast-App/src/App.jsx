import './App.css'
import Data from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Seasons from './Seasons'

function App() {
return (


<BrowserRouter>

  
<Routes>
  
    <Route path='/' element={<Data />} />
    <Route path='/:id' element={<Seasons />} />
   
    
  
</Routes>


</BrowserRouter>
 


)}

export default App
