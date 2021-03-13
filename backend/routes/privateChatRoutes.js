const router = require('express').Router()
const privateChatController = require('../controllers/privateChatController')

//create new chat
router.post('/create',privateChatController.create_new_chat)

//get all rooms
router.get('/', privateChatController.get_all_chats)

module.exports = router