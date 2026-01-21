document.addEventListener("DOMContentLoaded", function () {

  // ================================
  // Counter Animation
  // ================================

  const counters = document.querySelectorAll('#counter');
  const speed = 200;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / (speed * 10);

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 100);
      } else {
        counter.innerText = target / 10;
      }
    };
    updateCount();
  });


  // ================================
  // Filtering Functionality
  // ================================

  if (document.getElementsByClassName("work__item").length) {
    filterSelection("all");
  }

  function applyFilter(event) {
    event.preventDefault();
    const select = document.getElementById("filterSelect");
    if (!select) return;
    filterSelection(select.value);
  }

  function filterSelection(c) {
    let x = document.getElementsByClassName("work__item");
    if (c === "all") c = "";
    for (let i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) {
        w3AddClass(x[i], "show");
      }
    }
  }

  function w3AddClass(element, name) {
    let arr1 = element.className.split(" ");
    let arr2 = name.split(" ");
    arr2.forEach(cls => {
      if (!arr1.includes(cls)) {
        element.className += " " + cls;
      }
    });
  }

  function w3RemoveClass(element, name) {
    let arr1 = element.className.split(" ");
    let arr2 = name.split(" ");
    arr2.forEach(cls => {
      while (arr1.includes(cls)) {
        arr1.splice(arr1.indexOf(cls), 1);
      }
    });
    element.className = arr1.join(" ");
  }


  // ================================
  // Custom Hover Select Option
  // ================================

  const selectElement = document.querySelector("#filterSelect");

  if (selectElement) {
    selectElement.addEventListener("mouseover", () => {
      selectElement.classList.add("custom-hover");
    });

    selectElement.addEventListener("mouseout", () => {
      selectElement.classList.remove("custom-hover");
    });
  }


  // ================================
  // Modal Popup (ALL 4 WORKING)
  // ================================

  // Open modal
  document.querySelectorAll('.work__title__hover a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href'); // #modal-education
      const modal = document.querySelector(targetId);
      if (modal) {
        modal.classList.add('modalWorksActive');
      }
    });
  });

  // Close modal
  document.querySelectorAll('.ModalClose').forEach(btn => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.modalWorks');
      if (modal) {
        modal.classList.remove('modalWorksActive');
      }
    });
  });


  // ================================
  // Download CV PDF
  // ================================

  const downloadBtn = document.getElementById('downloadResume');

  if (downloadBtn && window.jspdf) {
    downloadBtn.addEventListener('click', function () {

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      const namepdf = document.querySelector("#resume .NamePerson")?.innerText || "";
      const jobpdf = document.querySelector("#resume .JobTitle")?.innerText || "";
      const emailpdf = document.querySelector("#resume .EmailPDF")?.innerText || "";
      const phonepdf = document.querySelector("#resume .PhonePDF")?.innerText || "";
      const addresspdf = document.querySelector("#resume .AdrressPDF")?.innerText || "";
      const aboutMe = document.querySelector('#resume .aboutme')?.innerText || "";

      const educationTitle = document.querySelector('#resume .Education_Experience:nth-of-type(1) h3')?.innerText || "";
      const educationItems = Array.from(
        document.querySelectorAll('#resume .Education_Experience:nth-of-type(1) .Desc')
      ).map(desc => ({
        year: desc.querySelector('h4')?.innerText || "",
        course: desc.querySelector('h3')?.innerText || "",
        university: desc.querySelector('small')?.innerText || ""
      }));

      const experienceTitle = document.querySelector('#resume .Education_Experience:nth-of-type(2) h3')?.innerText || "";
      const experienceItems = Array.from(
        document.querySelectorAll('#resume .Education_Experience:nth-of-type(2) .Desc')
      ).map(desc => ({
        year: desc.querySelector('h4')?.innerText || "",
        jobTitle: desc.querySelector('h3')?.innerText || "",
        company: desc.querySelector('small')?.innerText || ""
      }));

      const skillsItems = Array.from(document.querySelectorAll('.skills__item')).map(item => ({
        percentage: item.querySelector('h4')?.innerText || "",
        skillName: item.querySelector('h5')?.innerText || ""
      }));

      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Curriculum Vitae", 105, 20, { align: "center" });

      doc.setFontSize(14);
      doc.text(`Name: ${namepdf}`, 20, 40);
      doc.text(`Job Title: ${jobpdf}`, 20, 47);
      doc.text(`Phone: ${phonepdf}`, 20, 54);
      doc.text(`Email: ${emailpdf}`, 20, 61);
      doc.text(`Address: ${addresspdf}`, 20, 68);

      const aboutText = doc.splitTextToSize(aboutMe, 170);
      doc.text(aboutText, 20, 78);

      let y = 90 + aboutText.length * 6;
      doc.line(20, y, 190, y);

      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text(educationTitle, 20, y);

      doc.setFont("helvetica", "normal");
      educationItems.forEach((item, i) => {
        doc.text(`${item.year}: ${item.course} (${item.university})`, 20, y + 8 + i * 7);
      });

      y += 8 + educationItems.length * 7;
      doc.line(20, y, 190, y);

      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text(experienceTitle, 20, y);

      doc.setFont("helvetica", "normal");
      experienceItems.forEach((item, i) => {
        doc.text(`${item.year}: ${item.jobTitle} (${item.company})`, 20, y + 8 + i * 7);
      });

      y += 8 + experienceItems.length * 7;
      doc.line(20, y, 190, y);

      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Skills", 20, y);

      doc.setFont("helvetica", "normal");
      skillsItems.forEach((item, i) => {
        doc.text(`${item.skillName}: ${item.percentage}`, 20, y + 8 + i * 7);
      });

      doc.save("Resume.pdf");
    });
  }

});
