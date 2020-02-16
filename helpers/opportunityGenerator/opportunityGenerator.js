const { haversineDistance } = require('../haversineDistanceCalculator/haversineDistanceCalculator');

/*
  A class that can match a list of companies
  to their nearest sales rep, based on geo-location coordinates
*/


/**
 * @param {object} company
 * @param {object} salesRep
 */
const calculateCompanyRepDistance = (company, salesRep) => {
  const companyLocation = [company.LATITUDE, company.LONGITUDE];
  const salesRepLocation = salesRep.location.split(','); // in database salesRep.location = "36.137178, -79.442645"
  return haversineDistance(companyLocation, salesRepLocation);
};

/**
 * @param {object} company
 * @param {object[]} salesReps - The list of salesReps
 */
const findNearestSalesRep = (company, salesReps) => {
  const salesRepsWithDistance = salesReps.map((salesRep) => ({
    ...salesRep,
    distance: calculateCompanyRepDistance(company, salesRep),
  }));
  const repsSortedByDistance = salesRepsWithDistance.sort(
    (a, b) => a.distance - b.distance,
  );
  return repsSortedByDistance[0]; // only return closes sales rep
};

/**
 * returns array of opportunities. Each opportunity contains a Company and their matched sales rep
 * @param {object[]} companies - The list of companies
 * @param {object[]} salesReps - The list of salesReps
 */
const generateOpportunities = (companies, salesReps) => {
  const opportunities = [];
  let availableSalesReps = salesReps;

  companies.forEach((company) => {
    const nearestSalesRep = findNearestSalesRep(company, availableSalesReps);
    const { name, email, phone } = nearestSalesRep;
    opportunities.push({
      representative: {
        name,
        email,
        phone,
      },
      company: {
        name: company.NAME,
        address: company.ADDRESS,
        contact: {
          name: company.CONTACT.NAME,
          email: company.CONTACT.EMAIL,
          phone: company.CONTACT.PHONE,
        },
      },
    });
    // remove assigned rep from available salesRep array so that they won't be assigned twice.
    availableSalesReps = availableSalesReps.filter(
      (availableSalesRep) => availableSalesRep.email !== nearestSalesRep.email,
    );
  });

  return opportunities;
};

exports.generateOpportunities = generateOpportunities;
