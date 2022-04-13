const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  images: {
    domains: ['pbs.twimg.com', 'avatars.githubusercontent.com', 'i.imgur.com'],
  },
})
