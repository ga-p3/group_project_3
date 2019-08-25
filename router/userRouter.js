const express = require('express')
const userRouter = express.Router()
const { passport } = require('../auth/auth')

userRouter.get('/:user_id', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const findUser = await User.findAndCountAll(
            {
                where: {
                    id: id
                },
                include: [
                    {
                        model: Folder,
                        as: 'folders'
                    }
                ]
            })
        res.json({ user: req.user, message: 'userrouter here' })
    }
)

module.exports = userRouter