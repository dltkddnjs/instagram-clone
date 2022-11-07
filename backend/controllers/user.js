const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const userService = require('../services/user')
const authService = require('../services/auth')
const commonService = require('../services/common')

const checkEmail = catchAsync(async (req, res) => {
  await commonService.checkValueIsEmpty(req.body.email, '이메일')
  await userService.checkEmail(req.body.email)
  res.status(httpStatus.OK).send({ code: 0, message: 'success' })
})

const checkUsername = catchAsync(async (req, res) => {
  await commonService.checkValueIsEmpty(req.body.username, '닉네임')
  await userService.checkUsername(req.body.username)
  res.status(httpStatus.OK).send({ code: 0, message: 'success' })
})

const changePassword = catchAsync(async (req, res) => {
  let token = req.headers['authorization']

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, '토큰 값이 유효하지 않습니다. 다시 로그인을 해주세요.')
  }

  let payload = await authService.verifyToken(token)
  if (!payload) {
    throw new ApiError(httpStatus.UNAUTHORIZED, '토큰 값이 유효하지 않습니다. 다시 로그인을 해주세요.')
  }

  await userService.changePassword(payload.email, req.body.oldPassword, req.body.newPassword)
  res.status(httpStatus.OK).send({ code: 0, message: 'success' })
})

module.exports = {
  checkEmail,
  checkUsername,
  changePassword,
}
