const { response } = require("express")

const rootMessage = (req = request, res = response) => {
    res.status(404).json({msg: 'Mesajes'}) 

}

const hiMessage = (req = resquest, res= response)  => {
    res.status(300).json({msg:'Hola Mundo'})

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