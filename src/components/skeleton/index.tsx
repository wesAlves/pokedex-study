import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={150}
    height={182}
    viewBox="0 0 150 182"
    backgroundColor="#ddd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="16" y="150" rx="3" ry="3" width="116" height="12" />
    <rect x="16" y="130" rx="3" ry="3" width="116" height="12" />
    <circle cx="75" cy="60" r="30" />
  </ContentLoader>
);

export default MyLoader;
