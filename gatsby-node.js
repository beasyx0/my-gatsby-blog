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
const _ = require('lodash');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const tagTemplate = path.resolve('src/pages/tag-template.js');

  const result = await graphql(`
    query {
      allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);
  const tags = result.data.allMdx.group;
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
}
