const classSchema = require("./schema/class.graphql");
const classResolvers = require("./resolvers/classResolvers");
const ClassesAPI = require("./datasource/class");

module.exports = {
  classSchema,
  classResolvers,
  ClassesAPI,
};
