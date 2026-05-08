import { 
  IconShoppingCart, 
  IconWorldWww, 
  IconUserCircle, 
  IconCode, 
  IconPalette,
  IconBolt,
  IconUsers,
  IconLifebuoy,
  IconBrush,
  IconMap2,
  IconTerminal2,
  IconTestPipe,
  IconRocket
} from "@tabler/icons-react";

export const footerlabels: { label: string; href: string }[] = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export const pricedeta = [
  {
    title: "E-commerce App",
    short: "Full Stack",
    icon: <IconShoppingCart size={48} stroke={1.5} />,
    background: "bg-primary bg-opacity-20",
    price: "React & Firebase",
    mark: "Live Project",
    padding: "p-1",
  },
  {
    title: "Modern Web Page",
    short: "UI/UX Design",
    icon: <IconWorldWww size={48} stroke={1.5} />,
    background: "bg-light_grey",
    price: "Next.js & Tailwind",
    mark: "Responsive",
    padding: "p-1",
  },
  {
    title: "Portfolio Site",
    short: "Personal",
    icon: <IconUserCircle size={48} stroke={1.5} />,
    background: "bg-primary bg-opacity-20",
    price: "Next.js & Framer",
    mark: "Active",
    padding: "p-1",
  },
  {
    title: "Inventory System",
    short: "Management",
    icon: <IconCode size={48} stroke={1.5} />,
    background: "bg-light_grey",
    price: "React.js",
    mark: "Completed",
    padding: "p-1",
  },
  {
    title: "Graphic Design",
    short: "Design",
    icon: <IconPalette size={48} stroke={1.5} />,
    background: "bg-light_grey",
    price: "Adobe",
    mark: "Completed",
    padding: "p-1",
  }
];

export const perksData = [
  { 
    icon: <IconBolt size={32} />, 
    title: "Fast Delivery", 
    text: "Building and deploying high-quality web solutions efficiently.", 
    space: "lg:mt-8" 
  },
  { 
    icon: <IconUsers size={32} />, 
    title: "Collaboration", 
    text: "Working closely with clients to bring their vision to life.", 
    space: "lg:mt-14" 
  },
  { 
    icon: <IconLifebuoy size={32} />, 
    title: "Tech Support", 
    text: "Providing ongoing maintenance and updates for every project.", 
    space: "lg:mt-4" 
  },
  { 
    icon: <IconBrush size={32} />, 
    title: "Creative Artistry", 
    text: "Bringing ideas to life through stunning graphics. From social media visuals to complex brand assets, I design with precision and style.", 
    space: "lg:mt-4" 
  },
];

export const timelineData = [
  { 
    icon: <IconMap2 size={24} />, 
    title: "Planning", 
    text: "Analyzing requirements and mapping project architecture.", 
    position: "md:top-0 md:left-0",
    href: "#" 
  },
  { 
    icon: <IconTerminal2 size={24} />, 
    title: "Development", 
    text: "Writing clean, efficient code using modern frameworks.", 
    position: "md:top-0 md:right-0",
    href: "#" 
  },
  { 
    icon: <IconTestPipe size={24} />, 
    title: "Testing", 
    text: "Ensuring high performance and bug-free user experience.", 
    position: "md:bottom-0 md:left-0",
    href: "#" 
  },
  { 
    icon: <IconRocket size={24} />, 
    title: "Deployment", 
    text: "Launching the product and providing continuous support.", 
    position: "md:bottom-0 md:right-0",
    href: "#" 
  }
];

export const CryptoData = [
  { name: "React / Next.js", price: "Expert" },
  { name: "Node / Firebase", price: "Advanced" },
  { name: "Tailwind / CSS", price: "Expert" },
  { name: "JavaScript / ES6", price: "Expert" },
];