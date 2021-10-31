const escapeStringRegexp = require("escape-string-regexp");

const pagePath = `content`;
const indexName = `Pages`;

const pageQuery = `{
  pages: allMdx(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" }
    }) {
      nodes {
        frontmatter {
          title
        }
        id
        slug
        excerpt(pruneLength: 5000)
      }
    }
  }`

function pageToAlgoliaRecord({ id, frontmatter, ...rest }) {
  return {
    objectID: id,
    ...frontmatter,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.nodes.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
