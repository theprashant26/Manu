// Counter Animation

// Select all elements with the ID 'counter'
const counters = document.querySelectorAll('#counter');
const speed = 200; // Speed factor: lower value means slower count

// Loop through each counter element
counters.forEach(counter => {
  const updateCount = () => {
    // Get the target value from the data attribute
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    // Calculate the increment value
    const inc = target / (speed * 10);

    // Update the counter value gradually
    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 100);
    } else {
      counter.innerText = target / 10; // Set to final target value
    }
  };

  updateCount(); // Initiate the counting process
});

// Filtering Functionality

// Function to apply the filter when the form is submitted
filterSelection('all');
function applyFilter(event) {
  event.preventDefault(); // Prevent the default form submission
  const selectedValue = document.getElementById("filterSelect").value;
  filterSelection(selectedValue); // Call the existing filterSelection function
}

// Existing filterSelection function
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("work__item");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Existing helper functions
function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Custom hover select option
const selectElement = document.querySelector("#filterSelect");

selectElement.addEventListener("mouseover", () => {
  selectElement.classList.add("custom-hover");
});

selectElement.addEventListener("mouseout", () => {
  selectElement.classList.remove("custom-hover");
});

// Modal Popup

// Select modal close button, container, and activation links
const ModalClose = document.querySelector(".ModalClose");
const ModalContainer = document.querySelector(".modalWorks");
const ModalActives = document.querySelectorAll(".work__title__hover div a");

// Loop through each activation link
ModalActives.forEach((ModalActive) => {
  // Show modal on click
  ModalActive.addEventListener("click", () => {
    ModalContainer.classList.add("modalWorksActive");
  });
  // Hide modal on close button click
  ModalClose.addEventListener("click", () => {
    ModalContainer.classList.remove("modalWorksActive");
  });
});

//Download CV PDF

document.getElementById('downloadResume').addEventListener('click', function () {
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Retrieving data from the about section
  const namepdf = document.querySelector("#resume .HideDiv-PDF .NamePerson").innerText;
  const jobpdf = document.querySelector("#resume .HideDiv-PDF .JobTitle").innerText;
  const emailpdf = document.querySelector("#resume .HideDiv-PDF .EmailPDF").innerText;
  const phonepdf = document.querySelector("#resume .HideDiv-PDF .PhonePDF").innerText;
  const addresspdf = document.querySelector("#resume .HideDiv-PDF .AdrressPDF").innerText;
  const aboutMe = document.querySelector('#resume .AboutContent .AboutTabcontent .aboutme').innerText;
  
  // Retrieving data from the education section
  const educationTitle = document.querySelector('#resume .Education_Experience:nth-of-type(1) h3').innerText;
  const educationItems = Array.from(document.querySelectorAll('#resume .Education_Experience:nth-of-type(1) .Desc')).map(desc => {
    const year = desc.querySelector('h4').innerText;
    const course = desc.querySelector('h3').innerText;
    const university = desc.querySelector('small').innerText;
    return { year, course, university };
  });
  
  // Retrieving data from the experience section
  const experienceTitle = document.querySelector('#resume .Education_Experience:nth-of-type(2) h3').innerText;
  const experienceItems = Array.from(document.querySelectorAll('#resume .Education_Experience:nth-of-type(2) .Desc')).map(desc => {
    const year = desc.querySelector('h4').innerText;
    const jobTitle = desc.querySelector('h3').innerText;
    const company = desc.querySelector('small').innerText;
    return { year, jobTitle, company };
  });
  
  // Retrieving data from the skills section
  const skillsTitle = "Skills"; // Skills title
  const skillsItems = Array.from(document.querySelectorAll('.skills__item')).map(item => {
    const percentage = item.querySelector('h4').innerText;
    const skillName = item.querySelector('h5').innerText;
    return { percentage, skillName };
  });
  
  // Adding information to the PDF
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold"); // Set the title to bold
  const title = "Curriculum Vitae";
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.text(title, (pageWidth - titleWidth) / 2, 20); // Center the title
  
  // Set font back to normal for content
  doc.setFontSize(14);
  doc.text(`Name: ${namepdf}`, 20, 40);
  doc.text(`Job Title: ${jobpdf}`, 20, 47);
  
  // Add contact information
  doc.text(`Phone: ${phonepdf}`, 20, 54);
  doc.text(`Email: ${emailpdf}`, 20, 61);
  doc.text(`Address: ${addresspdf}`, 20, 68);
  
  // Add personal description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  const aboutMeText = doc.splitTextToSize(aboutMe, 170); // To handle text overflow
  const aboutMeY = 78; // Initial Y position for text
  doc.text(aboutMeText, 20, aboutMeY);
  
  // Add a line under the descriptive paragraph
  const lineY = aboutMeY + (doc.getTextDimensions(aboutMeText).h + 5); // Line position below the text
  doc.setDrawColor(0); // Line color
  doc.setLineWidth(1); // Line thickness
  doc.line(20, lineY, 190, lineY); // Horizontal line
  
  // Retrieve spacing for the education title
  const yOffset = lineY + 10; // Offset after the line
  
  // Add education information
  doc.setFont("helvetica", "bold");
  doc.text(educationTitle, 20, yOffset);
  educationItems.forEach((item, index) => {
    const y = yOffset + 10 + (7 * index);
    doc.setFont("helvetica", "normal");
    doc.text(`${item.year}: ${item.course} (${item.university})`, 20, y);
  });
  
  // Add a line under the education section
  const educationEndY = yOffset + 10 + (7 * educationItems.length);
  doc.setLineWidth(1); // Line thickness
  doc.line(20, educationEndY, 190, educationEndY); // Horizontal line
  
  // Add experience information
  const experienceYOffset = educationEndY + 10; // Offset after the line
  doc.setFont("helvetica", "bold");
  doc.text(experienceTitle, 20, experienceYOffset);
  experienceItems.forEach((item, index) => {
    const y = experienceYOffset + 10 + (7 * index);
    doc.setFont("helvetica", "normal");
    doc.text(`${item.year}: ${item.jobTitle} (${item.company})`, 20, y);
  });
  
  // Add a line under the experience section
  const experienceEndY = experienceYOffset + 10 + (7 * experienceItems.length);
  doc.setLineWidth(1); // Line thickness
  doc.line(20, experienceEndY, 190, experienceEndY); // Horizontal line
  
  // Add skills
  const skillsYOffset = experienceEndY + 10; // Offset after the line
  doc.setFont("helvetica", "bold");
  doc.text(skillsTitle, 20, skillsYOffset);
  skillsItems.forEach((item, index) => {
    const y = skillsYOffset + 10 + (7 * index);
    doc.setFont("helvetica", "normal");
    doc.text(`${item.skillName}: ${item.percentage}`, 20, y);
  });
  
  // Generate and download the PDF
  doc.save("Resume.pdf");

});




