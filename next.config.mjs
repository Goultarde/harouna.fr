/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: isProd ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  productionBrowserSourceMaps: true,
  compiler: {
    removeConsole: isProd ? { exclude: ["error"] } : false,
  },
  async rewrites() {
    if (isProd) return { beforeFiles: [], afterFiles: [], fallback: [] }
    const q = 'http://localhost:8080'
    return {
      afterFiles: [
        // Assets
        { source: '/index.css',       destination: `${q}/index.css`     },
        { source: '/prescript.js',    destination: `${q}/prescript.js`  },
        { source: '/postscript.js',   destination: `${q}/postscript.js` },
        { source: '/static/:path*',   destination: `${q}/static/:path*` },
        // Root-level static assets (images requested by Quartz SPA after stripping /blog/ prefix)
        { source: '/:file([^/]+\\.png)',  destination: `${q}/:file` },
        { source: '/:file([^/]+\\.jpg)',  destination: `${q}/:file` },
        { source: '/:file([^/]+\\.jpeg)', destination: `${q}/:file` },
        { source: '/:file([^/]+\\.webp)', destination: `${q}/:file` },
        { source: '/:file([^/]+\\.gif)',  destination: `${q}/:file` },
        { source: '/:file([^/]+\\.svg)',  destination: `${q}/:file` },
        // Quartz via /blog prefix - trailing slash on dirs to avoid Quartz 302s
        { source: '/blog',                          destination: `${q}/`                  },
        { source: '/blog/',                         destination: `${q}/`                  },
        { source: '/blog/articles',                 destination: `${q}/articles/`         },
        { source: '/blog/articles/:slug([^./]+)/',  destination: `${q}/articles/:slug`    },
        { source: '/blog/writeups',                 destination: `${q}/writeups/`         },
        { source: '/blog/writeups/:cat([^./]+)',                                destination: `${q}/writeups/:cat/`          },
        { source: '/blog/writeups/:cat([^./]+)/:sub([^./]+)',                   destination: `${q}/writeups/:cat/:sub/`      },
        { source: '/blog/writeups/:cat([^./]+)/:sub([^./]+)/:slug([^./]+)',    destination: `${q}/writeups/:cat/:sub/:slug`  },
        { source: '/blog/writeups/:cat([^./]+)/:slug([^./]+)/',                destination: `${q}/writeups/:cat/:slug`      },
        { source: '/blog/:path*',                                               destination: `${q}/:path*`                   },
        // Quartz direct SPA navigation (absolute links without /blog/ prefix)
        { source: '/articles',                    destination: `${q}/articles/`         },
        // Category folders are directories in Quartz: proxy WITH trailing slash so Quartz
        // serves index.html (200) instead of a 302 that loops against Next's trailingSlash:false.
        { source: '/articles/active-directory',   destination: `${q}/articles/active-directory/` },
        { source: '/articles/:slug([^./]+)',      destination: `${q}/articles/:slug`    },
        { source: '/articles/:path*',             destination: `${q}/articles/:path*`   },
        { source: '/writeups',                    destination: `${q}/writeups/`         },
        { source: '/writeups/:cat([^./]+)',                                destination: `${q}/writeups/:cat/`          },
        { source: '/writeups/:cat([^./]+)/:sub([^./]+)',                   destination: `${q}/writeups/:cat/:sub/`      },
        { source: '/writeups/:cat([^./]+)/:sub([^./]+)/:slug([^./]+)',    destination: `${q}/writeups/:cat/:sub/:slug`  },
        { source: '/writeups/:path*',                                      destination: `${q}/writeups/:path*`          },
        // Tags
        { source: '/tags',                        destination: `${q}/tags/`             },
        { source: '/tags/:path*',                 destination: `${q}/tags/:path*`       },
      ],
      fallback: [
        // Quartz SPA generates absolute links like /forwardshell (no /blog/ prefix).
        // Catch any top-level slug that isn't a Next.js page.
        { source: '/:slug([a-z][a-z-]*)', destination: `${q}/:slug` },
      ],
    }
  },
}

export default nextConfig
