const { Router } = require('express')
const { PrismaClient } = require('@prisma/client')
const fileMiddleware = require('../middlewares/file')

const prisma = new PrismaClient()
const router = Router()

router.post('/upload', fileMiddleware.single('avatar') , async (req, res) => {
    try {
        if(req.file) {
            const { id } = req.body

            const updateUser = await prisma.user.update({
                where: {
                  id: Number(id),
                },
                data: {
                    userPic: req.file.path,
                },
              })

              res.json(req.file)
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router