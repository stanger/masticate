import { Nutrition } from "./recipe"
import { HtmlRecipeParser } from "./html_recipe_parser";
import $ from "cheerio";

export class SchemaOrgRecipeParser extends HtmlRecipeParser {
	
	static get root_selector() {
		return '[itemtype="http://schema.org/Recipe"],[itemtype="https://schema.org/Recipe"]';
	}
	
	static get nutrition_selector() {
		return '[itemtype="http://schema.org/NutritionInformation"],[itemtype="https://schema.org/NutritionInformation"]';
	}
	
	static get ingredient_itemprop() {
		return "ingredients";
	}
	
	nodes_with_itemprop(itemprop) {
		return this.recipe_node.find(`[itemprop = "${itemprop}"]`);
	}
	
	node_with_itemprop(itemprop) {
		return this.nodes_with_itemprop(itemprop).first();
	}
	
	nutrition_node_with_itemprop(itemprop) {
		if (!this.nutrition_node) return null;
		return this.nutrition_node.find(`[itemprop ="${itemprop}"]`);
	}
	
	nutrition_property_value(itemprop) {
		var node = this.nutrition_node_with_itemprop(itemprop);
		var val = null;
		if (node.attr("content")) 
			val = node.attr("content").trim();
		else 
			val = node.length ? node.text() : null;
		return val;
	}
	
	parse_author() {
		var node = this.node_with_itemprop("author");
		if (node.attr("itemtype") == "http://schema.org/Person") {
			return node.find('[itemprop = "name" ]').first().text();
		} else {
			return node.length ? node.text() : null;
		}
	}
	
	parse_description() {
		var node = this.node_with_itemprop("description");
		return node.length ? node.text() : null;
	}
	
	parse_image_url() {
		var node = this.node_with_itemprop("image");
		if (node.attr("src")) {
			return node.attr("src");
		} else {
			return node.attr("content") ? node.attr("content") : null;
		}
	}
	
	parse_ingredients() {
		var ingredients = [];
		var nodes = this.nodes_with_itemprop(this.constructor.ingredient_itemprop);
		nodes.each((i, node) => {
			var $node = $(node);
			if ($node) {
				ingredients.push($node.text());
			}
		});
		return ingredients;
	}
	
	parse_instructions() {
		var inst = "";
		var nodes = this.nodes_with_itemprop("recipeInstructions");
		nodes.each((i, node) => {
			var $node = $(node);
			if ($node) {
				var text = $node.text();
				if (!inst || !inst.indexOf(text))
					inst += text + "\n";
			}
		});
		
		return inst ? inst : null;
	}
	
	parse_name() {
		var node = this.node_with_itemprop("name");
		return node.length ? node.text() : null;
	}
	
	parse_nutrition() {
		var nutrition = new Nutrition();
		nutrition.calories = this.nutrition_property_value("calories");
		nutrition.cholesterol = this.nutrition_property_value("cholesterolContent");
		nutrition.fiber = this.nutrition_property_value("fiberContent");
		nutrition.protein = this.nutrition_property_value("proteinContent");
		nutrition.saturated_fat = this.nutrition_property_value("saturatedFatContent");
		nutrition.sodium = this.nutrition_property_value("sodiumContent");
		nutrition.sugar = this.nutrition_property_value("sugarContent");
		nutrition.total_carbohydrates = this.nutrition_property_value("carbohydrateContent");
		nutrition.total_fat = this.nutrition_property_value("fatContent");
		nutrition.trans_fat = this.nutrition_property_value("transFatContent");
		nutrition.unsaturated_fat = this.nutrition_property_value("unsaturatedFatContent");
		return nutrition;
	}
	
	parse_time(type) {
		var node = this.node_with_itemprop(type);
		var iso8601_string = null;
		if (node.attr("content")) {
			iso8601_string =  node.attr("content");
		} else {
			iso8601_string = node.attr("datetime");
		}
		
		return this.parse_duration(iso8601_string);
	}
	
	parse_published_date() {
		var node = this.node_with_itemprop("datePublished");
		if (node.attr("content")) {
			var content = node.attr("content").trim();
			return (content) ? Date.parse(content) : null;
		}
		return null;
	}
	
	parse_prep_time() {
		return this.parse_time("prepTime");
	}
	
	parse_total_time() {
		return this.parse_time("totalTime");
	}
	
	parse_cook_time() {
		return this.parse_time("cookTime");
	}
	
	parse_yield() {
		var node = this.node_with_itemprop("recipeYield");
		if (node.attr("content")) {
			return node.attr("content");
		} else if (node.text()) {
			return node.text();
		}
		return null;
	}
}
