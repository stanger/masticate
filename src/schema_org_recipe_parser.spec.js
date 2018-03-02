import { Masticate } from "./index"
import { SchemaOrgRecipeParser }  from "./schema_org_recipe_parser";
import $ from "cheerio";

const expect = require("chai").expect;

const html = 
"<!DOCTYPE html>" +
"<html>" +
"<body>" +
	"<div itemscope itemtype=\"http://schema.org/Recipe\">" +
		"<span itemprop=\"name\">My Famous Breakfast</span>" +
		"By <span itemprop=\"author\">John Smith</span>," +
		"<meta itemprop=\"datePublished\" content=\"2018-02-14\">Feb 10, 2018" +
		"<img itemprop=\"image\" src=\"banana.jpg\" />" +
	
		"<span itemprop=\"description\">This is a fruit</span>" +
	
		"Prep Time: <meta itemprop=\"prepTime\" content=\"PT15M\">15 minutes" +
		"Cook time: <meta itemprop=\"cookTime\" content=\"PT1H\">1 hour" +
		"Yield: <span itemprop=\"recipeYield\">1 fruit</span>" +
	
		"<div itemprop=\"nutrition\" itemscope itemtype=\"http://schema.org/NutritionInformation\">" +
			"Nutrition facts:" +
			"<span itemprop=\"calories\">240 calories</span>," +
			"<span itemprop=\"fatContent\">9 grams fat</span>" +
		"</div>" +
		
		"Ingredients:" +
		"- <span itemprop=\"ingredients\">1 ripe bananas</span>" +
		"- <span itemprop=\"ingredients\">Melted Chocolate</span>" +
		
		"Instructions:" +
		"<span itemprop=\"recipeInstructions\">Eat the banana.</span>" +
		
		"140 comments:" +
		"<meta itemprop=\"interactionCount\" content=\"UserComments:140\" />" +
		"From Janel, May 5 -- thank you, great recipe!" +
	"</div>" +
"</body>" +
"</html>"
;

describe("Schema.org Recipe Parser", () => {
	describe("With no content", () => {
		it("sets all values to null", async () => {
			var parser = new SchemaOrgRecipeParser($.load(""));
			var rec = await parser.parse();
			
			expect(rec.canonical_url).to.equal(null);
			expect(rec.cook_time).to.equal(null);
			expect(rec.description).to.equal(null);
			expect(rec.image_url).to.equal(null);
			expect(rec.ingredients).to.be.a("Array");
			expect(rec.ingredients.length).to.equal(0);
			expect(rec.instructions).to.equal(null);
			expect(rec.name).to.equal(null);
			expect(rec.prep_time).to.equal(null);
			expect(rec.published_date).to.equal(null);
			expect(rec.total_time).to.equal(null);
			expect(rec.yield).to.equal(null);
		});
	});
	
	describe("With a valid document", () => {
		it("sets all values", async () => {
			var rec = await Masticate.parse(html);
			
			expect(rec.author).to.equal("John Smith");
			expect(rec.cook_time).to.equal(60);
			expect(rec.description).to.equal("This is a fruit");
			expect(rec.image_url).to.equal("banana.jpg");
			expect(rec.ingredients.length).to.equal(2);
			var expected = ["1 ripe bananas", "Melted Chocolate"];
			for (var i = 0; i >rec.ingredients.length; i++) {
				expect(rec.ingredients[i]).to.equal([expected[i]]);
			}
			
			expect(rec.instructions).to.equal("Eat the banana.");
			expect(rec.name).to.equal("My Famous Breakfast");
			expect(rec.prep_time).to.equal(15);
			expect(rec.published_date).to.equal(Date.parse("2018-02-14"));
			expect(rec.yield).to.equal("1 fruit");
			
			expect(rec.nutrition.calories).to.equal('240 calories');
			expect(rec.nutrition.total_fat).to.equal('9 grams fat');
		});
	});
});