const {Router} = require("express")
const {getUsers, getUserByID, adduser, deletUsersByID, updateUserByUsuario} = require("../controllers/usuarios")
const router = Router()

//http://localhost:4000/api/v1/users
//http://localhost:4000/api/v1/usuarios/id/

///GET///
router.get("/", getUsers)
router.get("/id/:id", getUserByID)

///POST///
router.post("/", adduser)

///PUT//
router.put("/", updateUserByUsuario)


///DELETE///
router.delete("/id/:id", deletUsersByID)
module.exports = router