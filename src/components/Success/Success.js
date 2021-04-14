import React from "react";

export default function Success() {
  return (
    <div id="success" className="text-center">
      <span className="d-block mt-5 w-75 mx-auto">
        <b>
          <big>
            Your order has been placed and you have wasted your time
            successfully! You'll never receive your ordered items! Thank you and
            don't forget to send me a quote at rafid@muhymin.com if you have
            like this portfolio website.
          </big>
        </b>
      </span>
      <img
        className="w-50"
        src={`/images/success.svg`}
        alt="success-on-order"
      />
    </div>
  );
}
