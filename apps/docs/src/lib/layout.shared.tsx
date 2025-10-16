import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { PROJECT_NAME } from "@/constants";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: PROJECT_NAME,
      url: "/",
    },
    links: [
      {
        text: "Docs",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "GitHub",
        url: "https://github.com/yurisasc/starter-kit",
        external: true,
      },
    ],
  };
}
