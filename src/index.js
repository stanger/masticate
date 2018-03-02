import { AllRecipesParser } from "./non_standard/all_recipes_parser";
import { ChowhoundParser} from "./non_standard/chowhound_parser";
import { EpicuriousParser} from "./non_standard/epicurious_parser";
import { FoodNetworkParser} from "./non_standard/food_network_parser";
import { SchemaOrgRecipeParser } from "./schema_org_recipe_parser";
import { HRecipeParser } from "./hrecipe_parser";
import { AttributeCleaner } from "./attributes";
import $ from "cheerio";
	
const parsers = [
		AllRecipesParser,
		ChowhoundParser,
		EpicuriousParser,
		FoodNetworkParser,
		SchemaOrgRecipeParser,
		HRecipeParser,
	];

export class Masticate {

	static async parse(html) {
		var doc = $.load(html);
		for (let parser of parsers) {
			if (parser.can_parse(doc)) {
				var p = new parser(doc);
				var recipe = await p.parse();
				var cleaner = new AttributeCleaner(recipe);
				recipe = cleaner.clean();
				return recipe;
			}
		}
	}
}