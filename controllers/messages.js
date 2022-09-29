const { response } = require("express")

const rootMessage = (req = request, res = response) => {
    //http://localhost:4000/api/v1/messages?nombre=Gladys&apellido_paterno=Miguel
    const {nombre, apellido_paterno = ""} = req.query
    //console.log(nombre)
    if (!nombre) {
        res.status(400).json({msg: "Falta indicar el nombre"})
    return
    }
    if (!apellido_paterno) {
        res.status(400).json-({
            msg: "Falta indicar el apellido paterno"
        })
        return
 }
 res.status(200).json({msg: ' Mi nombre es ' + nombre + ' ' + apellido_paterno}) 
}
//http://localhost:4000/api/v1/messages/hi/Gladys/20
const hiMessage = (req = resquest, res= response)  => {
    const {name, edad} = req.params
    res.status(300).json({msg:' Hola ' + name + ' ' + edad})

}

const byeMessage = (req = resquest, res= response) =>{
    res.status(500).json({msg:'Adios Mundo'})
}

const postMessage =(req = resquest, res= response) => {
    res.status(209).json({msg:'Mensaje post'})
}

const putMessage =(req = resquest, res= response) => {
    res.status(105).json({msg:'Mensaje PUT'})
}

const deleteMessage =(req = resquest, res= response) => {
    res.status(401).json({msg:'Mensaje DELETE'})
}

module.exports = {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage}