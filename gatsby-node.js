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