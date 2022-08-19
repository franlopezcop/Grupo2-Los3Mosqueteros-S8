const express = require('express');
const router = express.Router();

// Middlewares
// multer
const middlemulter = require("../middleware/middlemulter");
const upload = middlemulter("users", "User");
// Express-Validator
const userRegisterValidation = require("../middleware/userRegisterValidation");
const userLoginValidator = require("../middleware/userLoginValidator");
// AuthMiddleware y GuestMiddleware
const authMiddleware = require("../middleware/authMiddleware");
const guestMiddleware = require("../middleware/guestMiddleware");

// Controllers 
const userController = require("../controllers/userController.js");

// rutas para registrar usuarios
router.get('/register', guestMiddleware, userController.register);
router.post('/register', upload.single("image"), userRegisterValidation, userController.processRegister);

// rutas para login de usuarios
router.get('/login', guestMiddleware, userController.login);
router.post('/login', userLoginValidator, userController.processLogin);

// ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, userController.profile);

// ruta para realizar el logout
router.get("/logout", userController.logout);

module.exports = router;