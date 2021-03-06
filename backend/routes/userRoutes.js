const router = require('express').Router();
const userController = require('../controllers/userController')


//Get all users
router.get('/',userController.get_all)

//Adding new user
router.post('/register', userController.add_new_user)

//User login registration
router.post('/login', userController.user_login)

//Adding/Removing follower follower
router.post("/follower/:id", userController.following_follower)

//delete all users
router.post('/nuke', userController.nuke)

//Find by username
router.get('/username', userController.search_by_username)

//Find user by id
router.get('/:id', userController._search_by_id)

//Delete user account
router.delete('/:id/delete', userController.delete_user_account)
//Get All followers
router.get('/:id/followers', userController.get_followers)
//Get All user following people
router.get('/:id/following',userController.get_following)
//Update user information
router.post('/:id/update', userController.update_user_information)
module.exports = router