const DateTimeScalarType = require("../../shared/DateTimeScalarType");

const classResoler = {
  DateTime: DateTimeScalarType,
  Query: {
    classes: (_, args, { dataSources }) =>
      dataSources.classesAPI.getClasses(args),
    class: (_, { id }, { dataSources }) => dataSources.classesAPI.getClass(id),
  },
  Mutation: {
    addClass: async (_, { newClass }, { dataSources }) =>
      dataSources.classesAPI.addClass(newClass),
    updateClass: async (_, updatedClass, { dataSources }) =>
      dataSources.classesAPI.updateClass(updatedClass),
    deleteClass: async (_, { id }, { dataSources }) =>
      dataSources.classesAPI.deleteClass(id),
  },
  Class: {
    enrollments: (parent, _, { dataSources }) =>
      dataSources.enrollmentsAPI.getAllByClass.load(parent.id),
    teacher: (parent, _, { dataSources }) =>
      dataSources.usersAPI.getUserById(parent.teacher_id),
  },
};

module.exports = classResoler;
