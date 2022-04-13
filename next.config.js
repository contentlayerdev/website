const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  images: {
    domains: [
      'pbs.twimg.com',
      'avatars.githubusercontent.com',
      's3.us-west-2.amazonaws.com',
      's3-us-west-2.amazonaws.com',
      'schickling.notion.site',
    ],
  },
})
