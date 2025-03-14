
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 8747, hash: '6c81a1b0399d8bb9b2a0f3cc0788568b3d30c55f4928494613b6c4dfeb88c4bf', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2197, hash: '567670bcf48275f59a66c5ea8126e5a1eb285644030b10adbf5b23116edbe7f1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-AUNJA2OO.css': {size: 7103, hash: 'zVYTCHlXX3U', text: () => import('./assets-chunks/styles-AUNJA2OO_css.mjs').then(m => m.default)}
  },
};
