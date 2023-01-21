export function Home() {
  return (
    <section class="colored-section" id="testimonials">
      <div
        id="testimonial-carousel"
        class="carousel slide min-height:680px"
        data-ride="false"
      >
        <div class="carousel-inner">
          <div class="carousel-item active container-fluid">
            <img
              class="testimonial-image "
              src="images/carousel_1.svg"
              alt="Daily Fresh Trivia"
            />
          </div>
          <div class="carousel-item container-fluid">
            <img
              class="testimonial-image"
              src="images/carousel_1.svg"
              alt="Daily Fresh Trivia"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#testimonial-carousel"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a
          class="carousel-control-next"
          href="#testimonial-carousel"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </section>
  );
}