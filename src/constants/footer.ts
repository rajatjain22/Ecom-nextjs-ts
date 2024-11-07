import { FooterLinksType } from "@/components/layout/Footer/types";

export const footerLinks: FooterLinksType = {
    services: [
        { name: "Web Development", path: "/services/web-development" },
        { name: "Mobile App Development", path: "/services/mobile-app-development" },
        { name: "UI/UX Design", path: "/services/ui-ux-design" },
        { name: "Digital Marketing", path: "/services/digital-marketing" },
    ],
    resources: [
        { name: "Webinars", path: "/resources/webinars" },
        { name: "Ebooks", path: "/resources/ebooks" },
        { name: "Templates", path: "/resources/templates" },
        { name: "Tutorials", path: "/resources/tutorials" },
    ],
    aboutUs: [
        { name: "Our Story", path: "/about/our-story" },
        { name: "Mission and Values", path: "/about/mission-values" },
        { name: "Team", path: "/about/team" },
        { name: "Testimonials", path: "/about/testimonials" },
    ],
};