window.addEventListener('load', () => {
    console.log("Hi");
    init();
});

const init = () => {
    checks();
    getStorePreviousValues();
    setStoreEvents();
}

const checks = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
}

const getStorePreviousValues = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('boxes-')) {
            const elem = document.getElementById(key)
            if (elem)
                elem.value = localStorage[key];
        }
    }
}

const setStoreEvents = () => {
    document.getElementById('store').onclick = storeClick;
    document.getElementById('store').ontouchmove = console.log;
}

const storeClick = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const store = document.getElementById('store');
    // const virtualStore = document.createElement('div');
    // console.log({event: event, offsetX: event.offsetX, clientWidth: clientWidth, middle: clientWidth / 2})
    // Iterar cada elemento e ir simulando la posición la que tendrá que estar. En el momento de el cambio de DOM se tiene que resetear lo que se haga aquí
    /* const elems = store.getElementsByClassName('store-elem');
    elems.array.foreach(elem => {
        virtualStore.append(elem.cloneNode(true));
    });
    const json = JSON.stringify(converter(document.getElementById("example")), null, 4);
    */

    if (event.pageX > (store.clientWidth / 2) + store.offsetLeft)
        push('left');
    else
        push('right');
}

const decreaseBoxes = (price) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!price)
        return;
    value = localStorage.getItem(price) || 0;
    value--;
    if (value < 0)
        value = 0
    localStorage.setItem(`${price}`, `${value}`);
    propagate(value, price);
}

const increaseBoxes = (price) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!price)
        return;
    let value = localStorage.getItem(price) || 0;
    value++;
    localStorage.setItem(`${price}`, `${value}`);
    propagate(value, price);
}

const propagate = (value, inputId = null) => {
    if (inputId)
        updateView(inputId, value);
    // TODO: Update cart
}

const updateView = (inputId, value = 0) => {
    if (inputId) {
        const elem = document.getElementById(inputId);
        elem.value = value;
    }
}

const push = (direction = 'right') => {
    const store = document.getElementById('store');
    const elems = store.getElementsByClassName('store-elem');
    /*const virtualStore = document.createElement('div');
    [...elems].forEach(elem => {
        elem.style.order++;
        if (elem.style.order > elems.length)
            elem.style.order = 0;
    });*/

    // TODO: Push direction!!!
    if (direction == 'right') {
        store.prepend(elems[elems.length - 1]);
    } else {
        store.append(elems[0])
    }
}