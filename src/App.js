import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Departments } from './pages/Departments/Departments';
import { Products } from './pages/Products/Products';
import { ProductDetails } from './components/ProductDetail/ProductDetail';
import { AddNewProduct } from './pages/AddNewProduct/AddNewProduct';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/departments' element={<Departments/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/products/:productId' element={<ProductDetails/>}></Route>
        <Route path='/add-new-product' element={<AddNewProduct/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
