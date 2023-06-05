const ProductsController = require("../controllers/product.controller");

module.exports = app => {
   
    app.post("/api/producto/nuevo", ProductsController.createProducto);
    app.get("/api/productolist/", ProductsController.ordenarPorCategory);
    app.get("/api/productolist/", ProductsController.encontrarTodos);
    app.get("/api/productolist/:id", ProductsController.encontrarUnProducto);
    app.put("/api/productolist/actualizar/:id", ProductsController.actualizarUnProducto);
    app.delete("/api/productolist/eliminar/:id", ProductsController.eliminarUnProducto);
    // app.get("/api/productolist/ordenarPorName", ProductsController.ordenarPorName);

    
    }
