const router = require('express').Router();
const Userdb = require('../users/users-model')
const bcrypt = require('bcrypt')
const secrets = require('../secrets/secrets')
const jwt = require('jsonwebtoken')






router.post('/register', (req, res) => {

    const user = req.body
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

      Userdb.add(user)
        .then(user => {
          res.status(201).json(user)
        })
        .catch(err => {
          res.status(400).json(err)
        })

    }
)




router.post('/login', (req, res) => {
  let { username, password } = req.body

  Userdb.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user)
        res.status(200).json({token: token})
      } else {
        res.status(400).json({error: 'invalid'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});





function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  }

  const options = { expiresIn: '2h'}
  const token = jwt.sign(payload, secrets.jwtSecret, options)
  return token
}






module.exports = router;
