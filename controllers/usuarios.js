const { request, reponse } = require("express")
const pool = require("../db/connection");
//http://localhost:4000/api/v1/usuarios
const getUsers = async (req = request, res = response) => {
    let conn;

    try {
        conn = await pool.getConnection() // Realizamos la conexion

        // Generamos las consultas

        const users = await pool.query("SELECT * FROM Usuarios", (error) => { if (error)throw error})

        if (users.length===0){ //En caso de no haber registros lo informamos
            res. status(404).json({msg:"No existe Usuarios registrados"})
            return
        }
    
        res.json({users}) // Se manda la lista de usuarios
    }

    catch (error) {
    console.log(error)
    res.status(500).json({msg: error}) //Informamos el error
    } 
    finally {
        if (conn) conn.end() // Termina la conexion
    }
}
    //console.log("Funcion getUsers")
    //res.json(msg: "Funcion getUsers"})
//}
const getUserByID = async (req = request, res = response) => {
    const {id} = req.params
    let conn;

    try {
        conn = await pool.getConnection() // Realizamos la conexion

        // Generamos las consultas

        const [user] = await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id}`, (error) =>  { if (error) throw error})

       
        if (!user){ //En caso de no haber registrado lo informamos
        res.status(404).json({msg:`No existe Usuarios registrados con el ID ${id}`})
        return
    }
    res.json({user})// Se manda la lista de usuarios

        }
    catch (error) {
      console.log(error)
      res.status(500).json({msg: error}) //Informamos el error
    } finally {
      if (conn) conn.end() // Termina la conexion
    }
    }
    
    const deletUsersByID = async (req = request, res = response) => {
        const {id} = req.params
        let conn;
    
        try {
            conn = await pool.getConnection() // Realizamos la conexion
    
            // Generamos las consultas
    
            const result = await conn.query(`UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id} ` ,(error) =>  { if (error) throw error})
    
           
        if (result.affectedRows ===0){ //En caso de no haber registrado lo informamos
            res.status(404).json({msg:`No existe Usuarios registrados con el ID ${id}`})
            return
        }
        res.json({msg: `Se elimino satisfactoriamente el usuario`}) //Se manda la lista de usuarios
    }
    
        catch (error) {
          console.log(error)
          res.status(500).json({msg: error}) //Informamos el error
        } finally {
          if (conn) conn.end() // Termina la conexion
        
        }
    }
        const adduser = async (req = request, res = response) =>{
            const {Nombre,
                   Apellidos,
                   Edad,
                   Genero,
                   Usuario,
                   Contrasena,
                   Fecha_Nacimiento,
                   Activo} = req.body

            if(!Nombre||
               !Apellidos||
               !Edad||
               !Genero||
               !Usuario||
               !Contrasena||
               !Activo)
        {
            res.status(400).json({msg:"Faltan Datos"})
            return
        }
        let conn;

        try{
            conn = await pool.getConnection() //Realizamos la conexion

            //Generamos la consulta
            const result = await conn.query(`INSERT INTO Usuarios(
                Nombre, 
                Apellidos,
                Edad,
                Genero,
                Usuario,
                Contrasena,
                Fecha_Nacimiento,
                Activo)
            VALUES(
                '${Nombre}',
                '${Apellidos}',
                '${Edad}',
                '${Genero}',
                '${Usuario}',
                '${Contrasena}',
                '${Fecha_Nacimiento}',
                '${Activo}'
            )
            `, (error) => {if (error) throw error})

        if (result.affectedRows ===0){ //En caso de no haber registro lo informamos
            res.status(400).json({msg: `No se pudo agregar el usuario`})
            return 
        }
        res.json({msg: `Se agrega satisfactoriamente el usuario`}) //Se manda la lista de usuarios
        }
        catch(error){
            console.log(error)
            res.status(500).json({msg:error}) //Informamos el error 
        }
        finally{
            if(conn) conn.end() //Termina la conexion
        }
        }
module.exports = {getUsers, getUserByID, adduser, deletUsersByID}