import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={457}
    viewBox="0 0 280 467"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="275" rx="0" ry="0" width="280" height="25" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="425" rx="10" ry="10" width="90" height="27" />
    <rect x="128" y="415" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
);

export default MyLoader;
