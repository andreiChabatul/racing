class CreateElement {
    createImgElement(cssClass: string, src?: string, id?: string): HTMLImageElement {
        const element = document.createElement('img');
        element.className = cssClass;
        src ? (element.src = src) : '';
        id ? (element.id = id) : '';
        return element;
    }

    createParagraphElement(cssClass: string, text?: string | number, id?: string): HTMLParagraphElement {
        const element = document.createElement('p');
        element.className = cssClass;
        id ? (element.id = id) : '';
        text ? (element.textContent = String(text)) : '';
        return element;
    }

    createDivElement(cssClass: string, value?: string, text?: string, id?: string): HTMLDivElement {
        const element = document.createElement('div');
        element.className = cssClass;
        value ? element.setAttribute('value', value) : '';
        text ? (element.textContent = text) : '';
        id ? (element.id = id) : '';
        return element;
    }

    createSpanElement(cssClass: string, text?: string | number, id?: string): HTMLSpanElement {
        const element = document.createElement('span');
        element.className = cssClass;
        id ? (element.id = id) : '';
        text ? (element.textContent = String(text)) : '';
        return element;
    }

    createLabelElement(cssClass: string, text?: string | number, id?: string): HTMLLabelElement {
        const element = document.createElement('label');
        element.className = cssClass;
        id ? (element.id = id) : '';
        text ? (element.textContent = String(text)) : '';
        return element;
    }

    createH1Element(cssClass: string, text?: string | number, id?: string): HTMLHeadElement {
        const element = document.createElement('h1');
        element.className = cssClass;
        id ? (element.id = id) : '';
        text ? (element.textContent = String(text)) : '';
        return element;
    }

    createButtonElement(
        cssClass: string,
        text?: string | number,
        id?: string | number,
        type?: string
    ): HTMLButtonElement {
        const element = document.createElement('button');
        element.className = cssClass;
        id ? (element.id = String(id)) : '';
        text ? (element.textContent = String(text)) : '';
        type ? element.setAttribute('type', type) : '';
        return element;
    }

    createFormElement(cssClass: string, text?: string | number, id?: string): HTMLFormElement {
        const element = document.createElement('form');
        element.className = cssClass;
        id ? (element.id = id) : '';
        text ? (element.textContent = String(text)) : '';
        return element;
    }

    createInputElement(
        cssClass: string,
        placeholder?: string,
        id?: string,
        type?: string,
        value?: string | number
    ): HTMLInputElement {
        const element = document.createElement('input');
        element.className = cssClass;
        id ? (element.id = id) : '';
        placeholder ? element.setAttribute('placeholder', placeholder) : '';
        value ? element.setAttribute('value', String(value)) : '';
        type ? element.setAttribute('type', type) : '';
        return element;
    }

    createOptionElement(cssClass: string, value?: string | number, text?: string, id?: string): HTMLOptionElement {
        const element = document.createElement('option');
        element.className = cssClass;
        value ? element.setAttribute('value', String(value)) : '';
        text ? (element.textContent = text) : '';
        id ? (element.id = id) : '';
        return element;
    }

    createSelectElement(cssClass: string): HTMLSelectElement {
        const element = document.createElement('select');
        element.className = cssClass;
        return element;
    }
}

export default new CreateElement();
