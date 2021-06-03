const roleSchema = require("./schema/role.graphql");
const roleResolvers = require("./resolvers/roleResolvers");
const RolesAPI = require("./datasource/role");

module.exports = {
  roleSchema,
  roleResolvers,
  RolesAPI,
};
