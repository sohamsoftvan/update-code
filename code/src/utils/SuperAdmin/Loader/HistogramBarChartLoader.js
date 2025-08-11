import React from 'react';
import ContentLoader from 'react-content-loader';

const HistogramBarChartLoader = props => {
    return (
        <div style={{ width: '100%', height: '386px', maxWidth: '100%'  }}>
            <ContentLoader
                width="100%"
                height="386px"
                viewBox="0 0 350 250"  // Adjusting viewBox for better height/width scaling
                preserveAspectRatio="xMidYMid meet"
                {...props}
            >
                {/* Adjusted bars with better height and alignment */}
                <rect x="10" y="150" rx="3" ry="3" width="40" height="50" />
                <rect x="70" y="120" rx="3" ry="3" width="40" height="80" />
                <rect x="130" y="90" rx="3" ry="3" width="40" height="110" />
                <rect x="190" y="40" rx="3" ry="3" width="40" height="160" />
                <rect x="250" y="100" rx="3" ry="3" width="40" height="100" />
                <rect x="310" y="130" rx="3" ry="3" width="40" height="70" />
            </ContentLoader>
        </div>
    );
};

export default HistogramBarChartLoader;
