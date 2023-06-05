const e = require("cors");
const Producto = require("../models/product.model");


module.exports.createProducto= async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json({ Producto: nuevoProducto });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "Esta mascota ya existe", error: err });
    } else {
      res.status(500).json({ message: "No has podido crear una nueva mascota", error: err });
    }
  }
};

module.exports.encontrarTodos = async (req, res) => {
  try {
    const todosLosProductos = await Producto.find();
    res.status(200).json({ Producto: todosLosProductos });
  } catch (err) {
    res.status(500).json({ message: "No has podido encontrar todas las mascotas", error: err });
  }
};

module.exports.encontrarUnProducto = async (req, res) => {
  try {
    const unProducto = await Producto.findById(req.params.id);
    res.status(200).json({ Producto: unProducto });
  } catch (err) {
    res.status(500).json({ message: "No has podido encontrar una mascota", error: err });
  }
};

module.exports.actualizarUnProducto = async (req, res) => {
  try {
    const unProducto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ Producto: unProducto });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong al actualizar un producto", error: err });
  }
}

module.exports.eliminarUnProducto = async (req, res) => {
  try {
    const unProducto = await Producto.findByIdAndDelete(req.params.id);
    res.json({ Producto: unProducto });
  } catch (err) {
    res.json({ message: "No has podido actualizar a tu mascota", error: err });
  }
}

module.exports.ordenarPorPrice = async (req, res) => {
  try {
    const todosLosProductos = await Producto.find().sort({price: 1});
    res.json({ Producto: todosLosProductos });
  } catch (err) {
    res.json({ message: "Something went wrong al buscar todos los mascotas", error: err });
  }
}

module.exports.ordenarPorCategory = async (req, res) => {
  try {
    const todosLosProductos = await Producto.find().sort({ type: 1 });
    res.json({ Producto: todosLosProductos });
  } catch (err) {
    res.json({ message: "Something went wrong al buscar todos los mascotas", error: err });
  }
}

module.exports.ordenarPorName = async (req, res) => {
  try {
    const todosLosProductos = await Producto.find().sort({ category: 1 });
    res.status(200).json({ Producto: todosLosProductos });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong al buscar todos los mascotas", error: err });
  }
}

// module.exports.searchByName = async (req, res) => {
//   try {
//     const todosLosProductos = await Producto.find({name: req.params.name});
//     res.json({ Producto: todosLosProductos });
//   } catch (err) {
//     res.json({ message: "Something went wrong al buscar todos los productos", error: err });
//   }
// }









