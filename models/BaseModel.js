class BaseModel {
	constructor(model) {
		this.model = model;
	}
	// Basic CRUD operations
	async create(data) {
		return await this.model.create(data);
	}
	async findById(id) {
		return await this.model.findById(id);
	}
	async find(query) {
		return await this.model.find(query);
	}
	async update(id, data) {
		return await this.model.findByIdAndUpdateDelete(id, data, {new: true });
	}
	async delete(id) {
		return await this.model.findByIdAndDelete(id);
	}
}
module.exports = BaseModel;


