export const footerlabels: { label: string; herf: string }[] = [
  { label: "Home", herf: "#" },
  { label: "Services", herf: "#services" },
  { label: "Projects", herf: "#projects" },
  { label: "Stack", herf: "#stack" },
  { label: "Contact", herf: "#contact" },
];

export const pricedeta: {
  title: string;
  short: string;
  icon: string;
  background: string;
  price: string;
  mark: string;
  width: number;
  height: number;
  padding: string;
}[] = [
  {
    title: "E-commerce App",
    short: "Full Stack",
    icon: "/images/icons/application.png",
    background: "bg-primary bg-opacity-20",
    price: "React & Firebase",
    mark: "Live Project",
    width: 48,
    height: 48,
    padding: "p-1",
  },
  {
    title: "Modern Web Page",
    short: "UI/UX Design",
    icon: "/images/icons/website.png",
    background: "bg-light_grey",
    price: "Next.js & Tailwind",
    mark: "Responsive",
    width: 48,
    height: 48,
    padding: "p-1",
  },
  {
    title: "Portfolio Site",
    short: "Personal",
    icon: "/images/icons/portfolio.png",
    background: "bg-primary bg-opacity-20",
    price: "Next.js & Framer",
    mark: "Active",
    width: 48,
    height: 48,
    padding: "p-1",
  },
  {
    title: "Inventory System",
    short: "Management",
    icon: "/images/icons/code.png",
    background: "bg-light_grey",
    price: "React.js",
    mark: "Completed",
    width: 48,
    height: 48,
    padding: "p-1",
  }
];

export const portfolioData: { image: string; title: string }[] = [
  { image: "/images/portfolio/icon-wallet.svg", title: "Clean Architecture" },
  { image: "/images/portfolio/icon-vault.svg", title: "Secure Authentication" },
  { image: "/images/portfolio/icon-mobileapp.svg", title: "Responsive Design" },
];

export const upgradeData: { title: string }[] = [
  { title: "Optimized Performance" },
  { title: "Scalable Codebase" },
  { title: "Modern Tech Stack" },
  { title: "User-Centric Design" },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
  { 
    icon: "/images/perks/icon-support.svg", 
    title: "Fast Delivery", 
    text: "Building and deploying high-quality web solutions efficiently.", 
    space: "lg:mt-8" 
  },
  { 
    icon: "/images/perks/icon-community.svg", 
    title: "Collaboration", 
    text: "Working closely with clients to bring their vision to life.", 
    space: "lg:mt-14" 
  },
  { 
    icon: "/images/perks/icon-academy.svg", 
    title: "Tech Support", 
    text: "Providing ongoing maintenance and updates for every project.", 
    space: "lg:mt-4" 
  },
];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
  { 
    icon: "/images/timeline/icon-planning.svg", 
    title: "Planning", 
    text: "Analyzing requirements and mapping project architecture.", 
    position: "md:top-0 md:left-0" 
  },
  { 
    icon: "/images/timeline/icon-refinement.svg", 
    title: "Development", 
    text: "Writing clean, efficient code using modern frameworks.", 
    position: "md:top-0 md:right-0" 
  },
  { 
    icon: "/images/timeline/icon-prototype.svg", 
    title: "Testing", 
    text: "Ensuring high performance and bug-free user experience.", 
    position: "md:bottom-0 md:left-0" 
  },
  { 
    icon: "/images/timeline/icon-support.svg", 
    title: "Deployment", 
    text: "Launching the product and providing continuous support.", 
    position: "md:bottom-0 md:right-0" 
  }
];

export const CryptoData: { name: string; price: string }[] = [
  { name: "React / Next.js", price: "Expert" },
  { name: "Node / Firebase", price: "Advanced" },
  { name: "Tailwind / CSS", price: "Expert" },
  { name: "JavaScript / ES6", price: "Expert" },
];