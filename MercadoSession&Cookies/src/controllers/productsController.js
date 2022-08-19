const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");

const universalModel = require('../models/universalModel');
const productModel = universalModel('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    detail: (req, res) => {
        const product = productModel.findById(req.params.id)
        // console.log("------------ESTOY EN DETAIL----------------------")

        // console.log("VEO LAS SIGUIENTES FOTOS")
        // product.image.forEach( imagen => {
        //     console.log(imagen)
        // })

        res.render('./products/detail', {
            product,
            toThousand
        })
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('./products/product-create-form')
    },


    // Create -  Method to store
    store: (req, res) => {

        // const files = req.files;
        const { files } = req;
        
        // Esto es más que nada informativo para nosotros no es indispensable
        console.log("-----LLEGO/ARON ESTA/S FOTO/S --------")
        files.forEach( file => {
            console.log(file.filename);
        })        
        
        // request
        // console.log('Esto tiene el request');
        // console.log(req);

        // Comienzo a validar
        const resultadosValidaciones = validationResult(req);
        // console.log('Esto tiene el resultadosValidaciones');      
        // console.log(resultadosValidaciones);
       
        // Con este if preguntamos si hay errores de validación
        if (!resultadosValidaciones.isEmpty()){
            console.log("----- ojo HAY ERRORES -----------------")
            
            // Si hay errores borramos los archivos que cargó multer
            files.forEach( file => {
                const filePath = path.join(__dirname, `../../public/images/products/${file.filename}`);
                fs.unlinkSync(filePath);
            })
            
            console.log("-------- my body -------------------")
            console.log(req.body);  

            console.log("-------- resultadosValidaciones.mapped() -------------------")
            console.log(resultadosValidaciones.mapped());  


            return res.render('./products/product-create-form', {
                errors: resultadosValidaciones.mapped(),
                // oldData son los datos recién cargados es decir el req.body
                oldData: req.body
            })
        }

        console.log("--Muy bien, no hay errores ---------------------------");

        // Creamos un array vacío para ir almacenado los nombres de los archivos
        let imagenes = [];

        //  Leo de manera secuencial  el array files del request y cargo los nombres en el array de imágenes
        //  puede ser que venga una sola foto
        files.forEach( imagen => {
            imagenes.push(imagen.filename);
        })

        // Atrapo todos los campos del formulario
        const newProduct = {
            ...req.body,
            // Si no mando imágenes pongo una por defecto
            image: req.files.length >= 1 ? imagenes : ["default-image.png"]
        }
        productModel.create(newProduct);
        console.log('cree un nuevo producto')
        res.redirect('/')
    },


    // Update - Form to edit
    edit: (req, res) => {

        const { id } = req.params;

        const productToEdit = productModel.findById(id)

        res.render('./products/product-edit-form', { productToEdit })
    },

    // Update - Method to update
    update: (req, res) => {
        // const files = req.files;
        const { files } = req;
        // const id = req.params.id;
        const { id } = req.params;
        
        console.log("-----LLEGO/ARON ESTA/S FOTO/S --------")
        files.forEach( file => {
            console.log(file.filename);
        })        
        
        // Comienzo a validar
        const resultadosValidaciones = validationResult(req);
        console.log(resultadosValidaciones);
       
        // Con este if preguntamos si hay errores de validación
        if (!resultadosValidaciones.isEmpty()){
            console.log("----- ojo HAY ERRORES -----------------")
            
            // Si hay errores borramos los archivos que cargó multer
            files.forEach( file => {
                const filePath = path.join(__dirname, `../../public/images/products/${file.filename}`);
                fs.unlinkSync(filePath);
            })
            
            console.log("-------- my body -------------------")
            console.log(req.body);  

            const productToEdit = productModel.findById(id);

            return res.render('./products/product-edit-form', {
                productToEdit,
                errors: resultadosValidaciones.mapped(),
                // oldData son los datos recién cargados es decir el req.body
                oldData: req.body
            })
        }

        console.log("--Muy bien, no hay errores ---------------------------");


        let productToEdit = productModel.findById(id);

        // Creamos un array vacío para ir almacenado los nombres de los archivos
        let imagenes = [];

        //  Leo de manera secuencial  el array files del request y cargo los nombres en el array de imágenes
        //  puede ser que venga una sola foto
        files.forEach( imagen => {
            imagenes.push(imagen.filename);
        })

        console.log(imagenes);

        // si enviaron imagenes nuevas vamos a borrar del file system las anteriores
        if(imagenes.length > 0){
            const imagenesAnteriores = productToEdit.image;
            imagenesAnteriores.forEach( imagen => {
                const filePath = path.join(__dirname, `../../public/images/products/${imagen}`);
                fs.unlinkSync(filePath);
            })
        }

        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            // Si se suben imagenes se pone como valor el array imagenes y sino se queda el que ya estaba antes
            image: req.files.length >= 1 ? imagenes : productToEdit.image
        }

        productModel.update(productToEdit)
        res.redirect("/");

    },


    destroy: function (req, res) {

        // Desestructuramos el id del req.params
        const { id } = req.params;

        // Desestructuramos la propiedad image del producto encontrado y lo renombramos
        const { image: imagenesBorrar} = productModel.findById(id);
        // Procedemos a iterar el array de imagenes con un forEach y borrarlas del FS
        imagenesBorrar.forEach( file => {
            const filePath = path.join(__dirname, `../../public/images/products/${file}`);
            fs.unlinkSync(filePath);
        });

        // Borramos el producto del archivo JSON
        productModel.delete(id);
        
        // Redirigimos al Home
        res.redirect("/");
    }


};



module.exports = controller;