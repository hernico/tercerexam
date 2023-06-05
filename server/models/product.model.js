const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
	nombre:{
        type: String,
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        unique: [true, "El nombre ya existe"],
        lowercase: true,
    
    },

    description:{
        type: String,
        minlength: [3, "La descripcion debe tener al menos 3 caracteres"],
        unique: [true, "El nombre ya existe"],
        lowercase: true,
    },
    type:{
        type: String,
        minlength: [3, "El tipo debe tener al menos 3 caracteres"],
    },
    likes: {
        type: Number,
        default: 0,
    },
    skills:{
        skill1: String,
        skill2: String,
        skill3: String,
    }
}, {timestamps: true});

ProductoSchema.index({ nombre: 1 }, { collation: { locale: 'en', strength: 2 } });


const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;
