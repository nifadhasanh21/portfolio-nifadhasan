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
    title: "Personal Portfolio Website",
    description:
      "A responsive personal portfolio website designed to showcase my projects, technical skills, experience, and professional profile. The website focuses on clean UI, responsive layouts, smooth interactions, and a professional user experience.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
    ],
    features: [
      "Responsive layout",
      "Smooth scrolling",
      "Interactive sections",
      "Project showcase",
      "Contact section",
      "<br />",
    ],
    liveLink: "https://www.nifadhasan.com/",
    githubLink: "https://github.com/nifadhasanh21/Portfolio-nifadh21",
    images: ["work1.jpg"],
  },

  2: {
    title: "Healthcare Management System",
    description:
      "A C-based healthcare management application designed to manage patient records, appointments, and medical staff. The project demonstrates structured programming, data management, searching, updating, and file handling.",
    technologies: [
      "C Programming",
      "Data Structures",
      "File Handling",
    ],
    features: [
      "Patient record management",
      "Appointment management",
      "Staff management",
      "Add and update records",
      "Search functionality",
      "File-based data storage",
      "<br />",
    ],
    liveLink: "#",
    githubLink:
      "https://github.com/nifadhasanh21/Health-Care-Management-System",
    images: ["work2.jpg"],
  },

  3: {
    title: "Library Management System",
    description:
      "A C-based library management system developed to organize books, members, and borrowing transactions. The application demonstrates practical use of data structures, file handling, and structured programming concepts.",
    technologies: [
      "C Programming",
      "Data Structures",
      "File Handling",
    ],
    features: [
      "Book management",
      "Member management",
      "Book issue and return",
      "Transaction tracking",
      "Search functionality",
      "File-based data management",
      "<br />",
    ],
    liveLink: "#",
    githubLink:
      "https://github.com/nifadhasanh21/Library-Management-System-C",
    images: ["work3.jpg"],
  },

  4: {
    title: "TynecXio",
    description:
      "A modern business website built with React to present services, company information, and digital solutions through a responsive and professional interface. The project focuses on modern UI design, reusable components, and a smooth user experience.",
    technologies: [
      "React",
      "JavaScript",
      "Responsive UI",
      "Component-Based Development",
      "Vercel",
    ],
    features: [
      "Modern responsive interface",
      "Reusable React components",
      "Service presentation",
      "Interactive sections",
      "Mobile-friendly design",
      "Professional business UI",
      "<br />",
    ],
    liveLink: "https://www.tynecxio.com/",
    githubLink: "https://github.com/nifadhasanh21/tynecxio",
    images: ["work4.jpg"],
  },

  5: {
    title: "BloodBridge DIU",
    description:
      "A web-based blood donation platform designed to connect blood donors with people in need. The application provides donor registration, blood search, emergency requests, authentication, notifications, and administrative functionality.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Supabase",
      "Responsive Design",
    ],
    features: [
      "Donor registration",
      "Blood donor search",
      "Emergency blood requests",
      "User authentication",
      "Notifications",
      "Admin dashboard",
      "Supabase database integration",
      "<br />",
    ],
    liveLink: "https://bloodwebapp.netlify.app/",
    githubLink: "https://github.com/nifadhasanh21/Blood-Doner-Web",
    images: ["work5.jpg"],
  },

  6: {
    title: "N.I.F.A.D AI Chatbot",
    description:
      "A JavaScript-based AI chatbot created to provide an interactive conversational experience through a simple and responsive web interface. The project demonstrates JavaScript-based interaction, dynamic UI updates, and chatbot functionality.",
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "AI Chatbot",
      "Responsive UI",
    ],
    features: [
      "Interactive chat interface",
      "Dynamic message handling",
      "Responsive design",
      "User-friendly interface",
      "Real-time conversation experience",
      "<br />"
    ],
    liveLink: "https://ai.nifadhasan.com/",
    githubLink: "https://github.com/nifadhasanh21/chatbot-nifad",
    images: ["work6.jpg"],
  },

  7: {
    title: "Money Manager",
    description:
      "A responsive personal finance management application designed to help users track income, expenses, and transactions through an interactive dashboard. The application combines React with Supabase for a modern and practical financial management experience.",
    technologies: [
      "React",
      "JavaScript",
      "Supabase",
      "Recharts",
      "Responsive UI",
    ],
    features: [
      "Income tracking",
      "Expense tracking",
      "Transaction management",
      "Financial dashboard",
      "Interactive charts",
      "Supabase integration",
      "Responsive interface",
      "<br />",
    ],
    liveLink: "https://management.nifadhasan.com/",
    githubLink:
      "https://github.com/nifadhasanh21/money-management-app",
    images: ["work7.jpg"],
  },

  8: {
    title: "DIU SWE Routine",
    description:
      "A student-focused academic routine management application built with React and Supabase. The application helps students organize class schedules, course information, and daily academic routines through a clean and responsive interface.",
    technologies: [
      "React",
      "JavaScript",
      "Supabase",
      "Responsive UI",
    ],
    features: [
      "Class routine management",
      "Course information",
      "Daily schedule view",
      "Supabase database integration",
      "Responsive student interface",
      "Interactive routine experience",
      "<br />",
    ],
    liveLink: "https://swe-routine.vercel.app/",
    githubLink: "https://github.com/nifadhasanh21/diu-swe-routine",
    images: ["work8.jpg"],
  },

  9: {
    title: "GasTracker",
    description:
      "A JavaScript-based web application powered by Supabase for managing and tracking gas-related information. The project focuses on practical data management, interactive functionality, and a simple responsive user experience.",
    technologies: [
      "JavaScript",
      "Supabase",
      "HTML5",
      "CSS3",
      "Responsive UI",
    ],
    features: [
      "Gas information tracking",
      "Data management",
      "Supabase database integration",
      "Interactive interface",
      "Responsive design",
      "<br />",
    ],
    liveLink: "https://github.com/nifadhasanh21/Gas-Usage-Tracking",
    githubLink: "https://gasusage.netlify.app/",
    images: ["work9.jpg"],
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
