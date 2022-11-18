const{Router} = require("express")
const {getperson, addArtist, getArtistByID, deleteArtisByID} = require("../controllers/Artistas")
const router = Router()

//http://localhost:4000/api/v1/users/

//GET
router.get("/", getperson)

//POST
router.post("/", addArtist)

//GET
router.get("/id/:id", getArtistByID)

//DELETE
router.delete("/id/:id", deleteArtisByID)

module.exports = router