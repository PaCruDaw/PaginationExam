import {Routes, Route} from 'react-router-dom'
import PaginationExample from './paginacion'
import './App.css'

function App() {

  return (

    <Routes>
        <Route exact path="/" element = { <PaginationExample />}/>
    </Routes>
  );
      
}

export default App
