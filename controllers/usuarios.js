const { request, reponse } = require("express")
const pool = require("../db/connection");

const getUsers = async (req = request, res = response) => {
    let conn;

    try {
        conn = await pool.getConnection() // Realizamos la conexion

        // Generamos las consultas

        const users = await pool.query("SELECT * FROM Usuarios", (error) => { if (error)throw error})

        if (!users) { //En caso de no haber registros lo informamos
            res. status(404).json({msg:"No existe Usuarios registrados"})
            return
        }
    console.log(users)
    res.json({usuarios: users})// Se manda la lista de usuarios
    }

    catch (error) {
    console.log(error)
    res.status(500).json({msg: error}) //Informamos el error
    } finally {
    if (conn) conn.end() // Termina la conexion
    }
}

const getUserByID = async (req = request, res = response) => {
    const {id} = req.params
    let conn;

    try {
        conn = await pool.getConnection() // Realizamos la conexion

        // Generamos las consultas

        const users = await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id} ` ,(error) =>  { if (error) throw error})

        console.log(users)

        if (!users) { //En caso de no haber registros lo informamos
            res.status(404).json({msg:`No existe Usuarios registrados con el ID ${id}`})
            return
        }
    
    res.json({users})// Se manda la lista de usuarios
    }


    catch (error) {
      console.log(error)
      res.status(500).json({msg: error}) //Informamos el error
    } finally {
      if (conn) conn.end() // Termina la conexion
    }
}


module.exports = {getUsers, getUserByID}