import React from 'react';
import { WHY_CHOOSE_US_DATA } from '../data/carsData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-section" id="diferenciais" aria-labelledby="why-title">
      <div className="container">
        <h2 id="why-title" className="section-title">
          Por que Escolher a Gente?
        </h2>

        <div className="why-grid">
          {WHY_CHOOSE_US_DATA.map((item) => (
            <div key={item.id} className="why-item">
              <div className="why-icon-box">
                <img src={item.icon} alt="" aria-hidden="true" />
              </div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
