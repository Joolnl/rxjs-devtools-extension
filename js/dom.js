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

// TODO: there should be a single function for creating elements alike.
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

// clickEvent fn must have curryable parameter to bind element.
const createElement = (type, content = null, cssClass = null, clickEvent = null) => {
    const element = document.createElement(type);
    if (content) {
        element.innerHTML = content;
    }

    if (cssClass) {
        element.classList.add(cssClass)
    }

    if (clickEvent) {
        element.addEventListener("click", clickEvent(element));
    }

    return element;
};

const createSubscriptionDiv = (textContent) => {
    const outer = createElement("div", null, 'subscription');
    const header = createElement("div", textContent, 'subscription-header', element => () => {
        outer.classList.contains('open')
            ? outer.classList.remove('open')
            : outer.classList.add('open');
    });
    const eventDiv = createElement("div", 'events', 'eventDiv');

    appendChildArray(outer, [header, eventDiv]);
    return outer;
};