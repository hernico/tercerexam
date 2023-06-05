import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("useEffect is running");
    axios
      .get("/api/productolist")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.Producto);
      })
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = (id) => {
    if (window.confirm("la mascota requiere de una familia responsable, lo eres?")) {
      axios
        .delete("/api/productolist/eliminar/" + id)
        .then((res) => {
          console.log(res.data);
          setProducts(products.filter((product) => product._id !== id));
          setMessage("Haz adoptado una mascota");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="row-gap-3 d-flex align-items-center">
        <h1 className="col text-md-start">Pet Shelter</h1>
        <div className="col text-end">
          <div className="col">
            <p>
              <a 
                onClick={() => navigate("/pets/new")}
                className=" btn btn-link link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                add a new pet to the shelter
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <h1 className="col text-sm-start fs-4 mt-3">
          These pets are looking for a good home
        </h1>
      </div>
      <div className="row mt-4"></div>

      <Table size="sm" className="table table-hover table-boardered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product, idx) => {
              return (
                <tr key={idx}>
                  <td>{product.nombre}</td>
                  {/* <td>{product.edad} </td> */}
                  {/* <td>{product._id}</td> */}
                  {/* <td>{product.description}</td> */}
                  <td>{product.type}</td>
                  <td>
                    <Link
                      to={`/pets/${product._id}`}
                      className="btn btn-outline-info mx-2"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/pets/actualizar/${product._id}`}
                      className="btn btn-outline-warning mx-2"
                    >
                      Edit
                    </Link>
                    <Link
                      className="btn btn-outline-success mx-2"
                      onClick={() => deleteProduct(product._id)} 
                    >
                      Adoptar
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
            {message && <p>{message}</p>}
    </div>
  );
};

export default ProductList;
