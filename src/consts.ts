// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Website Template";
export const SITE_DESCRIPTION = "This is a website template";

export const BASE_IMAGE_PATH = "/src/assets/";
export const BASE_PAGE_PATH = "/src/pages/";

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Why We're Different", href: "/#about" },
  { label: "Get In Touch", href: "/#contact" },
];

export const SPACER_HEIGHT = 150;

export type JustifyType = "start" | "center" | "between" | "around" | "evenly";
export type AlignType = "start" | "center" | "end" | "stretch";
export type WidthType = "small" | "normal" | "wide" | "full";
export type GapType = "xs" | "sm" | "md" | "lg";
export type TextAlignType = "left" | "center" | "right" | "justify";
