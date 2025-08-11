import React from 'react';
import ContentLoader from 'react-content-loader';

const ImageGridLoader = (props) => (
    <ContentLoader
        width="100%"
        height="100%"
        viewBox="0 0 720 575" // Adjusted to fit the grid perfectly
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        {/* Row 1 */}
        <rect x="10" y="58" rx="2" ry="2" width="220" height="211" />
        <rect x="245" y="58" rx="2" ry="2" width="220" height="211" />
        <rect x="480" y="58" rx="2" ry="2" width="220" height="211" />

        {/* Row 2 */}
        <rect x="10" y="283" rx="2" ry="2" width="220" height="211" />
        <rect x="245" y="283" rx="2" ry="2" width="220" height="211" />
        <rect x="480" y="283" rx="2" ry="2" width="220" height="211" />

        {/* Circle */}
        <circle cx="360" cy="536" r="12" />
    </ContentLoader>
);

ImageGridLoader.metadata = {
    name: "Hassan Tijani.A",
    github: "surepeps",
    description: "Image Grid with Pagination",
    filename: "ImageGridLoader",
};

export default ImageGridLoader;
