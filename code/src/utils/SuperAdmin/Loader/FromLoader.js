import React from "react";
import ContentLoader from "react-content-loader";

const FromLoader = props => (
  <ContentLoader
    viewBox="0 0 400 150"
    height={"100%"}
    width={"100%"}
    {...props}
  >
    <rect x="0  " y="15" rx="10" ry="15" width="100%" height="10" />
    <rect x="0" y="45" rx="5" ry="5" width="100%" height="10" />
    <rect x="0" y="75" rx="5" ry="5" width="100%" height="10" />
    <rect x="0" y="105" rx="5" ry="5" width="100%" height="10" />
    <rect x="0" y="135" rx="5" ry="5" width="100%" height="10" />
  </ContentLoader>
);

FromLoader.metadata = {
  name: "DaniloWoz",
  github: "danilowoz",
  description: "Bullet list",
  filename: "FromLoader"
};

export default FromLoader;
