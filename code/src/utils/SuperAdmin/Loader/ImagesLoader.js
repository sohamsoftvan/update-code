import React from 'react';
import ContentLoader from 'react-content-loader';

const ImagesLoader = (props) => (
    <ContentLoader
        width="100%" /* Full width of the container */
        height="300px" /* Adjusted height */
        viewBox="0 0 1200 200" /* Adjusted viewBox to accommodate larger boxes */
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        {/* Wider boxes with equal spacing */}
        <rect x="10" y="20" rx="8" ry="18" width="360" height="220" /> {/* Box 1 */}
        <rect x="410" y="20" rx="8" ry="18" width="360" height="220" /> {/* Box 2 */}
        <rect x="810" y="20" rx="8" ry="18" width="360" height="220" /> {/* Box 3 */}
    </ContentLoader>
);

ImagesLoader.metadata = {
    name: "Hassan Tijani.A",
    github: "surepeps",
    description: "Image Grid with Wider Boxes",
    filename: "ImagesLoader"
};

export default ImagesLoader;
