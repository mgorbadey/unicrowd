module.exports = class UserDto {
  email
  id
  role
  isActivated
  userPic

  constructor(model) {
    this.email = model.email
    this.username = model.username
    this.id = model.id
    this.role = model.role
    this.isActivated = model.isActivated
    this.userPic = model.userPic
  }
}
