import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [marca, setMarca] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (precio < 10) {
      newErrors.precio = 'El precio debe ser mayor a 10';
    }

    if (description.length < 3) {
      newErrors.description = 'La descripción debe tener al menos 3 caracteres';
    }

    if (nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (category.length < 3) {
      newErrors.category = 'El tipo debe tener al menos 3 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const nuevoProducto = {
      nombre: nombre,
      precio: precio,
      description: description,
      category: category,
      marca: 'Bebidas',

    };

    axios
      .post('/api/producto/nuevo', nuevoProducto)
      .then((res) => {
        console.log(res.data);
        alert('Producto creado con éxito');

        navigate('/products');
      })
      .catch((err) => {
        console.error(err.response.data);
        alert('Producto repetido');
      });
  };

  const handlePrecioChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setPrecio(value);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Product Manager</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="form-control"
            onChange={(e) => setNombre(e.target.value)}
          />
          {errors.nombre && <span style={{ color: 'red' }}>{errors.nombre}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <input
            type="number"
            name="precio"
            id="precio"
            className="form-control"
            value={precio}
            onChange={handlePrecioChange}
          />
          {errors.precio && <span style={{ color: 'red' }}>{errors.precio}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Tipo
          </label>
          <select name="category" id="category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Seleccione un tipo</option>
            <option value="Bebestibles">Bebestibles</option>
            <option value="Comestibles">Comestibles</option>
            <option value="Aseo">Aseo</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.category && <span style={{ color: 'red' }}>{errors.category}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
};

export default CreateProduct;
