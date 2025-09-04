import React from "react";
import { useNavigate } from "react-router-dom";

export const OrderPlacedFailed = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>✅ Order Placed Successfully!</h1>
      <p>Thank you for your purchase. You’ll receive an email confirmation soon.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Return to Home
      </button>
    </div>
  );
};