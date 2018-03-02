import { Nutrition } from "./recipe"
import { RecipeParser } from "./recipe_parser";
import $ from "cheerio";

export class HRecipeParser extends RecipeParser {
	static get nutrition_selector() {
		return ".nutrition";
	}
	
	static get root_selector() {
		return ".hrecipe, .hRecipe";
	}
	
	nodes_with_class(klass) {
		return this.recipe_node.find(`.${klass}`);
	}
	
	node_with_class(klass) {
		return this.nodes_with_class(klass).first();
	}
	
	title_value_for_css_class(klass) {
		var nodes = this.node_with_class(klass);
		if (nodes.length) {
			var node = $(nodes.find(".value-title").first());
			return node.attr("title");
		}
		return null;
	}
	
	parse_author() {
		var content = this.node_with_class("author").text();
		return content ? content : null;
	}
	
	parse_cook_time() {
		var val = this.title_value_for_css_class("cookTime");
		if (!val) {
			val = this.title_value_for_css_class("cooktime");
		}
		return this.parse_duration(val);
	}
	
	parse_description() {
		var content = this.node_with_class("summary").text();
		return content ? content : null;
	}
	
	parse_image_url() {
		var content = this.node_with_class("photo").attr("src");
		return content ? content : null;
	}
	
	parse_ingredients() {
		var ingredients = [];
		var nodes = this.nodes_with_class("ingredient");
		nodes.each((i, node) => {
			var $node = $(node);
			var content = $node.text();
			ingredients.push(content);
		});
		return ingredients;
	}
	
	parse_instructions() {
		var inst = "";
		var nodes = this.nodes_with_class("instructions");
		if (nodes.length) {
			nodes.each((i, node) => {
				var $node = $(node);
				inst += $node.text() + "\n";
			})
			
		}
		return inst ? inst : null;
	}
	
	parse_name() {
		var content = this.node_with_class("fn").text();
		return content ? content : null;
	}
	
	parse_nutrition() {
		// TODO
		return new Nutrition();
	}
	
	parse_prep_time() {
		var val = this.title_value_for_css_class("prepTime");
		if (!val) {
			val = this.title_value_for_css_class("preptime");
		}
		return this.parse_duration(val);
	}
	
	parse_published_date() {
		// TODO
		return null;
	}
	
	parse_total_time() {
		var val = this.title_value_for_css_class("duration");
		if (!val) {
			val = this.title_value_for_css_class("totalTime");
		}
		return this.parse_duration(val);
	}
	
	parse_yield() {
		var content = this.node_with_class("yield").text();
		return content ? content : null;
	}
}