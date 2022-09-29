const {Router} = require('express')
const router = Router()

const {
    rootMessage,
    hiMessage,
    byeMessage,
    postMessage,
    putMessage,
    deleteMessage,
}
     = require('../controllers/messages')
     //router.get("", () => {})
    router.get('/', rootMessage)//End Point
    router.get('/hi/:name/:edad', hiMessage)//End Point
    router.get('/bye', byeMessage)//End Point

    router.post('/', postMessage)//End Point
    router.put('/', putMessage)//End Point
    router.delete('/', deleteMessage)//End Point

    module.exports = router
