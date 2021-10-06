const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
};


module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-dark-mode`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
};
