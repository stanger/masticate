import $ from "cheerio";
import { RecipeParser } from "./recipe_parser";

export class HtmlRecipeParser extends RecipeParser {

	constructor(doc) {
		super(doc);
		this.recipe_node = this.doc(this.constructor.root_selector).first();
		this.nutrition_node = this.doc(this.constructor.nutrition_selector).first();
	}
}