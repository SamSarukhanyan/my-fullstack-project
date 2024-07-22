import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./skeletonLoader.css";

const SkeletonLoader = ({ count, isGridView }) => {
  return (
    <div className={`products_container ${isGridView ? "grid_view" : "list_view"}`}>
      {Array(count)
        .fill()
        .map((_, index) => (
          <div key={index} className="product_card_sceleton">
            <div className="product_images">
              <Skeleton className="skeleton" height={200} baseColor="#DBDBDB" highlightColor="#F3F3F3" />
            </div>

            <div className="info_block">
              <Skeleton className="skeleton" width="80%" baseColor="#DBDBDB" highlightColor="#F3F3F3" />
              <Skeleton className="skeleton" width="50%" baseColor="#DBDBDB" highlightColor="#F3F3F3" />
              <Skeleton className="skeleton" width="45%" baseColor="#DBDBDB" highlightColor="#F3F3F3" />
              <Skeleton className="skeleton" width="48%" baseColor="#DBDBDB" highlightColor="#F3F3F3" />
              <Skeleton className="skeleton" width="64%" height="20px" baseColor="#DBDBDB" highlightColor="#F3F3F3" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonLoader;
