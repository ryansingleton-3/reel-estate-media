// Function to handle fade-in and slide-up effect
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in"); // Select elements with the class

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.85; // 50% in view

    if (isVisible) {
      el.classList.add("opacity-100", "translate-y-0");
      el.classList.remove("opacity-0", "translate-y-10");
    }
  });
}

// Run animation function on scroll
document.addEventListener("scroll", handleScrollAnimations);

// Run on page load to check if elements are already in view
document.addEventListener("DOMContentLoaded", handleScrollAnimations);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed headers if needed
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobile-menu");
  const openMenuBtn = document.getElementById("open-menu"); // Add an ID to the menu button in HTML
  const closeMenuBtn = document.getElementById("close-menu");

  // Open menu
  openMenuBtn.addEventListener("click", () => {
    menu.classList.remove("hidden"); // Show menu
  });

  // Close menu
  closeMenuBtn.addEventListener("click", () => {
    menu.classList.add("hidden"); // Hide menu
  });

  // Close when clicking outside the menu
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !openMenuBtn.contains(event.target)) {
      menu.classList.add("hidden"); // Hide if clicking outside
    }
  });
});

// Array of statistics
const statsData = [
  {
    id: "stat1",
    number: 403,
    blurb: "More Inquiries",
    description: "Property listings with video get 403% more inquiries.",
    iconPath: "/Assets/phone-svgrepo-com.svg",
  },
  {
    id: "stat2",
    number: 32,
    blurb: "Faster Sales",
    description:
      "Properties with video tours sell up to 32% faster than listings without.",
    iconPath: "/Assets/lightning-svgrepo-com.svg",
  },
  {
    id: "stat3",
    number: 73,
    blurb: "More Likely",
    description:
      "73% of homeowners are more likely to list with an agent who offers video marketing.",
    iconPath: "/Assets/video-svgrepo-com.svg",
  },
  {
    id: "stat4",
    number: 63,
    blurb: "Make an Offer",
    description: "Homes with video sell 50% faster.",
    iconPath: "/Assets/money-bag-svgrepo-com.svg",
  },
  {
    id: "stat5",
    number: 80,
    blurb: "Increased Conversion Rate",
    description:
      "Video tours increase conversion rates by 80% for online property listings.",
    iconPath: "/Assets/chart-line-up-svgrepo-com.svg",
  },
  {
    id: "stat6",
    number: 62,
    blurb: "Say it's Essential",
    description:
      "62% of homebuyers say video is essential when searching for a home online.",
    iconPath: "/Assets/heart-svgrepo-com.svg",
  },
];

// Function to dynamically create statistics elements in two columns
function populateStats() {
  const statsContainer = document.getElementById("stats-container");
  statsContainer.innerHTML = ""; // Clear existing content

  statsData.forEach((stat) => {
    const statElement = document.createElement("div");
    statElement.classList.add("flex", "flex-col", "text-left");

    // Default value set in HTML so it’s never 0%
    statElement.innerHTML = `
      <dd class="text-3xl font-bold text-[#4F46E5] sm:text-4xl sm:tracking-tight" id="${stat.id}">${stat.number}%</dd>
      <dt class="text-lg font-medium text-gray-500">${stat.blurb}</dt>
      <p class="mt-1 text-gray-600 text-sm">${stat.description}</p>
    `;

    statsContainer.appendChild(statElement);
  });
}

// Function to animate number counting
function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  if (!obj) return;

  // Set the default value in case animation fails
  obj.textContent = `${end}%`;

  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = Math.min((timestamp - startTime) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start) + "%";
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Function to start counting when section is visible
function startCounting() {
  statsData.forEach((stat) => {
    let obj = document.getElementById(stat.id);
    if (!obj) return;

    // Check if function already ran
    if (obj.textContent !== "0%") return;

    // Run animation if visible, otherwise set the value instantly
    if (document.visibilityState === "visible") {
      animateValue(stat.id, 0, stat.number, 2000);
    } else {
      obj.textContent = `${stat.number}%`; // Just set the final value
    }
  });
}

// Observer to trigger counting when stats section enters the viewport
let observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      startCounting();
      observer.disconnect();
    }
  },
  { threshold: 0.5 }
);

// Run the functions after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    populateStats();
    observer.observe(document.querySelector("#stats"));
  }, 500); // Small delay to ensure visibility
});

// Array of feature data
const featuresData = [
  {
    title: "Cinematic Walkthroughs",
    description:
      "Professional video tours that highlight your property's best features and create lasting impressions.",
    iconPath: "/Assets/movie.svg",
  },
  {
    title: "Stabilization",
    description:
      "Gimbal stabilization to create smooth, professional videos that make your listings look polished and high-end.",
    iconPath: "/Assets/video.svg",
  },
  {
    title: "Professional Editing",
    description:
      "Expert editing services that transform raw footage into captivating visual stories for your listings.",
    iconPath: "/Assets/scissor.svg",
  },
  {
    title: "Branding",
    description:
      "Branded & unbranded versions, as well as custom agent branding to attract more buyers and strengthen your personal brand.",
    iconPath: "/Assets/shield.svg",
  },
  {
    title: "Customization",
    description:
      "Custom feature overlay copy for each room and MLS & social media optimization, making key features stand out & engaging buyers.",
    iconPath: "/Assets/pencil.svg",
  },
  {
    title: "Fast Turnaround",
    description:
      "Professionally taken, edited, and ready-to-use walkthrough videos in as fast as 24 hours, helping you market listings faster and attract more buyers.",
    iconPath: "/Assets/zap.svg",
  },
];

// Function to populate the Features section dynamically
function populateFeatures() {
  const featuresContainer = document.getElementById("features-container");
  featuresContainer.innerHTML = ""; // Clear existing content

  featuresData.forEach((feature) => {
    const featureElement = document.createElement("div");
    featureElement.innerHTML = `
      <dt class="text-base/7 font-semibold text-gray-900">
        <div class="mb-6 flex size-10 items-center justify-center rounded-lg bg-[#4F46E5] w-16 h-16">
          <img class="size-6 invert text-white" src="${feature.iconPath}" alt="${feature.title}">
        </div>
        ${feature.title}
      </dt>
      <dd class="mt-1 text-base/7 text-gray-600">${feature.description}</dd>
    `;

    featuresContainer.appendChild(featureElement);
  });
}

// Run function after the DOM loads
document.addEventListener("DOMContentLoaded", populateFeatures);

// Pricing Data
const pricingPlans = [
  {
    name: "Essential",
    price: 199,
    features: [
      "1 video per month",
      "48-hour turnaround",
      "MLS & social media optimized",
      "Branded & unbranded versions",
      "Agent branding & animated intro",
      "1 round of revisions",
      "$150 per additional video",
    ],
    link: "https://buy.stripe.com/aEU4ib7Xa0sk5gsdQR",
    highlight: false,
  },
  {
    name: "Growth",
    price: 599,
    features: [
      "5 videos per month",
      "24-hour turnaround",
      "MLS & social media optimized",
      "Branded & unbranded versions",
      "Agent branding & animated intro",
      "2 rounds of revisions",
      "Priority scheduling",
      "Custom video requests",
      "$99 per additional video",
    ],
    link: "https://buy.stripe.com/eVa9CvfpC3Ew38kcMO",
    highlight: true, // Highlighted plan
  },
  {
    name: "Unlimited",
    price: 1499,
    features: [
      "Unlimited videos (one at a time)",
      "24-hour turnaround",
      "MLS & social media optimized",
      "Branded & unbranded versions",
      "Agent branding & animated intro",
      "Unlimited revisions",
      "Priority scheduling",
      "Custom video requests",
    ],
    link: "https://buy.stripe.com/cN201V91e6QI9wI4gj",
    highlight: false,
  },
];

// Generate Pricing Cards
function renderPricing() {
  const container = document.getElementById("pricing-container");
  container.innerHTML = ""; // Clear previous content

  pricingPlans.forEach((plan) => {
    const isHighlighted = plan.highlight
      ? "bg-white shadow-xl ring-2 ring-gray-900/20 text-gray-900 scale-105 xl:scale-110 xl:p-12 z-20"
      : "bg-[#1E293B] ring-1 ring-white/10 text-white lg:translate-y-6";

    const buttonColor = plan.highlight
      ? "bg-indigo-600 text-white hover:bg-indigo-500"
      : "bg-white/10 text-white hover:bg-white/20";

    const checkmarkColor = plan.highlight ? "text-black" : "invert";

    const featuresList = plan.features
      .map(
        (feature) => `
        <li class="flex items-center gap-x-2">
          <img class="size-5 ${checkmarkColor}" src="/Assets/check-mark.svg" alt="checkmark">
          ${feature}
        </li>`
      )
      .join("");

    const planHTML = `
      <div class="relative rounded-2xl transition-transform duration-300 ${isHighlighted} p-8 xl:p-10 hover:scale-105">
        <h3 class="text-lg font-semibold">${plan.name}</h3>
        <div class="mt-2 flex items-center gap-x-4">
          <p class="text-4xl font-bold tracking-tight">${
            plan.price ? `$${plan.price}/mo` : "Contact Us"
          }</p>
        </div>
        <ul class="mt-4 space-y-2 text-sm">${featuresList}</ul>
        <a href="${
          plan.link
        }" class="mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold ${buttonColor}">
          Choose Plan
        </a>
      </div>
    `;

    container.innerHTML += planHTML;
  });
}

// Load pricing on page load
document.addEventListener("DOMContentLoaded", renderPricing);

// Array of FAQ items
const faqs = [
  {
    question: "How does the subscription work?",
    answer:
      "We offer three monthly plans tailored to your needs. Each plan includes a set number of professionally edited real estate videos per month, with a guaranteed 48-hour or 24-hour turnaround (depending on the plan). If you need additional videos, you can purchase them at a discounted rate. The Unlimited Plan allows you to submit as many video requests as needed, one at a time.",
  },
  {
    question: "What do I need to provide to get started?",
    answer:
      "For the best results, you’ll need to provide:<br><br>• The property address and any specific shots or angles you’d like to highlight.<br>• Branding details, such as logos, agent introductions, and any special requests for text overlays.<br>• MLS listing details to ensure compliance and optimization for real estate platforms.<br><br>We’ll handle the filming and editing, making it easy for you to showcase your listings!",
  },
  {
    question: "Can I customize my videos?",
    answer:
      "Absolutely! Every video includes:<br><br>✔ Custom branding and agent intro<br>✔ MLS-compliant and social media-friendly formats<br>✔ Music selection and text overlays<br>✔ Up to two rounds of revisions (Growth Plan) or unlimited revisions (Unlimited Plan)<br><br>For Growth and Unlimited plan members, we also accommodate custom video requests beyond standard listing videos.",
  },
  {
    question: "How do I schedule a shoot?",
    answer:
      "Once subscribed, you’ll receive access to our scheduling system, where you can book video shoots based on availability. Higher-tier plans receive priority scheduling, ensuring faster service during peak times.",
  },
  {
    question: "What makes you different from other videographers?",
    answer:
      "Unlike traditional videographers who charge per video, we offer a subscription-based model that helps you plan your marketing budget more efficiently. Our benefits include:<br><br>✔ Fast turnaround times (48-24 hours)<br>✔ Affordable, predictable pricing<br>✔ Agent-focused branding and marketing expertise<br>✔ No hidden fees—just clear, straightforward pricing<br><br>We’re here to help you sell properties faster with high-quality, engaging videos that make you stand out.",
  },
  {
    question: "What if I don’t use all my videos in a month?",
    answer:
      "Videos do not roll over to the next month. To keep our turnaround times fast and ensure quality service, all videos must be used within the billing cycle. If you expect a lighter month, consider starting with the Essential Plan and upgrading as needed.",
  },
];

// Function to populate FAQs dynamically
function populateFAQs() {
  const faqContainer = document.getElementById("faq-container");
  faqContainer.innerHTML = ""; // Clear existing content

  faqs.forEach((faq, index) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("py-6", "first:pt-0", "last:pb-0");

    faqItem.innerHTML = `
      <dt>
        <button 
          type="button" 
          class="flex w-full items-start justify-between text-left text-gray-900 toggle-faq"
          aria-controls="faq-${index}" 
          aria-expanded="false"
        >
          <span class="text-base/7 font-semibold">${faq.question}</span>
          <span class="ml-6 flex h-7 items-center">
            <!-- Plus icon (collapsed) -->
            <svg class="size-6 expand-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <!-- Minus icon (expanded) -->
            <svg class="hidden size-6 collapse-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
            </svg>
          </span>
        </button>
      </dt>
      <dd class="mt-2 pr-12 hidden faq-answer" id="faq-${index}">
        <p class="text-base/7 text-gray-600">${faq.answer}</p>
      </dd>
    `;

    faqContainer.appendChild(faqItem);
  });

  // Add event listeners for expand/collapse functionality
  document.querySelectorAll(".toggle-faq").forEach((button) => {
    button.addEventListener("click", function () {
      const answer = this.closest("dt").nextElementSibling; // Get the corresponding answer
      const expandIcon = this.querySelector(".expand-icon");
      const collapseIcon = this.querySelector(".collapse-icon");

      const isExpanded = this.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        answer.classList.add("hidden");
        expandIcon.classList.remove("hidden");
        collapseIcon.classList.add("hidden");
      } else {
        answer.classList.remove("hidden");
        expandIcon.classList.add("hidden");
        collapseIcon.classList.remove("hidden");
      }

      this.setAttribute("aria-expanded", !isExpanded);
    });
  });
}

// Load FAQs on page load
document.addEventListener("DOMContentLoaded", populateFAQs);
