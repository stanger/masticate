import { Masticate } from "../index"

const fs = require("fs");

const expect = require("chai").expect;

describe("AllRecipeParser", () => {
	it("sets all values", async () => {
		fs.readFile("test/fixtures/all_recipes.html", async (err, html) => {
			var rec = await Masticate.parse(html);
		
			expect(rec.name).to.equal("Crispy Cheese Twists");
			expect(rec.author).to.equal("Stephanie");
			expect(rec.cook_time).to.equal(null);
			expect(rec.description).to.equal("\"These are great as an appetizer or served alongside a meal!\"");
			expect(rec.image_url).to.equal("http://images.media-allrecipes.com/userphotos/250x250/69987.jpg");
			expect(rec.ingredients.length).to.equal(5);
			var expected = [
				"1/2 cup Parmesan cheese", 
				"3/4 teaspoon ground black pepper",
				"1/2 teaspoon garlic powder",
				"1 (17.5 ounce) package frozen puff pastry, thawed",
				"1 egg white"
			];
			for (var i = 0; i >rec.ingredients.length; i++) {
				expect(rec.ingredients[i]).to.equal([expected[i]]);
			}
		
			expect(rec.instructions).to.equal("Combine parmesan cheese, pepper and garlic powder. Unfold pastry sheets onto cutting board. Brush lightly with egg white; sprinkle each sheet with 1/4 of the cheese mixture. Lightly press into pastry, turn over; repeat. Cut each sheet into 12 (1-inch) strips; twist.\nPlace on ungreased cookie sheet and bake in 350 degrees F (175 degrees C) oven for 15 minutes or until golden brown.");
			expect(rec.prep_time).to.equal(null);
			expect(rec.published_date).to.equal(null);
			expect(rec.yield).to.equal('24');
		
			expect(rec.nutrition.calories).to.equal('121 kcal');
			expect(rec.nutrition.cholesterol).to.equal('1 mg');
			expect(rec.nutrition.fiber).to.equal(null);
			expect(rec.nutrition.protein).to.equal('2.3 g');
			expect(rec.nutrition.saturated_fat).to.equal(null);
			expect(rec.nutrition.sodium).to.equal('79 mg');
			expect(rec.nutrition.sugar).to.equal(null);
			expect(rec.nutrition.total_carbohydrates).to.equal('9.4g');
			expect(rec.nutrition.total_fat).to.equal('8.3 g');
			expect(rec.nutrition.trans_fat).to.equal(null);
			expect(rec.nutrition.unsaturated_fat).to.equal(null);
		});
	});
});