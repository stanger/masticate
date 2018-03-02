import URI from "urijs";
import $ from "cheerio";

export class CanonicalUrlParser {
	constructor(doc) {
		this.doc = doc;
	}
	
	get canonical_domain() {
		var url = this.canonical_url;
		if (url == null) return null;
		var uri = new URI(url);
		var full_domain = uri.host();
		if (full_domain == null) return null;
		var fragments = full_domain.split('.').slice(-2);
		if (fragments == null) return null;
		return fragments.join('.');
	}
	
	get canonical_url() {
		var node = this.doc('link[rel="canonical"]').first();
		if (node.length) return node.attr('href'); 
	
		node = this.doc('meta[property="og:url"]').first();
		return node.length ? node.attr("content") : null;
	}
}