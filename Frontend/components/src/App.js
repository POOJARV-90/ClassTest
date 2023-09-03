import logo from './logo.svg';
import './App.css';

import {Route , Routes} from 'react-router-dom'
import Login from './Compo/Login';
import Register from './Compo/Register';
import Addproduct from './Compo/Seller/Addproduct';

function App() {
  
  return (
    <div>
      <Routes>
      <Route exact path='/Register' element={<Register/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Addproduct' element={<Addproduct/>}/>
      </Routes>

      
    </div>
  );
}

export default App;
