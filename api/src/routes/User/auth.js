const { Router } = require('express')
const UserSchema = require('../../database/user');
const { validatorRegister, validatorLogin } = require('../../validator/auth')
const { tokenSign,verifyToken } = require('../../utils/handleJwt')
const { encrypt, compare } = require('../../utils/handlePassword');

const router = Router();

router.get('/user',  async (req, res) => {
    
    try {
        const user = await UserSchema.find()
        if (!user) {
            return res.status(404).send("No existen Usuarios")
        }
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
})

router.post('/register',validatorRegister,  async (req, res) => {
    try {
        const password = await encrypt(req.body.contraseña)
        const body = { ...req.body, contraseña: password }
        const user = await UserSchema(body)
        
        user.save();
        
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
    
});
router.post("/login", validatorLogin, async (req, res) => {
    try {
        const user = await UserSchema.findOne({ nombreUsuario: req.body.nombreUsuario });
        console.log(req.body.nombreUsuario);
        if (!user) {
                    res.status(404).send("Usuario no existe");
                    return;
                }
                
                const hashPassword = user.contraseña;
                console.log(hashPassword);
                const check = await compare(req.body.contraseña, hashPassword);
                if (!check) {
                    res.status(401).send("Credenciales incorrectas");
                    return;
                }
                
                user.set('password', undefined, { strict: false });
                const data = {
                    token: await tokenSign(user),
                    user
                };
                console.log(data);
                
                res.status(200).send(data);
            } catch (error) {
                res.status(500).json({ "error": "Error de servidor" });
                console.log(error);
            }
});

router.get("/getSession", async (req,res)=>{
    const token = JSON.parse(req.headers["x-user-session"]);
    try {
        if(token){
            const session = await verifyToken(token)
            
            const user = await UserSchema.findById(session._id)
            res.status(200).json({user}) 
        }
        else{
            res.status(401).json({error:"Sesion no activa"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error al obtener la sesion"})
    }
    
})
router.put('/register/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = UserSchema.findById(id)
        if (!user) {
            res.status(404).send("No existe usuario con ese ID")
            return
        }
        const { nombre, apellido, nombreUsuario, cargo, email, contraseña } = req.body;
        const updateUser = await UserSchema.findByIdAndUpdate(id, {
            nombre: nombre,
            apellido: apellido,
            nombreUsuario: nombreUsuario,
            cargo: cargo,
            email: email,
            contraseña: contraseña
        }, { new: true })
        res.status(200).send(updateUser)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
});
router.delete('/userDelete/:id',  async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserSchema.findById(id)
        if (!user) {
            res.status(404).send("No existe Usuario con ese ID")
            return
        }
        const deleteUser = await UserSchema.findByIdAndDelete(id)
        res.status(200).send("Usuario eliminado ")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
})
module.exports = router;

