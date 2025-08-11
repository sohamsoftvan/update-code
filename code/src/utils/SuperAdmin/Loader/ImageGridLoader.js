// import React from 'react'
// import ContentLoader from 'react-content-loader'
//
// const ImageGridLoader = props => (
//   <ContentLoader
//     width={"100%"}
//     height={"100%"}
//     viewBox="0 0 800 575"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb"
//     {...props}
//   >
//       <rect x="12" y="58" rx="2" ry="2" width="220" height="211" />
//       <rect x="240" y="57" rx="2" ry="2" width="220" height="211" />
//       <rect x="467" y="56" rx="2" ry="2" width="220" height="211" />
//       <rect x="12" y="283" rx="2" ry="2" width="220" height="211" />
//       <rect x="240" y="281" rx="2" ry="2" width="220" height="211" />
//       <rect x="468" y="279" rx="2" ry="2" width="220" height="211" />
//   </ContentLoader>
// );
// export default ImageGridLoader;

import React from 'react';
import ContentLoader from 'react-content-loader';

const ImageGridLoader = (props) => (
    <ContentLoader
        width="100%"
        height="100%"
        viewBox="0 0 800 575"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        {/* Row 1 */}
        <rect x="12" y="58" rx="8" ry="8" width="220" height="211" />
        <rect x="270" y="58" rx="8" ry="8" width="220" height="211" />
        <rect x="528" y="58" rx="8" ry="8" width="220" height="211" />

        {/* Row 2 */}
        <rect x="12" y="310" rx="8" ry="8" width="220" height="211" />
        <rect x="270" y="310" rx="8" ry="8" width="220" height="211" />
        <rect x="528" y="310" rx="8" ry="8" width="220" height="211" />
    </ContentLoader>
);

export default ImageGridLoader;
