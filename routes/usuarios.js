const {Router} = require("express")
const {getUsers, getUserByID, adduser, deletUsersByID, updateUserByUsuario, signIn} = require("../controllers/usuarios")
const router = Router()

//http://localhost:4000/api/v1/users
//http://localhost:4000/api/v1/usuarios/id/

///GET///
router.get("/", getUsers)
router.get("/id/:id", getUserByID)

///POST///
router.post("/", adduser)
router.post("/singing", signIn)


///PUT//
router.put("/", updateUserByUsuario)

|
///DELETE///
router.delete("/id/:id", deletUsersByID)
module.exports = router