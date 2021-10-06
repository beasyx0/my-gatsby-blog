const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
};


module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
};
