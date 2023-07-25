const {mongoose }= require('mongoose')

const procedimientosSchema= mongoose.Schema({
    name:{
        type:String
    }
},{ timestamps:true,versionKey: false })

module.exports= mongoose.model('Procedimiento',procedimientosSchema)