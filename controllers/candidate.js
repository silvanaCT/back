const Candidate = require('../models/candidate')

exports.registerCandidate = async (req, res) => {
    try {
        console.log('Request body: \n', req.body)
        const { isValid, errorList } = isDataValid(req.body)

        if (!isValid) {
            console.log('Error list: ', errorList)
            return res.json({ error: 'Invalid input', errorList })
        }

        const candidate = new Candidate({ ...req.body })
   
        await candidate.save()
        
        console.log('cadastro realizado com sucesso!')

        return res.send(`Candidato registrado!`)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const isDataValid = ({
    fullName,
    birthDate,
    sex,
    civilState,
    adress: {
        street,
        neighborhood,
        city,
        cep,
        state,
        number,
    },
    telephone1,
    telephone2,
    cellphoneNumber,
    contactInfo,
    email,
    rg,
    cpf,
    hasCar,
    hasDriversLicence,
}) => {
    const errorList = []

    if ((typeof fullName !== 'string') || (fullName.split(' ').length < 2)) errorList.push({ message: `Invalid name: ${fullName}` })
    if (typeof birthDate !== 'string') errorList.push({ message: `Invalid birthDate: ${birthDate}` })
    if ((sex !== 'm') && (sex !== 'f') && (sex !== 'nao informado')) errorList.push({ message: `Invalid sex: ${sex}` })
    if (typeof civilState !== 'string') errorList.push({ message: `Invalid civilState: ${civilState}` })
    if (typeof street !== 'string') errorList.push({ message: `Invalid street: ${street}` })
    if (typeof neighborhood !== 'string') errorList.push({ message: `Invalid neighborhood: ${neighborhood}` })
    if (typeof city !== 'string') errorList.push({ message: `Invalid city: ${city}` })
    if (typeof cep !== 'string') errorList.push({ message: `Invalid cep: ${cep}` })
    if (typeof state !== 'string') errorList.push({ message: `Invalid state: ${state}` })
    if (typeof number !== 'string') errorList.push({ message: `Invalid number: ${number}` })
    if ((typeof telephone1 !== 'string') || (telephone1.length > 10)) errorList.push({ message: `Invalid telephone1: ${telephone1}` })
    if (telephone2 && ((typeof telephone2 !== 'string') || (telephone2 > 10))) errorList.push({ message: `Invalid telephone2: ${telephone2}` })
    if (typeof cellphoneNumber !== 'string' && cellphoneNumber < 10) errorList.push({ message: `Invalid cellphoneNumber ${cellphoneNumber}` })
    if (contactInfo && (typeof contactInfo !== 'string')) errorList.push({ message: `Invalid contactInfo: ${contactInfo}` })
    if (typeof email !== 'string') errorList.push({ message: `Invalid email: ${email}` })
    if ((typeof rg !== 'string') || rg.length > 12 || rg.length < 7) errorList.push({ message: `Invalid rg: ${rg}` })
    if ((typeof cpf !== 'string') || cpf.length !== 11) errorList.push({ message: `Invalid cpf: ${cpf}` })
    if (typeof hasCar !== 'boolean') errorList.push({ message: `Invalid hasCar: ${hasCar}` })
    if (typeof hasDriversLicence !== 'boolean') errorList.push({ message: `Invalid hasDriversLicence: ${hasDriversLicence}` })
    
    return {
        isValid: !errorList.length ? true : false,
        errorList
    }
}