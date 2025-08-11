import React from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props) => (
    <div className="card-loader">
        <ContentLoader
            viewBox="0 0 400 150"
            width={"100%"}
            height={"100%"}
            title="Loading news..."
            {...props}
        >
            <rect x="0" y="20" rx="5" ry="5" width="200" height="120" />
            <rect x="210" y="30" rx="0" ry="0" width="180" height="15" />
            <rect x="210" y="60" rx="0" ry="0" width="100" height="12" />
        </ContentLoader>
    </div>
);

CardLoader.metadata = {
    name: "Arthur Falcão",
    github: "arthurfalcao",
    description: "News List",
    filename: "CardLoader",
};

const CardLoaderGrid = () => {
    return (
        <div className="card-loader-grid">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <CardLoader key={index} />
                ))}
        </div>
    );
};

export default CardLoaderGrid;
