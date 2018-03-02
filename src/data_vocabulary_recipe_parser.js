import SchemaOrgRecipeParser from "schema_org_recipe_parser";

export class DataVocabularyRecipeParser extends SchemaOrgRecipeParser {
	
	static get root_selector() {
		return '[itemtype="http://data-vocabulary.org/Recipe"],[itemtype="https://data-vocabulary.org/Recipe"]'
	}
	
	static get nutrition_selector() {
		return '[itemtype="http://data-vocabulary.org/NutritionInformation"],[itemtype="https://data-vocabulary.org/NutritionInformation"]'
	}
	
	static get ingredient_itemprop() {
		return "ingredient";
	}
	
	parse_description() {
		return this.node_with_itemprop("summary").text();
	}

	parse_image_url() {
		return this.node_with_itemprop("photo").attr("src");
	}

	parse_instructions() {
		return this.node_with_itemprop("instructions").text();
	}

	parse_published_date() {
		var content = this.node_with_itemprop("published").text();
		if (content.trim())
			return new Date(content);
		return null;
	}

	parse_yield() {
		return this.node_with_itemprop("yield").text();
	}

	parse_total_time() {
		var node = this.recipe_node.find(".duration").first();
		if (!node) return null;
		return parseInt(content.replace(/\D/, ''));
	}
}