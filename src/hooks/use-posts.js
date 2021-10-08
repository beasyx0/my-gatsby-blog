// import { useStaticQuery, graphql } from 'gatsby';


// export default function usePosts() {
//   const data = useStaticQuery(graphql`
//     query {
//       allPost {
//         nodes {
//           created_at(formatString: "YYYY MMMM Do")
//           estimated_reading_time
//           featured
//           id
//           like_score
//           slug
//           title
//           tags {
//             name
//           }
//           author {
//             username
//           }
//         }
//       }
//     }
//   `);
//   const posts = data.allPost.nodes.map(node => {
//     const { 
//       created_at, 
//       estimated_reading_time, 
//       featured, id, 
//       like_score, 
//       slug, 
//       title, 
//       tags, 
//       author 
//     } = node;
//     return {
//       created_at,
//       estimated_reading_time,
//       featured,
//       id,
//       like_score,
//       slug,
//       title,
//       tags: tags.map(tag => tag.name),
//       author: author.username,
//     }
//   });
//   return {
//     posts
//   }
// }