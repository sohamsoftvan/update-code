import React from 'react';
import ContentLoader from 'react-content-loader';

const PieChartLoader = props => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <ContentLoader
                viewBox="0 0 400 400"
                height={400}
                width={400}
                preserveAspectRatio="xMidYMid meet"
                {...props}
            >
                {/* Circle for pie chart */}
                <circle cx="200" cy="150" r="100" fill="#e0e0e0" />

                {/* Simulating the legend below the chart with bigger size */}
                <rect x="110" y="300" rx="5" ry="5" width="10" height="10" fill="#66b2b2" />
                <rect x="130" y="300" rx="5" ry="5" width="80" height="10" fill="#f3f3f3" />

                <rect x="110" y="320" rx="5" ry="5" width="10" height="10" fill="#66b2b2" />
                <rect x="130" y="320" rx="5" ry="5" width="80" height="10" fill="#f3f3f3" />

                <rect x="110" y="340" rx="5" ry="5" width="10" height="10" fill="#66b2b2" />
                <rect x="130" y="340" rx="5" ry="5" width="80" height="10" fill="#f3f3f3" />
            </ContentLoader>
        </div>
    );
};

export default PieChartLoader;
