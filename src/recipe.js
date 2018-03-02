export class Nutrition {
	constructor() {
		this.calories = null;
		this.cholesterol = null;
		this.fiber = null;
		this.protein = null;
		this.saturated_fat = null;
		this.sodium = null;
		this.sugar = null;
		this.total_carbohydrates = null;
		this.total_fat = null;
		this.trans_fat = null;
		this.unsaturated_fat = null;
	}
}

export class Recipe {
	constructor() {
		this.author = null;
		this.canonical_url = null;
		this.cook_time = null;
		this.description = null;
		this.image_url = null;
		this.ingredients = [];
		this.instructions = null;
		this.name = null;
		this.nutrition = new Nutrition();
		this.prep_time  = null;
		this.published_date = null;
		this.total_time = null;
		this.yield = null;
	}
}