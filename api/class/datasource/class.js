const DataLoader = require("dataloader");
const { SQLDataSource } = require("datasource-sql");

class ClassesAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);

    this.Response = {
      message: "",
    };
  }

  table() {
    return "classes";
  }

  async getClasses({ page = 0, limit = Infinity }) {
    const offset = page === 0 || page === 1 ? 0 : (page - 1) * limit;

    return this.db.select("*").from(this.table()).offset(offset).limit(limit);
  }

  async getClass(id) {
    const selectedClass = await this.db
      .select("*")
      .from(this.table())
      .where({
        id: Number(id),
      });

    return selectedClass[0];
  }

  async addClass(newClass) {
    const newClassId = await this.db.insert(newClass).into(this.table());

    const newInsertedClass = await this.getClass(newClassId[0]);

    return newInsertedClass;
  }

  async updateClass(updatedClass) {
    await this.db
      .update({ ...updatedClass.updatedClass })
      .where({
        id: Number(updatedClass.id),
      })
      .into(this.table());

    return await this.getClass(updatedClass.id);
  }

  async deleteClass(id) {
    await this.db
      .delete()
      .where({
        id: Number(id),
      })
      .into(this.table());

    return {
      message: "Record deleted",
    };
  }

  getLoadedClasses = new DataLoader(async (classesIds) => {
    const selectedClasses = await this.db
      .select("*")
      .from(this.table())
      .whereIn("id", classesIds);

    return classesIds.map((classId) =>
      selectedClasses.find((selectedClass) => selectedClass.id === classId)
    );
  });
}

module.exports = ClassesAPI;
