// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './tailwind.postcss'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import type { EnhanceAppContext } from 'vitepress'
import FloatingVue from 'floating-vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
    app.use(FloatingVue, 
    //   { 
    //   themes: {
    //     'twoslash': {
    //       $extend: 'dropdown',
    //       triggers: isMobile ? ['touch'] : ['hover', 'touch'],
    //       popperTriggers: isMobile ? ['touch'] : ['hover', 'touch'],
    //       placement: 'bottom-start',
    //       overflowPadding: 10,
    //       delay: 0,
    //       handleResize: false,
    //       autoHide: true,
    //       instantMove: true,
    //       flip: false,
    //       arrowPadding: 8,
    //       autoBoundaryMaxSize: true,
    //     },
    //     'twoslash-query': {
    //       $extend: 'twoslash',
    //       triggers: ['click'],
    //       popperTriggers: ['click'],
    //       autoHide: false,
    //     },
    //     'twoslash-completion': {
    //       $extend: 'twoslash-query',
    //       triggers: ['click'],
    //       popperTriggers: ['click'],
    //       autoHide: false,
    //       distance: 0,
    //       arrowOverflow: true,
    //     } 
    //   }
    // }
  )
  },
} satisfies Theme
