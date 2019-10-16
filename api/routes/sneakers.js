const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const SneakersController = require("../controllers/sneakers");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", SneakersController.sneakers_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("sneakerImage"),
  SneakersController.sneakers_add_sneaker
);

router.get("/:sneakerId", SneakersController.sneakers_get_sneaker);

router.patch("/:sneakerId", checkAuth, SneakersController.sneaker_update);

router.delete("/:sneakerId", checkAuth, SneakersController.sneaker_delete);

module.exports = router;
