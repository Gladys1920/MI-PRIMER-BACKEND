const modelsPersonajes = {
    queryGetperson: "SELECT * FROM Personajes",
    queryGetUsersByID:`SELECT * FROM Usuarios WHERE ID = ?`,
    queryDeleteUsersByID: `UPDATE Usuarios SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = '?'`,
    queryAddUser:
    `INSERT INTO Usuarios(
                            Nombre,
                            Nombre_Artistico 
                            Genero, 
                            Enfoque_Artistico  
                            Activo)
                        VALUES (
                            ?,?,?,?,?,?,?,?)`,
    querySignIn: `SELECT  Activo FROM Usuarios WHERE Usuario = ?`
    }
    
    module.exports = modelsPersonajes