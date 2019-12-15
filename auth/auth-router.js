const router = require('express').Router();
const Userdb = require('../users/users-model')
const bcrypt = require('bcrypt')




router.post('/register', (req, res) => {

    const user = req.body

    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    if(user.username && user.password){
      Userdb.add(user)
        .then(user => {
          res.status(201).json(user)
        })
        .catch(err => {
          res.status(400).json(err)
        })

    } else {
      console.log('not correct')
    }

});






router.post('/login', (req, res) => {
  let {username, passsword} = req.body

  Userdb.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.hashSync(user.password, 10)) {
        const genToken(token)



      }
    }


      
    )
});




function genToken() {
  
}



module.exports = router;
