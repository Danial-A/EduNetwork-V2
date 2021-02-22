const router = require('express').Router()
const postController = require('../controllers/postController')
const tokenValidation = require('../validation/tokenValidation')

//Get all posts 
router.get('/', postController.get_all)

//Delete all posts
router.post('/nuke', postController.nuke)

//Add new post
router.post('/add', postController.add_post)

//Post Like and Unlike
router.post("/:id/like", postController.like_unlike)

//Add comment to post
router.post("/:id/comment", postController.post_comment)
//Delete Comment
router.post('/:id/comment/delete', postController.delete_comment)
//update/edit comment
router.post('/:id/comment/update', postController.update_comment)

//Find user posts
router.post('/user/posts', postController.user_posts)
module.exports = router