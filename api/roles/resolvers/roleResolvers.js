const roleResolvers = {
  Query: {
    roles: (_, __, { dataSources }) => dataSources.rolesAPI.getRoles(),
    role: (_, { id }, { dataSources }) => dataSources.rolesAPI.getRoleById(id),
  },
  RoleTypes: {
    STUDENT: "ESTUDANTE",
    TEACHER: "DOCENTE",
    COORDINATION: "COORDENACAO",
  },
};

module.exports = roleResolvers;
