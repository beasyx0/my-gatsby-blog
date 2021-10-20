// const fetch = require('node-fetch');

// // source and create nodes into the data layer for each post returned from the API.
// exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
//   const response = await fetch('http://127.0.0.1:8000/api/v1/posts/posts/')
//   const json = await response.json();
//   const { count, next, previous, results = [] } = json;
//   const { createNode } = actions;
//   const NODE_TYPE = 'Post'

//   results.forEach((node, index) => {
//     createNode({
//       ...node,
//       id: createNodeId(`Post-${node.slug}`),
//       parent: null,
//       children: [],
//       internal: {
//         type: NODE_TYPE,
//         content: JSON.stringify(node),
//         contentDigest: createContentDigest(node)
//       }
//     });
//   })
// };

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');

exports.createPages = async ({ actions, graphql, reporter }) => {

  const result = await graphql(`
    query ALL_POST_AND_TAG_QUERY {
      allPosts: allMdx(
        sort: {fields: [frontmatter___date], order: DESC}) {
        nodes {
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY @ h:mm a")
            tags
            cover {
              publicURL
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                )
              }
            }
          }
          excerpt(pruneLength: 150)
          slug
          timeToRead
        }
        totalCount
      }
      allTags: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  };

  const { createPage } = actions;
  const tagTemplate = path.resolve('src/pages/tag-template.js');
  const postListTemplate = path.resolve('src/pages/blog-list-template.js');

  // Create blog-list pages, paginated.
  const posts = result.data.allPosts.nodes;
  const totalCount = result.data.allPosts.totalCount;
  const postsPerPage = 1
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((item, i) => {
    createPage({
      path: i === 0 ? `/` : `/blog/${i + 1}`,
      component: postListTemplate,
      context: {
        totalCount,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  });

  // create tag result pages, paginated.
  const tags = result.data.allTags.group;
  tags.forEach((tag) => {
    // get all posts for specific tag so we can calculate number of pages.
    const allTagPosts = posts.filter(post => {
      return post.frontmatter.tags.includes(tag.fieldValue)
    })
    const tagNumPages = Math.ceil(allTagPosts.length / postsPerPage);

    Array.from({ length: tagNumPages }).forEach((item, i) => {
      createPage({
        path: i === 0 ? (
            `/tags/${_.kebabCase(tag.fieldValue)}/`
          ) : (
            `/tags/${_.kebabCase(tag.fieldValue)}/${i + 1}/`
          ),
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          tagNumPages,
          currentPage: i + 1,
        },
      })
    });
  });
};


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
};
