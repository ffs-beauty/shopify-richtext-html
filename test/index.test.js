/**
 * @jest-environment jsdom
 */
import { renderRichText } from "../src/index.js";

test("renderRichText", () => {
	const input = {
  		"type": "root",
  		"children": [
			{
				"type": "heading",
				"children": [{
					"type": "text",
					"value": "This is an H3 heading"
				}],
				"level": 3
			},
			{
				"type": "paragraph",
			  	"children": [
					{
				  		"type": "text",
				  		"value": "This is italicized text and bold",
				  		"italic": true,
						"bold": true
					},
					{
						"url": "https://example.com/",
						"title": "Link to example.com",
						"type": "link",
						"children": []
					},
					{
						"type": "list",
						"children": [
							{
								"type": "list-item",
								"children": [
									{
										"type": "text",
										"value": "This is a list item"
									}	
								]
							}
						],
						"listType": "ordered"
					},
					{
						"type": "list",
						"children": [
							{
								"type": "list-item",
								"children": [
									{
										"type": "text",
										"value": "This is a list item"
									}
								]
							}
						],
						"listType": "unordered"
					}
				]
			}
	  	]
	};
	const output = renderRichText(input);
	document.body.append(output);

	expect(document.querySelector("h3").textContent).toBe("This is an H3 heading");
	expect(document.querySelector("p").children[0].textContent).toBe("This is italicized text and bold");
	expect(document.querySelector("p").children[0].style.fontStyle).toBe("italic");
	expect(document.querySelector("p").children[0].style.fontWeight).toBe("bold");
	expect(document.querySelector("p").children[1].href).toBe("https://example.com/");
	expect(document.querySelector("p").children[1].textContent).toBe("Link to example.com");
	expect(document.querySelector("ul").children[0].textContent).toBe("This is a list item");
	expect(document.querySelector("ol").children[0].textContent).toBe("This is a list item");
});
