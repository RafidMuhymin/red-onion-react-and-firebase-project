import React from "react";
import { Link } from "react-router-dom";
import "./Testimonial.scss";

export default function Testimonial() {
  return (
    <div className="d-flex justify-content-center">
      <div className="row test-col">
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <div>
            <img
              className="img-fluid"
              src="images/Image/premium-quality-service.png"
              alt="premium-quality-service"
            />
            <div className="d-flex service">
              <div className="iconHolders d-flex justify-content-center">
                <span className="icons">
                  <i className="lni lni-service"></i>
                </span>
              </div>
              <div className="serviceHolders">
                <h6>PREMIUM QUALITY SERVICE</h6>

                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident aspernatur numquam, asperiores molestias excepturi
                  vel!
                </small>

                <div className="d-flex align-items-center mt-2">
                  <Link to="/see-more">
                    <strong>See More</strong>
                    <span className="right-arrow">
                      <i className="lni lni-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <div>
            <img
              className="img-fluid"
              src="images/Image/world-class-chefs.png"
              alt="world-class-chefs"
            />
            <div className="d-flex service">
              <div className="iconHolders d-flex justify-content-center">
                <span className="icons">
                  <i className="lni lni-dinner"></i>
                </span>
              </div>
              <div className="serviceHolders">
                <h6>WORLD CLASS CHEFS</h6>

                <small>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat, perferendis in! Reprehenderit asperiores dolorum
                  ratione.
                </small>

                <div className="d-flex align-items-center mt-2">
                  <Link to="/see-more">
                    <strong>See More</strong>
                    <span className="right-arrow">
                      <i className="lni lni-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <div>
            {" "}
            <img
              className="img-fluid"
              src="images/Image/fast-home-delivery.png"
              alt="fast-home-delivery"
            />
            <div className="d-flex service">
              <div className="iconHolders d-flex justify-content-center">
                <span className="icons">
                  <i className="lni lni-delivery"></i>
                </span>
              </div>
              <div className="serviceHolders">
                <h6>FAST HOME DELIVERY</h6>

                <small>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perspiciatis aliquid aliquam eos magnam dolore possimus.
                </small>

                <div className="d-flex align-items-center mt-2">
                  <Link to="/see-more">
                    <strong>See More</strong>
                    <span className="right-arrow">
                      <i className="lni lni-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
