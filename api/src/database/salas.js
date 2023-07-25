const {mongoose,Schema} = require('mongoose')

const salasSchema = mongoose.Schema({
    name:{
        type:String
    },
   // paciente:[{type: Schema.Types.ObjectId, ref: "Pacientes" }]
},{ timestamps:true,versionKey: false })

module.exports = mongoose.model('Salas',salasSchema)