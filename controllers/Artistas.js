const{reques, response, request} = require("express")
const pool = require("../db/connection")
const bcryptjs =require("bcryptjs")

const getperson = async (req = reques, res = response) => {
    let conn;
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const person= await conn.query("SELECT * FROM Personajes", (error) => {if (error) throw error})

        if(!person){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen Personajes registrados"})
            return
        }
        res.json({person})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const addArtist = async (req = request, res = response) => {
    const {Nombre, Nombre_Artistico, Genero, Enfoque_Artistico, Activo} = req.body//URI params

    if(!Nombre || !Nombre_Artistico || !Genero || !Enfoque_Artistico || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    const salt = bcryptjs.genSaltSync()
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [FamosoExist] = await conn.query(`SELECT Nombre FROM Personajes WHERE Nombre = '?'`, [Nombre])
        
        if(FamosoExist){
            res.status(400).json({msg: `El Famoso '${Nombre}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(`INSERT INTO Personajes
                    (Nombre,
                    Nombre_Artistico,  
                    Genero, 
                    Enfoque_Artistico , 
                    Activo) VALUES ('${Nombre}', 
                         '${Nombre_Artistico}', '${Genero}', '${Enfoque_Artistico }',
                         '${Activo}')`, (error) => {if(error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el Personaje `})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el Personaje `})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const getArtistByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const Personajes = await conn.query(`SELECT * FROM Personajes WHERE ID = ?`, [id] , (error) => {if (error) throw error})
        console.log(Personajes)

        if(!Personajes) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen Personajes registrados con el ID ${id}`})
            return
        }
        res.json({Personajes})
    }catch (error){
 
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

const deleteArtisByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(`UPDATE Personajes SET Activo = 'N' WHERE ID = ${id}`, (error) => {if (error) throw error})

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existe Personajes registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el Personaje con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

module.exports = {getperson, addArtist, getArtistByID, deleteArtisByID}

