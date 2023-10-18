export function renderRichText(input) {
  if (typeof input === "string") {
    input = JSON.parse(input);
  }
  return new RichText(input).render();
}

class RichText {
  constructor(input, className = "") {
    this.type = input.type;
    this.className = className;
    this.children = (input.children || []).map(
      (child) => new Types[child.type](child),
    );
    this.tag = "div";
  }

  render() {
    const container = document.createElement(this.tag);

    if (this.type === "root" && this.className !== "") {
      container.classList.add(this.className);
    }

    this.children.forEach((child) => {
      container.appendChild(child.render());
    });

    return container;
  }
}

class Paragraph extends RichText {
  constructor(input) {
    super(input);
    this.tag = "p";
  }
}

class Span extends RichText {
  constructor(input) {
    super(input);
    this.tag = "span";
    this.bold = input.bold || false;
    this.italic = input.italic || false;
    this.value = input.value || "";
  }

  render() {
    const container = document.createElement(this.tag);

    if (this.bold) {
      container.style.fontWeight = "bold";
    }
    if (this.italic) {
      container.style.fontStyle = "italic";
    }

    if (this.value) {
      container.textContent = this.value;
    }

    this.children.forEach((child) => {
      container.appendChild(child.render());
    });

    return container;
  }
}

class Link extends RichText {
  constructor(input) {
    super(input);
    this.tag = "a";
    this.value = input.title;
    this.url = input.url;
  }

  render() {
    const container = document.createElement(this.tag);
    container.href = this.url;
    container.textContent = this.value;

    this.children.forEach((child) => {
      container.appendChild(child.render());
    });

    return container;
  }
}

class Heading extends RichText {
  constructor(input) {
    super(input);
    this.tag = `h${input.level}`;
  }
}

class List extends RichText {
  constructor(input) {
    super(input);
    this.tag = `${input.listType[0]}l`;
  }
}

class ListItem extends RichText {
  constructor(input) {
    super(input);
    this.tag = "li";
  }
}

const Types = {
  "root": RichText,
  "paragraph": Paragraph,
  "text": Span,
  "link": Link,
  "heading": Heading,
  "list": List,
  "list-item": ListItem,
};
