
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Marketlist from './Pages/Marketlist'
import CoinDetails from './Pages/CoinDetails'
import Watchlist from './Pages/Watchlist'
function App() {


  return (
    <>
   
    <BrowserRouter>
     <Navbar/>
    <Routes>
      
        <Route path='/' element={<Marketlist/>}/>
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
