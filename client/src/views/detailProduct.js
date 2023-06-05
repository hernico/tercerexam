import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // Variable de estado para controlar la confirmación de eliminación
  const [isLiked, setIsLiked] = useState(false); // Variable de estado para controlar el botón de me gusta
  const [Skills, setSkills] = useState({
    skill1: '',
    skill2: '',
    skill3: '',
  });

  useEffect(() => {
    axios
      .get(`/api/productolist/${id}`)
      .then((res) => {
        console.log('product from API:', res.data.Producto);
        setProduct(res.data.Producto); // Actualizar el estado con los datos de la respuesta
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log('rendering ProductDetail');

  const deleteProduct = (id) => {
    if (!isDeleting && window.confirm('Estas seguro?')) {
      setIsDeleting(true); // Establecer la variable de estado como true para evitar bucle
      axios
        .delete(`/api/productolist/eliminar/${id}`)
        .then((res) => {
          console.log(res.data);
          setMessage("Haz adoptado una mascota");
          navigate('/');
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsDeleting(false); // Restablecer la variable de estado a false después de la eliminación
        });
    }
  };

  const handleLikeClick = () => {
    setIsLiked(true);
    axios
      .put(`/api/productolist/actualizar/${id}`, {
        likes: product.likes + 1,
      })
      .then((res) => {
        console.log('Pet updated:', res.data.Producto);
        setProduct(res.data.Producto);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="mt-4">Pet Shelter</h1>
      <button className="btn btn-success mx-2" onClick={() => deleteProduct(product._id)}>
        Adoptar
      </button>
      {Object.keys(product).length > 0 && (
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Details about {product.nombre}</h2>
            <p className="card-text">
              <strong>Pet Name:</strong> {product.nombre}
            </p>
            <p className="card-text">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="card-text">
              <strong>Pet Type:</strong> {product.type}
            </p>
    
            <p className="card-text">
              <strong>Skills:</strong> {product.skills.skill1} {product.skills.skill2} {product.skills.skill3}
            </p>
         
            <button  disabled={isLiked} className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`} onClick={handleLikeClick}>
      <BsHeart className="me-2" /> A {product.likes} le gusta esta mascota
    </button>
          </div>
        </div>
      )}

      <button className="btn btn-outline-primary mx-2" onClick={() => navigate('/')}>
        Go to List
      </button>
      <button className="btn btn-outline-warning mx-2" onClick={() => navigate('/pets/actualizar/' + id)}>
        Edit Product
      </button>
      {message && <p>{message}</p>}
    
    </div>
  );
};

export default ProductDetail;
