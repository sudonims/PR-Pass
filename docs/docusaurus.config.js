module.exports = {
  title: "PR Pass",
  tagline: "An easy password generating solution.",
  url: "https://prpass.sudonims.tech",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "sudonims", // Usually your GitHub org/user name.
  projectName: "PR-Pass", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "PR Pass",
      logo: {
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/sudonims/PR-Pass",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/sudonims/PR-Pass",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PR Pass, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js")
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
