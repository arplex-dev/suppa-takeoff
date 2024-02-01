const COOKIE_KEY = 'cbannaccepted';

window.onload = () => {
    if (!document.cookie.includes(COOKIE_KEY + '=')) {
        const banner = document.createElement('div');
        banner.classList.add('can-disable', 'cookies-banner', 'disabled');
        banner.innerHTML = `
            <div class="banner-content">
                Para el correcto funcionamiento de la página utilizamos <a class="link" href="/politica-de-cookies">algunas cookies</a>.
            </div>
            <div class="banner-buttons">
                <a id="close-button">✅</a>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('close-button').onclick = () => {
            setCookie(COOKIE_KEY, 1, 365);
            banner.classList.add('disabled');
        };
        setTimeout(() => {
            banner.classList.remove('disabled');
        }, 500);
    }
}

const hasCookie = (name) => {
    if (!name)
        return false;
    return document.cookie.includes(name + '=');
}

const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}