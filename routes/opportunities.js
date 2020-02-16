const express = require('express');
const COMPANIES = require('../data/companies.json');
const SALES_REPS = require('../data/sales-reps.json');
const { generateOpportunities } = require('../helpers/opportunityGenerator/opportunityGenerator');

const router = express.Router();

/* GET opportunities. */
router.get('/', (req, res) => {
  const opportunities = generateOpportunities(COMPANIES, SALES_REPS);
  res.status(200).json(opportunities);
});

module.exports = router;
