const DateTimeScalarType = require("../../shared/DateTimeScalarType");

const userResolvers = {
  DateTime: DateTimeScalarType,
  Query: {
    users: (_, args, { dataSources }) => dataSources.usersAPI.getUsers(args),
    user: (_, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id),
  },
  Mutation: {
    addUser: async (_, { user }, { dataSources }) =>
      dataSources.usersAPI.addUser(user),

    updateUser: async (_, updatedUser, { dataSources }) =>
      dataSources.usersAPI.updateUser(updatedUser),

    deleteUser: async (_, { id }, { dataSources }) =>
      dataSources.usersAPI.deleteUser(id),
  },
  User: {
    enrollments: (parent, _, { dataSources }) =>
      dataSources.enrollmentsAPI.getAllByStudent.load(parent.id),
    role: (parent, _, { dataSources }) =>
      dataSources.rolesAPI.getRoleById(parent.role),
  },
};

module.exports = userResolvers;
