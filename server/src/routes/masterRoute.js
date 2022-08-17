const { Router } = require("express");
const router = Router();
const {
  getAllWorkingSlots,
  createWorkingSlot,
  getAllClientEvents,
  changeStatus,
  deleteEvent,
  deleteWorkingSlot,
  getAvailabilityStatus
} = require("../controllers/masterController");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/cityInfo", async (req, res) => {
  const city = await prisma.city.findMany();
  res.send({ city });
});

router.get("/categoryInfo", async (req, res) => {
  const category = await prisma.serviceCategory.findMany();
  res.send({ category });
});

router.post("/updateProfile", async (req, res) => {
  const { id, city, textarea } = req.body;

  const updateUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      info: textarea,
    },
  });

  res.json({ info: req.body });
});

router.post("/cityUpdate", async (req, res) => {
  let { id, city } = req.body;

  if (city === null) {
    city = "1";
  }

  const updateUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      cityId: Number(city),
    },
  });

  res.json({ info: req.body });
});

router.post("/modalTextUpdate", async (req, res) => {
  const { id, textarea } = req.body;

  const updateUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      info: textarea,
    },
  });

  res.json({ info: req.body });
});

router.post("/createItem", async (req, res) => {
  let { masterId, categoryId, title, duration, price } = req.body;

  if (categoryId === null) {
    categoryId = 1;
  }

  if (duration === "") {
    duration = 30;
  }

  if (title === "") {
    title = "Здесь должно было быть название вашей услуги";
  }

  const item = await prisma.serviceItem.create({
    data: {
      title,
      serviceCategoryId: Number(categoryId),
      duration: Number(duration),
      masterId: Number(masterId),
      price: Number(price),
    },
  });

  res.json({ item });
});

router.post("/updateItem", async (req, res) => {
  let { masterId, categoryId, title, duration, price, itemId } = req.body;

  if (categoryId === null) {
    categoryId = 1;
  }

  if (duration === "") {
    duration = 30;
  }

  if (title === "") {
    title = "Здесь должно было быть название вашей услуги";
  }

  const item = await prisma.serviceItem.update({
    where: {
      id: Number(itemId),
    },
    data: {
      title,
      serviceCategoryId: Number(categoryId),
      duration: Number(duration),
      masterId: Number(masterId),
      price: Number(price),
    },
  });

  res.json({ item });
});

router.post("/deleteItem", async (req, res) => {
  const { itemId } = req.body;

  const item = await prisma.serviceItem.delete({
    where: {
      id: Number(itemId),
    },
  });

  res.json({ item });
});

router
  .route("/:id/schedules/:id")
  .delete(deleteWorkingSlot)

router.get("/:id/profile", async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  // res.json({username: 'Иван Пупкин', email: 'ivan@gmail.com', info: 'Всем привет, делаю массаж простаты', userPic: 'images/2022-08-11T02:53:46.766Z-velomarshruty-v-moskve-4-2048.jpeg'})

  const { username, email, info, userPic, city, role } =
    await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        city: true,
      },
    });

  res.json({ username, email, info, userPic, city, role });
});

router.get("/:id/events", async (req, res) => {
  const { id } = req.params;

  const eventInfo = await prisma.event.findMany({
    where: {
      masterId: Number(id),
    },
    include: {
      serviceItem: true,
    },
  });

  res.json({ eventInfo });
});

router.get("/:id/serviceItemInfo", async (req, res) => {
  const { id } = req.params;

  const serviceItem = await prisma.serviceItem.findMany({
    where: {
      masterId: Number(id),
    },
    include: {
      serviceCategory: true,
    },
  });

  res.json({ serviceItem });
});


router
  .route("/:id/schedules/week")
  .get(getAllWorkingSlots)


router
  .route("/:id/schedules/:id/status")
  .get(getAvailabilityStatus)

router
  .route("/:id/events/week")
  .get(getAllClientEvents);

router
  .route("/:id/events/:id")
  .post(changeStatus)
  .delete(deleteEvent);

module.exports = router;
