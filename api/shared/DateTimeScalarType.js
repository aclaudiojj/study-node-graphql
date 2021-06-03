const { GraphQLScalarType } = require("graphql");

class DateTimeScalarType extends GraphQLScalarType {
  constructor() {
    super({
      name: "DateTime",
      description: "ISO-8601 datetime formated string",
      serialize: (value) => value.toISOString(),
      parseValue: (value) => new Date(value),
      parseLiteral: (ast) => new Date(ast.value),
    });
  }
}

module.exports = new DateTimeScalarType();
