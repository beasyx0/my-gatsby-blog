// import React from 'react';
// import { graphql } from 'gatsby';
// import Dump from '../components/Dump';

// import formatDate from '../utils';


// export const query = graphql`
//   query ($slug: String) {
//     post(slug: { eq: $slug }) {
//       created_at
//       slug
//       author {
//         username
//       }
//       title
//       estimated_reading_time
//       featured
//       like_score
//       tags {
//         name
//       }
//     }
//   }
// `;


// const PostDetailPage = (data) => {
//   const {
//     created_at,
//     slug,
//     author: { username },
//     title,
//     estimated_reading_time,
//     featured,
//     like_score,
//     tags
//   } = data.data.post;

//   return(
//     <div>
//       <ul>
//         <li>{formatDate(created_at)}</li>
//       </ul>
//     </div>
//   );
// }

// export default PostDetailPage;
