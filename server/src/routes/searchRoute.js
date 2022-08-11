const router = require('express').Router()
const { getDataForSearch } = require('../controllers/searchController')

router.get('/', getDataForSearch)

// router.post('/', async (req, res) => {
//   const { name } = req.body
//   const masters = await prisma.user.findMany({
//     where: { role: 'master' },
//   })
// })

module.exports = router
