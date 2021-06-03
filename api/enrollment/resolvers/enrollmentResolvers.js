const DateTimeScalarType = require("../../shared/DateTimeScalarType");

const enrollmentResolvers = {
  DateTime: DateTimeScalarType,
  Mutation: {
    enrollStudent: (_, ids, { dataSources }) =>
      dataSources.enrollmentsAPI.enrollStudent(ids),
    deleteEnrollment: (_, { id }, { dataSources }) =>
      dataSources.enrollmentsAPI.deleteEnrollment(id),
    cancelEnrollment: (_, { id }, { dataSources }) =>
      dataSources.enrollmentsAPI.cancelEnrollment(id),
  },
  Enrollment: {
    student: (parent, _, { dataSources }) =>
      dataSources.usersAPI.getUserById(parent.student_id),
    class: (parent, _, { dataSources }) =>
      dataSources.classesAPI.getLoadedClasses.load(parent.class_id),
  },
};

module.exports = enrollmentResolvers;
