const router = require('express').Router()
const roomController = require('../controllers/roomController')
//create new room
router.post('/create', roomController.create_room)

//get all rooms
router.get('/', roomController.get_all_rooms)

module.exports = router