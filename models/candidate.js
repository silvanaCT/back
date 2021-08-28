const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cadidateSchema = new Schema({
    fullName: { type: String, required: true },
    birthDate: { type: String, required: true },
    sex: { type: String, enum: ['m', 'f', 'nao informado'], required: true },
    civilState: { 
        type: String,
        enum: [
            'solteiro',
            'casado',
            'divorciado',
            'separado',
            'viuvo'
            ],
        required: true
    },
    adress: {
        street: { type: String, required: true },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
        cep: { type: String, required: true },
        state: { type: String, required: true },
        number: { type: String, required: true },
    },
    telephone1: { type: String, required: true },
    telephone2: { type: String },
    cellphoneNumber: { type: String, required: true, unique: true },
    contactInfo: { type: String },
    email: { type: String, required: true, unique: true },
    rg: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    hasCar: { type: Boolean, required: true },
    hasDriversLicence: { type: Boolean, required: true },
})

module.exports = mongoose.model('Candidate', cadidateSchema)