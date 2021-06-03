const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("graphql-tools");
const path = require("path");

const { userSchema, userResolvers, UsersAPI } = require("./user");
const { classSchema, classResolvers, ClassesAPI } = require("./class");
const {
  enrollmentSchema,
  enrollmentResolvers,
  EnrollmentsAPI,
} = require("./enrollment");
const { roleSchema, roleResolvers, RolesAPI } = require("./roles");

const dbConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "./data/database.db"),
  },
};

const typeDefs = mergeTypeDefs([
  userSchema,
  classSchema,
  enrollmentSchema,
  roleSchema,
]);

const resolvers = [
  userResolvers,
  classResolvers,
  enrollmentResolvers,
  roleResolvers,
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI(),
      classesAPI: new ClassesAPI(dbConfig),
      enrollmentsAPI: new EnrollmentsAPI(dbConfig),
      rolesAPI: new RolesAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
});
