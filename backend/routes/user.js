const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { checkToken, convertFormDataToRequestBody, convertQueryToRequestBody, convertParamToRequestBody } = require('../middlewares')

router.route('/checkEmail').post(userController.checkEmail)
router.route('/checkUsername').post(userController.checkUsername)
router.route('/changePassword').post(userController.changePassword)
router.route('/followUser').post(checkToken, userController.followUser)
router.route('/followingList').get(checkToken, convertParamToRequestBody, convertQueryToRequestBody, userController.getFollowingList)
router.route('/followerList').get(checkToken, convertParamToRequestBody, convertQueryToRequestBody, userController.getFollowerList)
router.route('/profileImage').post(checkToken, convertFormDataToRequestBody, userController.saveProfileImage)
router.route('/profileImage').delete(checkToken, userController.deleteProfileImage)
router.route('/search').get(checkToken, convertQueryToRequestBody, userController.searchUsers)
router.route('/search/log').post(checkToken, userController.addUserSearchLog)
router.route('/search/log').delete(checkToken, userController.deleteUserSearchLog)
router.route('/search/log').get(checkToken, userController.getUserSearchLogs)

module.exports = router
