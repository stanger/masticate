import { SchemaOrgRecipeParser }  from "../schema_org_recipe_parser";

export class AllRecipesParser extends SchemaOrgRecipeParser {

	static can_parse(html) {
		return this.matches_domain(html, 'allrecipes.com');
	}
	
	// parse_instructions() {
	// 	var node = this.recipe_node.find('.directions ol').first();
	// 	return node.text();
	// }
	
	parse_name() {
		var node = this.recipe_node.find(".recipe-summary [itemprop = \"name\"]").first();
		return node ? node.text() : null;
	}
}