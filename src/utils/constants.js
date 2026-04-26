import { Code, Database, Globe, Layout, Smartphone, Server } from "lucide-react";

export const TITLES = [
  "PHP | LARAVEL DEVELOPER",
  "BACKEND SYSTEMS ARCHITECT",
];

export const HERO_SUBTITLE = "I focus on building websites that are fast, reliable, and tailored to deliver exceptional user experiences.";

export const THEME = {
  primary: "#06b6d4",
  secondary: "#8b5cf6",
};

export const ABOUT_TEXT = [
  "I’m Muhammad Umar Rao a PHP and Laravel Developer who builds systems not just websites.",
  "I craft high performance web applications with clean architecture scalable backend logic and seamless user experiences. From dynamic frontends using HTML, CSS, and JavaScript to powerful Laravel driven backends I focus on writing code that is fast maintainable and built to last.",
  "Beyond traditional development, I work on ERP and CRM systems designing solutions that automate workflows, manage complex data and turn business operations into efficient and streamlined processes.",
  "I don’t just follow best practices I refine them. Constantly exploring modern technologies. I aim to create digital products that are not only functional but also impactful intuitive and future ready.",
];

export const SKILLS = [
  {
    name: "PHP & Laravel",
    description: "Backend development with PHP and Laravel framework",
    icon: Server,
  },
  {
    name: "JavaScript",
    description: "Frontend interactivity and dynamic content",
    icon: Code,
  },
  {
    name: "MySQL",
    description: "Database design, management and optimization",
    icon: Database,
  },
  {
    name: "HTML/CSS",
    description: "Semantic markup and responsive styling",
    icon: Layout,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    icon: Smartphone,
  },
  {
    name: "Git & GitHub",
    description: "Version control and collaborative development",
    icon: Globe,
  },
];

export const PROJECTS = [
  {
    title: "Laravel E-Commerce",
    description: "Full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind"],
    liveUrl: "https://your-live-demo-link.com",
    codeUrl: "https://github.com/your-username/ecommerce-repo",
  },
  {
    title: "Audio Extraction Tool",
    description: "Web application for extracting audio from video files with drag and drop support in browser listening and format selection.",
    tech: ["HTML5", "CSS3", "JAVASCRIPT"],
    liveUrl: "https://extractor-audio.netlify.app/",
    codeUrl: "https://github.com/umar-rao-dev/Audio-Extractor",
  },
  {
    title: "Portfolio Website",
    description: "Clean and fully responsive portfolio site built with HTML, CSS, and JavaScript, showcasing my work, technical skills, and providing smooth navigation and animations.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://umar-rao.netlify.app/",
    codeUrl: "https://github.com/umar-rao-dev/portfolio",
  }
];

export const CONTACT_INFO = {
  email: "umarraoworks@gmail.com",
  phone: "+92 335 2528762",
  socials: {
    github: "https://github.com/umar-rao-dev",
    linkedin: "https://www.linkedin.com/in/umarrao",
    instagram: "https://www.instagram.com/_rao_umar/"
  }
};
