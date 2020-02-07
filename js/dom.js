const appendChildArray = (element, arr) => {
    const newElement = element;
    arr.map(el => newElement.appendChild(el));
    return newElement;
};

const createSpan = (textContent, cssClass) => {
    const span = document.createElement("span");
    cssClass && span.classList.add(cssClass);
    span.innerHTML = textContent;
    return span;
};

const createSelect = (options, cssClass) => {
    const select = document.createElement("select");
    cssClass && select.classList.add(cssClass);
    options.map(option => {
        const optionNode = document.createElement("option");
        optionNode.innerHTML = option;
        select.appendChild(optionNode);
    });
    return select;
};

const createButton = (textContent, cssClass) => {
    const button = document.createElement("button");
    cssClass && button.classList.add(cssClass);
    button.innerHTML = textContent;
    return button;
};

// clickEvent fn must have curryable parameter to bind element.
const createTextualDiv = (textContent, cssClass = null, clickEvent = null) => {
    const div = document.createElement("div");
    div.innerHTML = textContent;
    cssClass && div.classList.add(cssClass);
    if (clickEvent) {
        const boundClickEvent = clickEvent(div);
        div.addEventListener("click", boundClickEvent);
    }
    return div;
};