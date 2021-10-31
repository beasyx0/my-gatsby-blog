require("dotenv").config({
  path: `.env`,
})
const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
  lastBuildDate: new Date(Date.now()).toISOString(),
  siteUrl: `https://dummy-url.com`,
  siteImageUrl: `https://dummy-url.com/siteImage.jpg`,
  authorName: `Authors Name`,
  twitterUsername: `@authorOfPosts`,
  siteLanguage: `en`,
  siteLocale: `en_us`,
};

const gitHubQuery = `
{
  viewer {
    url
    avatarUrl(size: 100)
    repositories(last: 50, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        createdAt
        updatedAt
        name
        description
        url
        languages(last: 20) {
          nodes {
            name
            color
          }
        }
      }
    }
  }
}

`

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-use-dark-mode`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
    resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js"
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
        timeout: 3500,
      }
    },
    {
    resolve: `gatsby-source-github-api`,
      options: {
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        graphQLQuery: gitHubQuery,
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      },
    }
  ],
};
