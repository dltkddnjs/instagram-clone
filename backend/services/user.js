const { User } = require('../models')
const regex = require('../utils/regex')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
const { decryptAES256, encryptSHA256 } = require('../utils/encryption')
const commonService = require('../services/common')

const createUser = async (body) => {
  return await User.create(body)
}

const findUser = async (email, password) => {
  return await User.findOne({ where: { email: email, password: password } })
}

const checkEmail = async (email) => {
  let isValidEmail = await !regex.isValidEmail(email)
  if (isValidEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, '이메일 형식이 맞지 않습니다. 다시 입력해 주세요.')
  }

  let emailCount = await User.count({ where: { email: `${email}` } })
  if (emailCount > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, '이미 등록된 이메일입니다. 다시 입력해 주세요.')
  }
}

const checkUsername = async (username) => {
  let usernameCount = await User.count({ where: { username: `${username}` } })
  if (usernameCount > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, '이미 등록된 닉네임입니다. 다시 입력해 주세요.')
  }
}

const checkPassword = async (password) => {
  let isValidPassword = await !regex.isValidPassword(password)
  if (isValidPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      '유효하지 않은 패스워드입니다. 다시 입력해 주세요. (길이 최소 8자 이상 15자 이하, 대문자, 소문자, 숫자, 특수문자(@,$,!,%,*,?,&) 각각 1개 이상 필수 입력)'
    )
  }
}

const changePassword = async (email, oldPassword, newPassword) => {
  await commonService.checkValueIsEmpty(oldPassword, '기존 패스워드')
  await commonService.checkValueIsEmpty(newPassword, '새 패스워드')

  let decryptOldPassword = decryptAES256(oldPassword)
  let encryptOldPassword = encryptSHA256(decryptOldPassword)
  let decryptNewPassword = decryptAES256(newPassword)
  let encryptNewPassword = encryptSHA256(decryptNewPassword)
  let user = await findUser(email, encryptOldPassword)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, '기존 패스워드가 정확하지 않습니다. 다시 입력해주세요.')
  }

  await checkPassword(decryptNewPassword)
  if (oldPassword == newPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, '새 패스워드가 기존과 동일합니다. 다시 입력해 주세요.')
  }

  User.update({ password: encryptNewPassword, updatedAt: new Date() }, { where: { email: email, password: encryptOldPassword } })
}

module.exports = {
  createUser,
  findUser,
  checkEmail,
  checkUsername,
  checkPassword,
  changePassword,
}
