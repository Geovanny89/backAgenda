const {mongoose, Schema} = require('mongoose');

const cirujanoSchema = mongoose.Schema({
    name:{
        type:String,
        require:true 
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    
    // paciente:[{type: Schema.Types.ObjectId, ref: "Pacientes" }]

},{ timestamps:true,versionKey: false });

module.exports= mongoose.model('Cirujano',cirujanoSchema);