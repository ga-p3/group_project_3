const express = require('express')
const appRouter = express.Router()
const { passport } = require('../auth/auth')

appRouter.get('/:user_id', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
      try {
        const id = req.params.user_id
        const findUser = await User.findAndCountAll(
          {
            where: {
              id: id
            },
            include: [
              {
                model: Folder
              }
            ]
          })
        res.send(findUser)
      } catch (error) {
        throw error
      }
    res.json({ user: req.user, message: 'authenticated' })
  }
)

module.exports = appRouter