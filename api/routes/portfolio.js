const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const PortfolioController = require("../controllers/portfolio");

router.get("/", checkAuth, PortfolioController.portfolio_get_all);

router.get(
  "/:portfolioId",
  checkAuth,
  PortfolioController.portfolio_get_portfolio
);

router.post("/", checkAuth, PortfolioController.portfolio_create_portfolio);

router.delete(
  "/:portfolioId",
  checkAuth,
  PortfolioController.portfolio_delete_portfolio
);

module.exports = router;
