

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const users = [
  {
    username: 'abderrahmane',
    password: 'abdo123'
  },
  {
    username: 'haberchid',
    password: 'haberchid123'
  }
]

app.get('/users', authenticateToken, (req, res) => {
  res.json(users.filter(user => user.username === req.user.name))
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000)