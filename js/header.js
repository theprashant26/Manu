// Scrolling Header & Scroll to Top Button

// Select the header and scroll-to-top button elements
const header__scrolling = document.querySelector('header');
const btnscroll = document.querySelector('.ButtonScrollTop');

// Function to manage scrolling behavior
window.onscroll = () => {
    // Add or remove the 'header__scrolling' class based on scroll position
    if (scrollY >= 60) {
        header__scrolling.classList.add("header__scrolling");
    } else {
        header__scrolling.classList.remove("header__scrolling");
    }

    // Show or hide the scroll-to-top button based on scroll position
    if (scrollY >= 300) {
        btnscroll.style.display = 'block';
    } else {
        btnscroll.style.display = 'none';
    }
};

// Scroll to the top of the page when the button is clicked
btnscroll.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Mobile Menu Toggle

// Select the mobile menu icon and header links elements
const mobile__icon = document.querySelector(".mobile__icon");
const mobileIconsChange = document.querySelector(".mobile__icon i");
const header__links = document.querySelector(".header__link__item");

// Toggle the mobile menu open/close and change the icon
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

// Mode Toggle (Dark/Light)

// Select the mode change button and icon elements
const change = document.querySelector(".Change_mode");
const changeicon = document.querySelector(".Change_mode i");

// Function to apply the selected mode
function applyMode(mode) {
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

// Apply the saved mode from localStorage when the page loads
const savedMode = localStorage.getItem("mode") || ""; // Default mode is light
applyMode(savedMode);

// Toggle between dark and light mode when the button is clicked
change.addEventListener("click", () => {
    let currentMode = document.body.classList.contains("Dark_Mode") ? "" : "Dark_Mode";
    applyMode(currentMode);
    localStorage.setItem("mode", currentMode); // Save the selected mode in localStorage
});

// Dropdown Links

// Select the dropdown icon and dropdown content elements
const Dropicon = document.querySelector(".Drop");
const DropDown = document.querySelector(".drop_down");

// Toggle the dropdown open/close and change the icon
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

// Page Loader

// Hide the loader after the page fully loads and after a delay
window.addEventListener('load', function () {
    setTimeout(function () {
        const loader = document.querySelector('.LoaderWrapper');
        loader.style.display = 'none';
    }, 1000); // 1-second delay
});

// Forms validation
function handleFormSubmit(event, successMessage) {
    event.preventDefault(); // Prevent the default form submission

    // Check that all required fields are filled
    const inputs = event.target.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(function(input) {
        if (input.value.trim() === "") {
            isValid = false;
        }
    });

    if (isValid) {
        showNotification(successMessage); // Show the success notification
        clearForm(event.target); // Reset the form
    } else {
        alert('Please fill out all required fields before submitting.');
    }
}

function showNotification(message) {
    const notification = document.getElementById("successMessage");
    notification.innerHTML = message; // Update the message
    notification.style.display = "block"; // Show the notification

    // The message disappears after 3 seconds
    setTimeout(function() {
        notification.style.display = "none";
    }, 3000);
}

// Function to clear the form fields
function clearForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.value = ""; // Reset the value of each field
    });
}
