import UmucoAuth from "./UmucoCore";
import { Routes, Route} from "react-router-dom"
const App = ()=>{
  return (
    <>

      <Routes>
        <Route path="/UmucoCore" element={<UmucoAuth/>}/>
      </Routes>
  
    </>
  )
}

export default App;