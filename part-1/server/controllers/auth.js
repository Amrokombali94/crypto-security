const bcrypt = require('bcryptjs')
const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      const salt = bcrypt.genSaltSync(5)
      let loggedUser={}
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && user[i].passwordHash === password) {
          const existing = bcrypt.compareSync(password, users[i].passwordHash)
          if(existing){
             loggedUser = {...users[i]}

          }
          delete loggedUser.password
          res.status(200).send(loggedUser)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { username, email, firstName, lastName, password } = req.body

      for(let i=0; i < users.length; i++){
        const existing = bcrypt.compareSync(password, users[i].passwordHash)
        if(existing) {
          users[i].firstName=firstName
          users[i].lastName=lastName
          users[i].email=email
          users[i].username=username
          let returnUsers = {...users[i]}
          delete returnUsers.passwordHash
          res.status(200).send(returnUsers)
          return
        }
      }

      const salt = bcrypt.genSaltSync(5)

      const passwordHash =bcrypt.hashSync(password, salt)
      console.log(passwordHash)
      
      let user = {
        passwordHash,
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username
      }

      users.push(user)

      // let returnUsers = {...users}
      // console.log(returnUsers)

      delete user.passwordHash

      res.status(200).send(user)

        // console.log('Registering User')
        // console.log(req.body)
        // users.push(req.body)
        // res.status(200).send(req.body)
    }
}