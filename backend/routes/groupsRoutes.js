const router = require('express').Router()
const GroupController = require('../controllers/groupPostController')
//create new
router.post('/create', GroupController.create_group)
//get All groups
router.get('/', GroupController.get_all_groups)

//New group post
router.post('/:id/posts/create', GroupController.create_group_post)

//Get All group posts
router.post('/:id/posts', GroupController.get_group_posts)

//Add admins
router.post('/:id/admins/add', GroupController.add_admins)

//Remove admin
router.post('/:id/admins/remove', GroupController.remove_admin)

//Add group members
router.post('/:id/members/add', GroupController.add_members)

//Remove members
router.post('/:id/members/remove', GroupController.remove_member)

module.exports = router