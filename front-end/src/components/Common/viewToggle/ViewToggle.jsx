import React from "react";
import "./viewToggle.css";

const CustomButton = ({ isActive, onClick, title, children }) => (
  <div
    className={`view_icon ${isActive ? "active" : ""}`}
    onClick={onClick}
    data-title={title}
  >
    {children}
  </div>
);

const ViewToggle = ({ isGridView, setIsGridView }) => (
  <div className="view_toggle">
    <CustomButton
      isActive={!isGridView}
      onClick={() => setIsGridView(false)}
      title="Список"
    >
      <div className="listIcon">
        <div
          className="children"
          style={{
            width: "20px",
            height: "8px",
            borderRadius: "3px",
            backgroundColor: !isGridView ? "#1E6062" : "white",
            margin: "1px"
          }}
        />
        <div
          className="children"
          style={{
            width: "20px",
            height: "8px",
            borderRadius: "3px",
            
            backgroundColor: !isGridView ? "#1E6062" : "white",
            margin: "1px"
          }}
        />
      </div>
    </CustomButton>
    <CustomButton
      isActive={isGridView}
      onClick={() => setIsGridView(true)}
      title="Галерея"
    >
      <div
        className="gridIcon"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="children"
          style={{
            width: "10px",
            height: "9px",
            borderRadius: "3px",
            backgroundColor: isGridView ? "#1E6062" : "white",
            margin: "1px"
          }}
        />
        <div
          className="children"
          style={{
            width: "10px",
            height: "9px",
            borderRadius: "3px",
            backgroundColor: isGridView ? "#1E6062" : "white",
            margin: "1px"
          }}
        />
      </div>
      <div
        className="gridIcon"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="children"
          style={{
            width: "10px",
            height: "9px",
            borderRadius: "3px",
            backgroundColor: isGridView ? "#1E6062" : "white",
            margin: "1px"
          }}
        />
        <div
          className="children"
          style={{
            width: "10px",
            height: "9px",
            borderRadius: "3px",
            backgroundColor: isGridView ? "#1E6062" : "white",
            margin: "1px"
          }}
        />
      </div>
    </CustomButton>
  </div>
);

export default ViewToggle;
