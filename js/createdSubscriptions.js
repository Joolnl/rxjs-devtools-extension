// import { appendChildArray, createSpan, createSelect, createTextualDiv, createButton } from './dom.js';
const subscriptionCreationContainer = document.getElementById('subscriptionCreationContainer');
const subscriptions = [];
let [subAmount, closed, events] = [0, 0, 0];

const createSubscriptionCreationMessage = (operator, line, file, timestamp) => {
    return `
        <span class="operator">${operator}</span>
        <span> subscription created at line </span>
        <span class="line">${line}</span>
        <span> in ${file}</span>
        <span class="timestamp">${timestamp}</span>
    `;
};

// Create the div with three given subscription statistics.
const createSubscriptionDataDiv = (subscriptions, closed, events) => {
    let div = document.createElement("div");
    const subscriptionSpan = createSpan(`${subscriptions} subscriptions`);
    const closedSpan = createSpan(`${closed} closed`);
    const eventsSpan = createSpan(`${events} total events emited`);
    const filterSelect = createSelect(['All', 'Active', 'Completed', 'By events'], 'filter-select');
    const orderButton = createButton('a..z', 'order-button');

    div = appendChildArray(div, [filterSelect, orderButton, subscriptionSpan, closedSpan, eventsSpan]);
    div.classList.add('statistics-header');
    return div;
};

const toggleOpen = (element) => () => {
    const openClass = 'open';
    element.classList.contains(openClass)
        ? element.classList.remove(openClass)
        : element.classList.add(openClass);
};

const displayCreationSubscriptions = (container, subscriptions) => {
    subscriptions
        .map(subscription => {
            return createSubscriptionDiv(
                createSubscriptionCreationMessage(subscription.operator, subscription.line, subscription.file, subscription.timestamp),
                `eventTab${subscription.id}`,
                subscription.events
            );
        })
        .map(subscription => container.appendChild(subscription));
};

const drawSubscriptionCreationContainer = (container) => {
    if (container === null) {
        return;
    }
    container.innerHTML = '';
    container.appendChild(createSubscriptionDataDiv(subAmount, closed, events));
    displayCreationSubscriptions(container, subscriptions);
};

const timeStamp = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
};

const addSubscription = sub => {
    subscriptions.push(
        { id: subAmount, operator: sub.operator, line: sub.line, file: sub.file,
             timestamp: timeStamp(), events: [] }
    );
    drawSubscriptionCreationContainer(subscriptionCreationContainer);
    subAmount++;
    // chrome.extension.getBackgroundPage().console.log(subscriptions);
};

// Reset pane and statistics.
const clearPane = () => {
    subscriptions.length = 0;
    [subAmount, closed, events] = [0, 0, 0];
};

// Add event to subscriptions data for redraw, and append single event.
const addEvent = (id, message, event) => {
    events++;
    subscriptions
        .filter(sub => sub.id === id)
        .map(sub => sub.events.push(event));

    const subId = `eventTab${id}`;

    if (document.getElementById(subId)) {
        const div = createElement('div', event);
        document.getElementById(subId).appendChild(div);
    }
};