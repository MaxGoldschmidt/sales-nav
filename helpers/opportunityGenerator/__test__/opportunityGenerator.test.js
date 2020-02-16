const { generateOpportunities } = require('../opportunityGenerator');
const COMPANIES = require('../../../data/companies.json');
const SALES_REPS = require('../../../data/sales-reps.json');

describe('Opportunity Generator', () => {
  it('returns an array of opportunities, in which an opportunity includes a company and matching sales representative', async () => {
    const opportunities = generateOpportunities(COMPANIES, SALES_REPS);
    const opportunity = opportunities[0];
    expect('representative' in opportunity).toBe(true);
    expect('company' in opportunity).toBe(true);
  });

  it('does not assign the same sales rep twice', async () => {
    const opportunities = generateOpportunities(COMPANIES, SALES_REPS);
    const seen = new Set();
    const hasDuplicates = opportunities.some(
      (opportunity) => seen.size === seen.add(opportunity.representative.email).size,
    );
    expect(hasDuplicates).toBe(false);
  });

  it('does not include duplicate companies', async () => {
    const opportunities = generateOpportunities(COMPANIES, SALES_REPS);
    const seen = new Set();
    const hasDuplicates = opportunities.some(
      (opportunity) => seen.size === seen.add(opportunity.company.name).size,
    );
    expect(hasDuplicates).toBe(false);
  });
});
