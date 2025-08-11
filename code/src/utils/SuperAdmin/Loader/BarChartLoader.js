import React from 'react';
import ContentLoader from 'react-content-loader';

const BarChartLoader = props => {
    return (
        <div style={{ width: '100%', height: '100%', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ContentLoader
                width="100%"
                height="100%"
                viewBox="0 0 400 160"  // Adjust the viewBox for better height and width scaling
                preserveAspectRatio="xMidYMid slice"
                {...props}
            >
                {/* Bars adjusted for better height and center alignment */}
                <rect x="10" y="120" rx="3" ry="3" width="40" height="40" />
                <rect x="70" y="100" rx="3" ry="3" width="40" height="60" />
                <rect x="130" y="80" rx="3" ry="3" width="40" height="80" />
                <rect x="190" y="40" rx="3" ry="3" width="40" height="120" />
                <rect x="250" y="90" rx="3" ry="3" width="40" height="70" />
                <rect x="310" y="110" rx="3" ry="3" width="40" height="50" />
            </ContentLoader>
        </div>
    );
};

export default BarChartLoader;
