# shopify-richtext-html
This library exists to parse [Shopify Rich Text Metafields](https://shopify.dev/docs/apps/custom-data/metafields/types#rich-text-formatting) in javascript.

## Usage
```js
const input = {...};
const richtext = new RichText(input);
document.body.append(richtext.render());
```
