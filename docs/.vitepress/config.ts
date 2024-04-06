import { defineConfig } from 'vitepress'
import { version } from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Week Dates',
  description: 'Utilities for working with ISO week dates and Hijri week dates using Temporal.',
  ignoreDeadLinks: true,
  lastUpdated: true,
  // head: [
  //   ['script', { defer: 'defer', 'data-domain': 'prayers-call.netlify.app', src: 'https://plausible.io/js/script.js' }],
  // ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    outline: [1, 4],

    sidebar: {
      '/': sidebarGuide(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zamanapp/week-dates' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2024-${new Date().getFullYear()} Zaman`,
    },

    externalLinkIcon: true,

    search: {
      provider: 'local',
    },
  },
  markdown: {
    theme: {
      light: 'light-plus',
      dark: 'one-dark-pro',
    },
  },
})

function nav() {
  return [
    {
      text: 'Docs',
      activeMatch: `^/(guide|recipes)/`,
      items: [
        { text: 'Guide', link: '/guide/introduction' },
        // { text: 'Recipes', link: '/recipes/formatters' },
        // {
        //   text: 'Migration from V1',
        //   link: 'https://v3-migration.vuejs.org/'
        // }
      ],
    },
    {
      text: 'API',
      link: '/api',
      activeMatch: '/api/',
    },
    { text: 'Playground', link: 'https://stackblitz.com/edit/prayer-ts?file=src%2FPrayerTimes.ts' },
    {
      text: version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/whiterocktech/prayers-call/blob/master/CHANGELOG.md',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/whiterocktech/prayers-call/blob/master/CONTRIBUTING.md',
        },
      ],
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Overview',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Getting Started', link: '/guide/getting-started' },
      ],
    },
    {
      text: 'Classes',
      collapsible: true,
      items: [
        { text: 'PlainWeekDate', link: '/classes/plain-week-date' },
      ],
    },
    {
      text: 'Calendars',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/calendars/introduction' },
        { text: 'ISO Extended Calendar', link: '/calendars/iso-extended' },
        { text: 'HWC Extended Calendars', link: '/calendars/hwc-calendars' },
      ],
    },
    {
      text: 'Primitives',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/primitives/introduction' },
        { text: 'Conversion', link: '/primitives/conversions' },
        { text: 'Formatting', link: '/primitives/formatting' },
        { text: 'Utils', link: '/primitives/utils' },
      ],
    },
    {
      text: 'API',
      collapsible: true,
      items: [{ text: 'API Reference', link: '/api' }],
    },
  ]
}
