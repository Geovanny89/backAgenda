const {mongoose} = require('mongoose')

const UserSchema = mongoose.Schema({
    nombre:{
        type:String
    },
    apellido:{
        type:String
    },
    
    nombreUsuario:{
        type:String
    },
   
    email:{
        type:String
    },
    contraseña:{
        type:String
    },
    rol:{
        type:["user","admin"],
        default:"user"
    },
},{timestamps:true, versionKey: false })

module.exports= mongoose.model('usuarios', UserSchema);
