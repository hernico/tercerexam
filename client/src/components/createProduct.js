import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'mongoose';

const CreateProduct = () => {
  const [nombre, setNombre] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState({
    skill1: '',
    skill2: '',
    skill3: '',
  });


  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (description.length < 3) {
      newErrors.description = 'La descripción debe tener al menos 3 caracteres';
    }

    if (nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (type.length < 3) {
      newErrors.type = 'El tipo debe tener al menos 3 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const nuevoProducto = {
      nombre: nombre,
      description: description,
      type: type,
      skills: skills,

    };




    axios
      .post('/api/producto/nuevo', nuevoProducto)
      .then((res) => {
        console.log(res.data);
        alert("Mascota agregada");
        navigate('/');
      })
      .catch((err) => {
        console.error(err.response.data);
        if (err.response.status === 409) {
          setErrors({ ...newErrors, petRepeated: 'Ya existe esta mascota'  });
        } else {
          alert("Producto repetido");
        }
      });
  };


  return (
    <div className="container">
      <div className="row gr-5">
      <div className="col">
      </div>
      <div className="col">
      <h1 className="p-3">Pet Chelter</h1>
      </div>
      <div className="col">

      <button type="=" className="btn btn-outline-primary  mt-3 btn-sm" onClick={() => navigate('/')}>Back to Home</button></div>
      </div>

      <h3>Know a pet needing home?</h3><br />
      <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Pet Name</label>
              <input type="text" className="form-control" name="nombre" onChange={(e) => setNombre(e.target.value)} />
              {errors.nombre && <span style={{ color: 'red' }}>{errors.nombre}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" name="description" onChange={(e) => setDescription(e.target.value)} />
              {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <select className="form-select" name="type" onChange={(e) => setType(e.target.value)}>
              <option value="" placeholder="Seleccione un tipo"></option>
                <option value="Gato">Gato</option>
                <option value="Perro">Perro</option>
                <option value="Conejo">Conejo</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
            </div>
          </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Skills</label>
                <div className="mb-3">
                  <label>Skill 1</label>
                  <input type="text" className="form-control" name="skill1" onChange={(e) => setSkills({ ...skills, skill1: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label>Skill 2</label>
                  <input type="text" className="form-control" name="skill2" onChange={(e) => setSkills({ ...skills, skill2: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label>Skill 3</label>
                  <input type="text" className="form-control" name="skill3" onChange={(e) => setSkills({ ...skills, skill3: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Crear</button><br />
          {errors.petRepeated && <span style={{ color: 'red' }}>{errors.petRepeated}</span>}
      </form>
    </div>

  );
};



export default CreateProduct;