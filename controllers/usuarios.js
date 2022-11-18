const { request, response } = require("express")
const bcryptjs = require ("bcryptjs")
const pool = require("../db/connection");
const modelUsuarios= require("../models /usuarios");
const { queryUserExists } = require("../models /usuarios");
//http://localhost:4000/api/v1/usuarios
const getUsers = async (req = request, res = response) => {
    let conn;

    try {
        conn = await pool.getConnection() // Realizamos la conexion

        // Generamos las consultas

        const users = await conn.query(modelUsuarios.queryGetUsers,(error) => { if (error)throw error})

        if (users.length===0){ //En caso de no haber registros lo informamos
            res. status(404).json({msg:"No existe Usuarios registrados"})
            return
        }
    
        res.json({users}) // Se manda la lista de usuarios
    } catch (error) {
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
    const {id} = req.params //URI Params
    let conn;

    try {
        conn = await pool.getConnection() // Realizamos la conexion

        // Generamos las consultas

        const users = await conn.query(modelUsuarios.queryGetUserByID, [id],(error) =>  { if (error) throw error})

        console.log(user)

        if (users.length === 0){ //En caso de no haber registrado lo informamos
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
    
    const deletUsersByID = async (req = request, res = response) => {
        const {id} = req.params
        let conn;
    
        try {
            conn = await pool.getConnection() // Realizamos la conexion
    
            // Generamos las consultas
    
            const result = await conn.query(modelUsuarios.queryDeleteUserByID, [id], (error) =>  { if (error) throw error})
            console.log(result.affectedRows)
           
            if (result.affectedRows ===0){ //En caso de no haber registrado lo informamos
            res.status(404).json({msg:`No existe Usuarios registrados con el ID ${id}`})
            return
        }

        res.json({msg: `Se elimino satisfactoriamente el usuario con ID ${id}`}) //Se manda la lista de usuarios
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
                   Genero = '',
                   Usuario,
                   Contrasena,
                   Fecha_Nacimiento = "2000-11-12",
                   Activo
                } = req.body //URI Params 

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

        const salt = bcryptjs.genSaltSync()
        const ContrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)

        let conn;

        // Validar que no exista el usuario

        try{
            conn = await pool.getConnection() //Realizamos la conexion
            
           const [userExist]= await conn.query(modelUsuario.queryUserExists, [Usuario])

            if (userExist){
                res.status(400).json({msg: `El usuario ${Usuario} ya se encuentra registrado.`})
                return 
            }
            //Generamos la consulta
            const result = await conn.query(modelUsuario.queryAddUser, [
                Nombre, 
                Apellidos,
                Edad,
                Genero || '',
                Usuario,
                ContrasenaCifrada,
                Fecha_Nacimiento,
                Activo
            ], (error)  => { if (error) throw error})
            
            console.log(result.affectedRows)  

        if (result.affectedRows === 0) { //En caso de no haber registro lo informamos
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

        const updateUserByUsuario = async (req =request, res = response) =>{
            const {
                Nombre,
                Apellidos, 
                Edad, 
                Genero, 
                Usuario,
                Fecha_Nacimiento = '1900-01-01',
            } = req.body //URI Params

            if (
                !Nombre||
                !Apellidos||
                !Edad||
                !Usuario
            ) {
                res.status(400).json({msg: "Faltan datos"})
                return
            }
      

            let conn;

         //Validar que no existe el usuario

         try{
            conn = await pool.getConnection() //Realizamos la conexion

            const [userExists] = await conn.query(queryUserExists, [Usuario])

            if (!userExits) {
                res.status(400).json({msg:` El usuario ${Usuario} no se encuentra resgistrado.`})
                return 
            }
            //Generamos la consulta
            const result = await conn.query(`UPDATE Usuarios SET
                Nombre ='${Nombre}',
                Apellidos ='${Apellidos}',
                Edad =${Edad},
                ${Genero ? `Genero = '${Genero}',`:''}
                Fecha_Nacimiento ='${Fecha_Nacimiento}'
            WHERE
                Usuario = '${Usuario}'
                `,(error)=> { if (error) throw error})
            
            

        if (result.affectedRows ===0){ //En caso de no haber registro lo informamos
            res.status(400).json({msg: `No se pudo actualizar el usuario`})
            return 
        }
        res.json({msg: `Se actualizo satisfactoriamente el usuario`}) //Se manda la lista de usuarios
        }
        catch(error){
            console.log(error)
            res.status(500).json({msg:error}) //Informamos el error 
        }
        finally{
            if(conn) conn.end() //Termina la conexion
        }
        
    }

    const signIn = async (req = request, res = response) => {
        const {Usuario, Contrasena} = req.body //URI Params

        if (!Usuario || !Contrasena){
            res.status(400).json({msg: "Faltan datos"})
            return 
        }
        
        let conn;
    
        try {
            conn = await pool.getConnection() // Realizamos la conexion
    
            // Generamos las consultas
    
            const [user] = await conn.query(modelUsuarios.querySignin, [Usuario], (error) => { if (error) throw error })
            
        if (!user || user.Activo === 'N'){
            res.status(403).json({msg: "El usuario o contrasena que se ingreso no son validos"})
            return
        }
        
        const contrasenaValida = bcryptjs.compareSync(Contrasena, user.Contrasena)

        if (!contrasenaValida){
        res.status(403).json({msg:"El usuario o contrasena que se ingreso no son validos"}) 
        return 
    }

    res.json({msg: `El usuario se ha autenticado corectamente`})//Se manda la lista de usuarios
}
        catch (error) {
          console.log(error)
          res.status(500).json({msg: error}) //Informamos el error
        } 
        finally {
          if (conn) conn.end() // Termina la conexion
        }
    }


module.exports = {getUsers, getUserByID, adduser, deletUsersByID, updateUserByUsuario, signIn}