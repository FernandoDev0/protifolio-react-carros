import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section" aria-label="Apresentação Principal">
      <picture className="hero-bg-picture">
        <source media="(max-width: 640px)" srcSet="/images/hero/hero-mobile.jpg" />
        <source media="(max-width: 1024px)" srcSet="/images/hero/hero-tablet.jpg" />
        <img 
          src="/images/hero/hero-desktop.jpg" 
          alt="SUV de luxo em rodovia ao entardecer" 
          className="hero-bg-img" 
          loading="eager"
          width="1376"
          height="650"
        />
      </picture>
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Seu próximo <br />
            carro está aqui.
          </h1>
          <p className="hero-subtitle">
            As melhores ofertas com garantia e procedência.
          </p>
        </div>
      </div>
    </section>
  );
};
