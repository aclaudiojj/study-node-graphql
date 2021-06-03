const { SQLDataSource } = require("datasource-sql");
const DataLoader = require("dataloader");

class EnrollmentsAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);

    this.Response = {
      message: "",
    };
  }

  table() {
    return "enrollment";
  }

  async enrollStudent(ids) {
    const newEnrollment = {
      student_id: ids.student,
      class_id: ids.class,
      status: "confirmed",
    };

    await this.db.insert(newEnrollment).into(this.table());

    this.Response.message = "Enrollment confirmed!";

    return this.Response;
  }

  getAllByStudent = new DataLoader(async (studentIds) => {
    const all = await this.db
      .select("*")
      .from(this.table())
      .whereIn("student_id", studentIds)
      .select();

    return studentIds.map((studentId) =>
      all.filter((enrollment) => enrollment.student_id === studentId)
    );
  });

  getAllByClass = new DataLoader(async (classIds) => {
    const all = await this.db
      .select("*")
      .from(this.table())
      .where({
        class_id: Number(classId),
      });

    return classIds.map((classId) =>
      all.filter((enrollment) => enrollment.class_id === classId)
    );
  });

  async deleteEnrollment(id) {
    await this.db
      .delete()
      .where({ id: Number(id) })
      .into(this.table());

    this.Response.message = "Enrollment removed";

    return this.Response;
  }

  async cancelEnrollment(id) {
    await this.db
      .update({ status: "canceled" })
      .where({
        id: Number(id),
      })
      .into(this.table());

    this.Response.message = "Enrollment canceled";

    return this.Response;
  }
}

module.exports = EnrollmentsAPI;
