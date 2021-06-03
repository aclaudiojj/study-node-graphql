const { RESTDataSource } = require("apollo-datasource-rest");

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
    this.customResponse = {
      code: 200,
      message: "Done successfully!",
    };
  }

  async getUsers({ page = 1, limit = 0 }) {
    const query = limit
      ? `/users?_page=${page}&_limit=${limit}`
      : `/users?_page=${page}`;

    return await this.get(query);
  }

  async getUserById(id) {
    return await this.get(`/users/${id}`);
  }

  async addUser(user) {
    const users = await this.get("/users");
    const role = await this.get(`/roles/?type=${user.role}`);

    await this.post("users", {
      ...user,
      id: users.length + 1,
      role: role[0].id,
    });

    return {
      ...this.customResponse,
      user: {
        ...user,
        role: role[0],
      },
    };
  }

  async updateUser(updatedUser) {
    const role = await this.get(`/roles/?type=${updatedUser.user.role}`);

    await this.put(`/users/${updatedUser.id}`, {
      ...updatedUser.user,
      role: role[0].id,
    });

    return {
      ...this.customResponse,
      user: {
        ...updatedUser.user,
        role: role[0],
      },
    };
  }

  async deleteUser(id) {
    await this.delete(`/users/${id}`);

    return this.customResponse;
  }
}

module.exports = UsersAPI;
