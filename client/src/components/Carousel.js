import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

export class ImageCarousel extends Component {
  render() {
    return (
      <section className="colored-section" id="Category">
        <div className="category-btn row no-gutters">
          <a className="category-item col-3" href="/trivia">
            <img src="/images/science_btn.png" />
          </a>

          <a className="category-item col-3" href="/trivia">
            <img src="/images/movie_btn.png" />
          </a>

          <a className="category-item col-3" href="/trivia">
            <img src="/images/sports_btn.png" />
          </a>

          <a className="category-item col-3" href="/trivia">
            <img src="/images/music_btn.png" />
          </a>
        </div>
      </section>
    );
  }
}

export default ImageCarousel;