# shopify-richtext-html
This package converts [Shopify's Rich Text Metafields](https://shopify.dev/docs/apps/custom-data/metafields/types#rich-text-formatting) to an HTMLElement.

## Usage
```js
const input = {...};
const richtext = new RichText(input);
document.body.append(richtext.render());
```
