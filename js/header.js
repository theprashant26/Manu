// Scrolling Header & Scroll to Top Button

const header__scrolling = document.querySelector('header');
const btnscroll = document.querySelector('.ButtonScrollTop');

window.onscroll = () => {
    if (header__scrolling) {
        if (scrollY >= 60) {
            header__scrolling.classList.add("header__scrolling");
        } else {
            header__scrolling.classList.remove("header__scrolling");
        }
    }

    if (btnscroll) {
        if (scrollY >= 300) {
            btnscroll.style.display = 'block';
        } else {
            btnscroll.style.display = 'none';
        }
    }
};

if (btnscroll) {
    btnscroll.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

// Mobile Menu Toggle

const mobile__icon = document.querySelector(".mobile__icon");
const mobileIconsChange = document.querySelector(".mobile__icon i");
const header__links = document.querySelector(".header__link__item");

if (mobile__icon && mobileIconsChange && header__links) {
    mobile__icon.addEventListener("click", () => {
        if (header__links.classList.contains("header__links__active")) {
            header__links.classList.remove("header__links__active");
            mobileIconsChange.classList.add("ri-menu-3-line");
            mobileIconsChange.classList.remove("ri-close-fill");
        } else {
            header__links.classList.add("header__links__active");
            mobileIconsChange.classList.remove("ri-menu-3-line");
            mobileIconsChange.classList.add("ri-close-fill");
        }
    });
}

// Mode Toggle (Dark/Light)

const change = document.querySelector(".Change_mode");
const changeicon = document.querySelector(".Change_mode i");

function applyMode(mode) {
    if (!changeicon) return;

    if (mode === "Dark_Mode") {
        document.body.classList.add("Dark_Mode");
        changeicon.classList.add("ri-sun-fill");
        changeicon.classList.remove("ri-moon-fill");
    } else {
        document.body.classList.remove("Dark_Mode");
        changeicon.classList.remove("ri-sun-fill");
        changeicon.classList.add("ri-moon-fill");
    }
}

const savedMode = localStorage.getItem("mode") || "";
applyMode(savedMode);

if (change) {
    change.addEventListener("click", () => {
        let currentMode = document.body.classList.contains("Dark_Mode") ? "" : "Dark_Mode";
        applyMode(currentMode);
        localStorage.setItem("mode", currentMode);
    });
}

// Dropdown Links (BLOG OPTIONAL)

const Dropicon = document.querySelector(".Drop");
const DropDown = document.querySelector(".drop_down");

if (Dropicon && DropDown) {
    Dropicon.addEventListener("click", () => {
        if (DropDown.classList.contains("drop_down_active")) {
            DropDown.classList.remove("drop_down_active");
            Dropicon.classList.remove("ri-arrow-up-s-line");
            Dropicon.classList.add("ri-arrow-down-s-line");
        } else {
            DropDown.classList.add("drop_down_active");
            Dropicon.classList.add("ri-arrow-up-s-line");
            Dropicon.classList.remove("ri-arrow-down-s-line");
        }
    });
}

// Page Loader

window.addEventListener('load', function () {
    setTimeout(function () {
        const loader = document.querySelector('.LoaderWrapper');
        if (loader) {
            loader.style.display = 'none';
        }
    }, 1000);
});

// Forms validation (unchanged – already safe)

function handleFormSubmit(event, successMessage) {
    event.preventDefault();

    const inputs = event.target.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(function (input) {
        if (input.value.trim() === "") {
            isValid = false;
        }
    });

    if (isValid) {
        showNotification(successMessage);
        clearForm(event.target);
    } else {
        alert('Please fill out all required fields before submitting.');
    }
}

function showNotification(message) {
    const notification = document.getElementById("successMessage");
    if (!notification) return;

    notification.innerHTML = message;
    notification.style.display = "block";

    setTimeout(function () {
        notification.style.display = "none";
    }, 3000);
}

function clearForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function (input) {
        input.value = "";
    });
}
