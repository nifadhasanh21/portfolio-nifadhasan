// Enhanced main.js with new features

// MAIN JS
// Show menu
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Menu Show
if (navToggle) {
  navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
}

// Menu Hidden
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
}

// Remove menu mobile
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Scroll sections active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Scroll reveal animation
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .projects__card, .contact__input", { interval: 200 });

// Initialize AOS animation
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
});

// Initialize EmailJS with your Public Key
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("_DWpHXao4PLnaotHF");
  console.log("EmailJS initialized successfully");
});

// Contact form functionality
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const subject = document.querySelector('input[name="subject"]').value.trim();
  const message = document
    .querySelector('textarea[name="message"]')
    .value.trim();

  // Simple validation
  if (name === "" || email === "" || subject === "" || message === "") {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.className = "form-message error";
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.className = "form-message error";
    return;
  }

  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.innerHTML = '<div class="loading"></div> Sending...';
  submitButton.disabled = true;

  // Get current date and time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // Send email using EmailJS
  emailjs
    .send("Portfolio Contact", "template_afxcr2a", {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      date: date,
      time: time,
      reply_to: email, // This ensures replies go to the sender
    })
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        formMessage.textContent =
          "Message sent successfully! I'll get back to you soon.";
        formMessage.className = "form-message success";
        contactForm.reset();
      },
      function (error) {
        console.log("FAILED...", error);
        formMessage.textContent =
          "Failed to send message. Please try again or email me directly at nifadhasanh21@gmail.com";
        formMessage.className = "form-message error";
      }
    )
    .finally(function () {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});

// CV Download functionality
document.getElementById("download-cv").addEventListener("click", function (e) {
  e.preventDefault();

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = "/CV..pdf"; // Replace with actual CV file path
  link.download = "CV-Nifad Hasan Eimu.pdf";
  link.target = "_blank";

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Scroll to top functionality
const scrollTopButton = document.getElementById("scroll-top");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollTopButton.classList.add("visible");
  } else {
    scrollTopButton.classList.remove("visible");
  }
});

scrollTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ALWAYS START LIGHT THEME, TOGGLE ONLY WHEN CLICKED
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;
  const themeIcon = themeToggle.querySelector("i");

  // Force light theme every time page loads
  document.body.classList.remove("dark-theme");
  themeIcon?.classList.remove("bx-sun");
  themeIcon?.classList.add("bx-moon");

  // Toggle on click (do NOT save in localStorage)
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      themeIcon?.classList.remove("bx-moon");
      themeIcon?.classList.add("bx-sun");
    } else {
      themeIcon?.classList.remove("bx-sun");
      themeIcon?.classList.add("bx-moon");
    }
  });
});

// Typed.js initialization
document.addEventListener("DOMContentLoaded", function () {
  const typedText = new Typed("#typed-text", {
    strings: ["Nifad Hasan Eimu"], // new name
    typeSpeed: 100,
    backSpeed: 60,
    loop: false,
    showCursor: false, // hides the cursor completely
    // cursorChar removed
  });

  const typedRoles = new Typed("#typed-roles", {
    strings: ["Web Developer", "Software Engineer", "Problem Solver"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    backDelay: 1500,
    showCursor: true,
    cursorChar: "|",
  });
});

// Skills filter functionality
const skillsFilterBtns = document.querySelectorAll(".skills-filter__btn");
const skillsData = document.querySelectorAll(".skills__data");

skillsFilterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active class from all buttons
    skillsFilterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    skillsData.forEach((skill) => {
      if (filter === "all" || skill.getAttribute("data-category") === filter) {
        skill.style.display = "flex";
      } else {
        skill.style.display = "none";
      }
    });
  });
});

// Projects filter functionality
const projectsFilterBtns = document.querySelectorAll(".projects-filter__btn");
const projectCards = document.querySelectorAll(".project__card");

projectsFilterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active class from all buttons
    projectsFilterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (
        filter === "all" ||
        card.getAttribute("data-category").includes(filter)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Project modal functionality
const projectInfoBtns = document.querySelectorAll(".project__info-btn");
const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalBody = document.querySelector(".project-modal__body");

// Project data for modal
const projectData = {
  1: {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website built with HTML, CSS, and JavaScript to showcase my work and skills. This project demonstrates modern web development practices including responsive design, smooth animations, and clean code structure.",
    technologies: [
      "HTML5,  ",
      "CSS3,  ",
      "JavaScript,  ",
      "Responsive Design  ",
    ],
    features: [
      "Responsive layout",
      "Smooth scrolling",
      "Interactive elements",
      "Contact form",
    ],
    liveLink: "https://www.nifadhasan.com/",
    githubLink: "https://github.com/nifad-hasan-h21/Portfolio-nifadh21",
    images: ["work1.jpg"],
  },
  2: {
    title: "Healthcare Management System",
    description:
      "A comprehensive C-based application for managing patient records, appointments, and medical staff. The system includes features for adding, deleting, searching, and updating records with efficient data management.",
    technologies: ["C Programming,  ", "Data Structures,  ", "File Handling"],
    features: [
      "Patient record management",
      "Appointment scheduling",
      "Staff management",
      "Search functionality",
    ],
    liveLink: "#",
    githubLink: "https://github.com/nifad-hasan-h21/Library-Management-System.",
    images: ["work2.jpg"],
  },
  3: {
    title: "Library Management System",
    description:
      "A complete library management system built with C programming to handle books, members, and transactions efficiently. The system provides a user-friendly interface for library operations with robust data management capabilities.",
    technologies: ["C Programming,  ", "Data Structures,  ", "File Management"],
    features: [
      "Book management",
      "Member management",
      "Transaction tracking",
      "Report generation",
    ],
    liveLink: "#",
    githubLink: "https://github.com/nifad-hasan-h21/Library-Management-System",
    images: ["work4.jpg"],
  },

  4: {
    title: "TynecXio (MERN)",
    description:
      "A full-stack MERN website built with MongoDB, Express, React, and Node. Includes authentication, dashboard UI, and scalable API structure.",
    technologies: [
      "MongoDB,  ",
      "Express.js,  ",
      "React,  ",
      "Node.js,  ",
      "JWT/Auth  ",
    ],
    features: [
      "Auth + protected routes",
      "Dashboard & admin UI",
      "REST API",
      "Responsive UI",
    ],
    liveLink: "https://www.tynecxio.com/",
    githubLink: "https://github.com/nifadhasanh21/tynecxio",
    images: ["tynecxio.jpg"],
  },
};

projectInfoBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const projectId = this.getAttribute("data-project");
    const project = projectData[projectId];

    if (project) {
      modalBody.innerHTML = `
                <h2 class="project-modal__title">${project.title}</h2>
                <p class="project-modal__description">${project.description}</p>
                
                <div class="project-modal__details">
                    <div class="project-modal__section">
                        <h3>Technologies Used</h3>
                        <div class="project-modal__tags">
                            ${project.technologies
                              .map(
                                (tech) =>
                                  `<span class="project-modal__tag">${tech}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                    
                    <div class="project-modal__section">
                        <h3>Key Features</h3>
                        <ul class="project-modal__features">
                            ${project.features
                              .map((feature) => `<li>${feature}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    
                    <div class="project-modal__links">
                        ${
                          project.liveLink !== "#"
                            ? `<a href="${project.liveLink}" class="button" target="_blank">Live Demo</a>`
                            : ""
                        }
                        <a href="${
                          project.githubLink
                        }" class="button button--light" target="_blank">View Code</a>
                    </div>
                </div>
            `;

      projectModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

modalClose.addEventListener("click", function () {
  projectModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

projectModal.addEventListener("click", function (e) {
  if (e.target === projectModal) {
    projectModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skills__percentage-bar");

  skillBars.forEach((bar) => {
    const percentage = bar.getAttribute("data-percentage");
    const rect = bar.getBoundingClientRect();
    const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (isInViewport && !bar.classList.contains("animated")) {
      bar.style.setProperty("--target-width", `${percentage}%`);
      bar.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: "smooth",
      });
    }
  });
});
