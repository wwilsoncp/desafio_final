import React from "react";

export default function Action({ id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };
  return (
    <span>
      <i
        className="material-icons"
        style={{ cursor: "pointer" }}
        onClick={handleIconClick}
      >
        {type}
      </i>
    </span>
  );
}
