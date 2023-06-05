import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
  });

  useEffect(() => {
    console.log(id);
    axios.get(`/api/productolist/${id}`)
      .then(res => {
        console.log(res.data.Producto);
        const product = res.data.Producto;
        setNombre(product.nombre);
        setDescription(product.description);
        setType(product.type);
        setSkills(product.skills);

      })
      .catch(err => console.error(err));
  }, [id]);

  const onSubmitHandler = e => {
    e.preventDefault();
    const newErrors = {};

    if (description.length < 3) {
      newErrors.description = 'La descripción debe tener al menos 3 caracteres';
    }

    if (nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (type.length <3) {
      newErrors.type = 'Debe escoger un tipo de mascota';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedProduct = {
      nombre: nombre,
      description: description,
      type: type,
      skills: skills,
    };

    axios
      .put(`/api/productolist/actualizar/${id}`, updatedProduct)
      .then((res) => {
        console.log(res.data);
        navigate('/');
      })
   .catch((err) => {
        console.error(err.response.data);
          setErrors({ ...newErrors, petRepeated: 'Ya existe esta mascota' });

      });
  };

  return (
    <div className="container">
      <div className="row gr-5">
      <div className="col">
      <h1 className="p-3 ">Pet Shelter</h1>
      </div>
      <div className="col">

      <button onClick={() => navigate('/')} className="btn btn-outline-primary  mt-3 btn-sm">Back to Home</button>
      </div>
        
        </div> 
            
      <h3>Editando a {nombre}</h3><br />
      <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3 ">
              <label className="form-label">Pet Name</label>
              <input type="text" className="form-control" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              {errors.nombre && <span style={{ color: 'red' }}>{errors.nombre}</span>}
            </div>

            <div className="mb-3 ">
              <label className="form-label">Pet Description</label>
              <input type="text" className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
            </div>

            <div className="mb-3 ">
              <label className="form-label">Type</label>
              <select className="form-select" name="type" value={type} onChange={(e) => setType(e.target.value)}>
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
            <div className="mb-3 ">
              <label className="form-label">Skills (optional)</label>
              <div className="mb-3">
                <label>Skill 1</label>
                <input type="text" className="form-control" name="skill1" value={skills.skill1} onChange={(e) => setSkills({ ...skills, skill1: e.target.value })} />
              </div>
              <div className="mb-3">
                <label>Skill 2</label>
                <input type="text" className="form-control" name="skill2" value={skills.skill2} onChange={(e) => setSkills({ ...skills, skill2: e.target.value })} />
              </div>
              <div className="mb-3">
                <label>Skill 3</label>
                <input type="text" className="form-control" name="skill3" value={skills.skill3} onChange={(e) => setSkills({ ...skills, skill3: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Actualizar</button><br />
        {errors.petRepeated && <span style={{ color: 'red' }}>{errors.petRepeated}</span>}

      </form>
    </div>
  );
}

export default UpdateProduct;
