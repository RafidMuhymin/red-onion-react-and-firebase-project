import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1>404 Not Found</h1>
      <h2>
        <Link to="/">Return to Our Homepage</Link>
      </h2>
    </div>
  );
}
