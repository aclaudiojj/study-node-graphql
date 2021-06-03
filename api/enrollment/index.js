const enrollmentSchema = require("./schema/enrollment.graphql");
const enrollmentResolvers = require("./resolvers/enrollmentResolvers");
const EnrollmentsAPI = require("./datasource/enrollment");

module.exports = {
  enrollmentSchema,
  enrollmentResolvers,
  EnrollmentsAPI,
};
