import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateProduct from './components/createProduct';
import ProductList from './components/productList';
import ProductDetail from './views/detailProduct';
import UpdateProduct from './components/updateProduct';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter >
      <Routes>
        <Route path="/pets/new" element={<CreateProduct />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/pets/:id" element={<ProductDetail />} />
        <Route path="/pets/actualizar/:id" element={<UpdateProduct />} />

        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;