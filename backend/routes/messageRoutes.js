const router = require('express').Router()
const messageController = require('../controllers/MessageController')
const { route } = require('./userRoutes')

router.get('/',messageController.get_all_messages)
router.post('/create',messageController.create_new_message)
//delete message
router.delete('/delete/:id', messageController.delete_message)

module.exports = router