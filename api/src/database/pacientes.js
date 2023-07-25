const { mongoose, Schema } = require('mongoose')

const pacientesSchema = mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    id:{
        type:Number
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    estado: {
        type: String,
        enum: ['preparación', 'recuperación', 'procedimiento'],
        default: 'preparación'
    },
    cirujano: { type: Schema.Types.ObjectId, ref: 'Cirujano' },
    procedimiento: { type: Schema.Types.ObjectId, ref: 'Procedimiento' },
    sala: { type: Schema.Types.ObjectId, ref: 'Salas' },
    habitacion: { type: Schema.Types.ObjectId, ref: 'Habitaciones' },
    day: {
        type: Number // Día del mes
    },
    month: {
        type: Number // Mes (1-12)
    },
    year: {
        type: Number // Año
    },
    hour: {
        type: Number // Hora (0-23)
    },
    minute:{
        type:Number
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Pacientes', pacientesSchema)