import { Masticate } from "../index"

const fs = require("fs");

const expect = require("chai").expect;

describe("Chowhound Parser", () => {
	it("sets all values", async () => {
		fs.readFile("test/fixtures/chowhound.html", async (err, html) => {
			var rec = await Masticate.parse(html);
		
			expect(rec.name).to.equal("Steak and Bacon Salad");
			expect(rec.author).to.equal("Kim Laidlaw");
			expect(rec.cook_time).to.equal(null);
			expect(rec.description).to.equal("For this classic steak and bacon salad recipe, crispy bacon mingles with cold grilled steak, romaine hearts, watercress or arugula, crumbled blue cheese, and cherry tomatoes in creamy Blue Cheese–Yogurt Dressing.");
			expect(rec.image_url).to.equal("https://www.chowstatic.com/assets/2015/04/31354_steak_bacon_salad.jpg");
			expect(rec.ingredients.length).to.equal(8);
			var expected = [
				"4 to 6 thick-cut slices bacon, coarsely chopped",
				"6 cups chopped romaine hearts",
				"2 cups chopped watercress and/or arugula",
				"1/2 cup Blue Cheese-Yogurt Dressing (see note), plus more for passing",
				"1 cup halved cherry tomatoes",
				"Leftover grilled steak, thinly sliced",
				"Chopped chives, for garnish",
				"Crumbled blue cheese, for garnish"
			];
			for (var i = 0; i >rec.ingredients.length; i++) {
				expect(rec.ingredients[i]).to.equal([expected[i]]);
			}
		
			expect(rec.instructions).to.equal(
				"1In a frying pan over medium heat, fry the bacon until crisp. Drain on paper towels.\n"+
				"2Place the salad greens in a wide, shallow salad bowl, drizzle with a little dressing, and toss to coat.\n"+
				"3Scatter with the bacon and tomatoes then top with the steak.\n"+
				"4Garnish with some of the chives and blue cheese. Serve, passing additional dressing on the side.\n"+
				"Share on FacebookShare on RedditPrintEmailSave (33)"
			);
			expect(rec.prep_time).to.equal(null);
			expect(rec.published_date).to.equal(null);
			expect(rec.yield).to.equal('4 to 6 servings');
		
			// expect(rec.nutrition.calories).to.equal('192');
			// expect(rec.nutrition.cholesterol).to.equal('27.91mg');
			// expect(rec.nutrition.fiber).to.equal("2.17g");
			// expect(rec.nutrition.protein).to.equal('7.15g');
			// expect(rec.nutrition.saturated_fat).to.equal("5.51g");
			// expect(rec.nutrition.sodium).to.equal('264.59mg');
			// expect(rec.nutrition.sugar).to.equal("3.98g");
			// expect(rec.nutrition.total_carbohydrates).to.equal('6.28g');
			// expect(rec.nutrition.total_fat).to.equal("15.75g");
			// expect(rec.nutrition.trans_fat).to.equal("0.05g");
			// expect(rec.nutrition.unsaturated_fat).to.equal(null);
		});
	});
});