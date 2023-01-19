class CreateElement {
  createImgElement(cssClass: string, src?: string, id?: string): HTMLImageElement {
    const element = document.createElement('img');
    element.className = cssClass;
    if (src) element.src = src;
    if (id) element.id = id;
    return element;
  }

  createParagraphElement(
    cssClass: string,
    text?: string | number,
    id?: string,
  ): HTMLParagraphElement {
    const element = document.createElement('p');
    element.className = cssClass;
    if (id) element.id = id;
    if (text) element.textContent = String(text);
    return element;
  }

  createDivElement(
    cssClass: string,
    value?: string,
    text?: string,
    id?: string | number,
  ): HTMLDivElement {
    const element = document.createElement('div');
    element.className = cssClass;
    if (value) element.setAttribute('value', value);
    if (text) element.textContent = String(text);
    if (id) element.id = String(id);
    return element;
  }

  createSpanElement(cssClass: string, text?: string | number, id?: string): HTMLSpanElement {
    const element = document.createElement('span');
    element.className = cssClass;
    if (id) element.id = String(id);
    if (text) element.textContent = String(text);
    return element;
  }

  createButtonElement(
    cssClass: string,
    text?: string | number,
    id?: string | number,
    type?: string,
  ): HTMLButtonElement {
    const element = document.createElement('button');
    element.className = cssClass;
    if (id) element.id = String(id);
    if (text) element.textContent = String(text);
    if (type) element.setAttribute('type', type);
    return element;
  }

  createFormElement(cssClass: string, text?: string | number, id?: string): HTMLFormElement {
    const element = document.createElement('form');
    element.className = cssClass;
    if (id) element.id = String(id);
    if (text) element.textContent = String(text);
    return element;
  }

  createInputElement(
    cssClass: string,
    placeholder?: string,
    id?: string,
    type?: string,
    value?: string | number,
  ): HTMLInputElement {
    const element = document.createElement('input');
    element.className = cssClass;
    if (id) element.id = String(id);
    if (placeholder) element.setAttribute('placeholder', placeholder);
    if (value) element.setAttribute('value', String(value));
    if (type) element.setAttribute('type', type);
    return element;
  }
}

export default new CreateElement();
