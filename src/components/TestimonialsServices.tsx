import React from 'react';
import { TESTIMONIALS_DATA } from '../data/carsData';

interface TestimonialsServicesProps {
  onOpenServiceModal: () => void;
}

export const TestimonialsServices: React.FC<TestimonialsServicesProps> = ({
  onOpenServiceModal,
}) => {
  return (
    <section className="testimonials-section" id="servicos" aria-labelledby="depoimentos-title">
      <div className="container">
        <h2 id="depoimentos-title" className="section-title">
          Depoimentos & Serviços
        </h2>

        <div className="testimonials-grid">
          {/* 3 Cartões de Depoimentos */}
          {TESTIMONIALS_DATA.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-avatar-wrapper">
                <img 
                  src={t.avatar} 
                  alt={`Foto de ${t.name}, cliente da Drive Motors`} 
                  width="282" 
                  height="160" 
                  loading="lazy" 
                />
              </div>

              <div className="testimonial-content">
                <div className="star-rating" aria-label={`${t.rating} de 5 estrelas`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <img 
                      key={i} 
                      src="/icons/star.svg" 
                      alt="" 
                      width="16" 
                      height="16" 
                      aria-hidden="true" 
                    />
                  ))}
                </div>

                <p className="testimonial-text">"{t.comment}"</p>

                <div>
                  <div className="testimonial-author">{t.name}</div>
                  <div className="testimonial-car">{t.carPurchased}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Cartão de Agendar Revisão */}
          <div className="service-card">
            <img
              src="/images/services/agendar-revisao.jpg"
              alt="Oficina Mecânica Drive Motors"
              className="service-card-bg"
              loading="lazy"
            />
            <div className="service-card-overlay"></div>

            <div className="service-card-content">
              <h3>Agendar Revisão</h3>
              <p>Sua melhor revisão na oficina da loja com técnicos certificados.</p>
              <button
                type="button"
                className="btn-service-schedule"
                onClick={onOpenServiceModal}
              >
                AGENDAR REVISÃO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
