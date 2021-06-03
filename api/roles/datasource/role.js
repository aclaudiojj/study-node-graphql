const { RESTDataSource } = require("apollo-datasource-rest");

class RolesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
    this.customResponse = {
      code: 200,
      message: "Done successfully!",
    };
  }

  async getRoles() {
    return await this.get("/roles");
  }

  async getRoleById(id) {
    return await this.get(`/roles/${id}`);
  }
}

module.exports = RolesAPI;
