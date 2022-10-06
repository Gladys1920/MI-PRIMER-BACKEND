const express = require('express')
const messagesRouter = require('./routes/messages')
const cors = require('cors')

class server{
    constructor () {
        this.app = express ()
        this.port = process.env.PORT
        this.paths = {
            messages: "/api/v1/messages"
            
        }
        this.middlewares()
        this.routes()
    }

    routes(){
//    this.app.get('/', (req, res) => {
//        res.send('Mensaje recibido')
//    }) // End Point
      this.app.use(this.paths.messages,messagesRouter)
}

middlewares(){
    this.app.use(cors())//habilita origen cruzado//
    this.app.use(express.json())
}

listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto 4000', this.port)
        }) 
        
    }
}

module.exports = server
