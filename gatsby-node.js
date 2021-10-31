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
  const tagTemplate = path.resolve('src/page-templates/tag-template.js');
  const postListTemplate = path.resolve('src/page-templates/blog-list-template.js');

  // Create blog-list pages, paginated.
  const posts = result.data.allPosts.nodes;
  const totalCount = result.data.allPosts.totalCount;
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((item, i) => {
    createPage({
      path: i === 0 ? `/` : `/blog/${i + 1}`,
      component: postListTemplate,
      context: {
        totalCount,
        skip: i * postsPerPage,
        limit: postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  });

  // create tag result pages, paginated.
  const tags = result.data.allTags.group;
  tags.forEach((tag) => {
    // get all posts for specific tag so we can calculate number of pages.
    const allPostsForTag = posts.filter(post => {
      return post.frontmatter.tags.includes(tag.fieldValue)
    })

    const tagNumPages = Math.ceil(allPostsForTag.length / postsPerPage);

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
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
};
