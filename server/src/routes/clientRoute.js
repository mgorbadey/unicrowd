const { Router } = require('express')
const router = Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { eventPositionInCal } = require('../lib/calendarFormating')
const moment = require('moment');
const mailService = require('../service/mail-service')

router.get('/:id/profile', async (req, res) => {
    const { id } = req.params

    const { username, email, info, userPic, city, role } = await prisma.user.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            city: true,
        },
    })

    res.json({ username, email, info, userPic, city, role })
})

router.get('/:id/events', async (req, res) => {
    const { id } = req.params

    // const event = await prisma.event.findMany({
    //     where: {
    //         clientId: Number(id),
    //     },
    //     include: {
    //         serviceItem: true,
    //         user: true,
    //     }
    // })

    res.json([{ startDateTime: Date.now(), masterId: '3', status: 'Не подвержден', serviceItemId: 'Маникюр', masterName: 'Кеча' }])
})

router.get('/cityInfo', async (req, res) => {
    const city = await prisma.city.findMany()
    res.send({ city })
})

router.get('/categoryInfo', async (req, res) => {
    const category = await prisma.serviceCategory.findMany()
    res.send({ category })
})

router.get('/:id/events', async (req, res) => {
    const { id } = req.params

    const events = await prisma.serviceItem.findMany({
        where: {
            masterId: Number(id)
        },
        include: {
            serviceCategory: true
        }
    })

    res.json({ events })
})

router.get('/:id/eventInfo', async (req, res) => {
    const { id } = req.params

    const event = await prisma.event.findMany({
        where: {
            clientId: Number(id)
        },
        include: {
            serviceItem: {
                include: {
                    master: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        },
    })

    res.json({ event })
})

router.post('/cityUpdate', async (req, res) => {
    let { id, city } = req.body

    if (city === null) {
        city = '1'
    }

    const updateUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            cityId: Number(city)
        },
    })

    res.json({ info: req.body })
})

router.post('/modalTextUpdate', async (req, res) => {
    const { id, textarea } = req.body

    const updateUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            info: textarea
        },
    })

    res.json({ info: req.body })
})

router.post('/deleteItem', async (req, res) => {
    const { itemId } = req.body

    console.log(req.body)

    const item = await prisma.serviceItem.delete({
        where: {
            id: Number(itemId)
        }
    })

    res.json({ item })
})

router.post('/event/schedule', async (req, res) => {
    const { masterId, clientId, serviceItemId, startDateTime, startDateForFilter } = req.body

    const event = await prisma.event.create({
        data: {
            startDateTime,
            startDateForFilter,
            masterId: Number(masterId),
            clientId: Number(clientId),
            serviceItemId: Number(serviceItemId),
            status: 'new'
        }
    })
    const item = await prisma.serviceItem.findMany({ where: { id: event.serviceItemId } })[0]
    const formatData = eventPositionInCal([event])

    //отправка письма-уведомления мастеру о новой записи
    const master = await prisma.user.findMany({ where: { id: Number(masterId) } })
    const client = await prisma.user.findMany({ where: { id: Number(clientId) } })
    const serviceItem = await prisma.serviceItem.findMany({ where: { id: Number(serviceItemId) } })
    await mailService.sendNotificationMail(master[0].email, client[0].username, serviceItem[0].title, moment(startDateTime).format("YYYY-MM-DD HH:mm"))
    
    res.json()
})

module.exports = router