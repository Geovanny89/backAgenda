const {mongoose,Schema} = require('mongoose')

const habitacionesSchema= mongoose.Schema({
    name:{
        type:String
    },
   // paciente:[{type: Schema.Types.ObjectId, ref: "Pacientes" }]
},{ timestamps:true,versionKey: false })

module.exports = mongoose.model('Habitaciones', habitacionesSchema)