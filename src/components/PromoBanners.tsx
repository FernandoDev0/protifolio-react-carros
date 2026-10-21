import React from 'react';

interface PromoBannersProps {
  onOpenFinancing: () => void;
  onOpenTradeIn: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({
  onOpenFinancing,
  onOpenTradeIn,
}) => {
  return (
    <section className="banners-section" id="financiamento" aria-label="Banners Promocionais">
      <div className="container">
        <div className="banners-grid">
          {/* Banner 1: Financiamento */}
          <div className="promo-banner banner-financiamento">
            <div className="banner-content">
              <h3>Simule seu Financiamento Online</h3>
              <p>Aprovação rápida e digital sem sair de casa.</p>
              <button
                type="button"
                className="btn-banner-action"
                onClick={onOpenFinancing}
              >
                SIMULAR AGORA
              </button>
            </div>
            <div className="banner-image">
              <img
                src="/images/banners/banner-financiamento.jpg"
                alt="App de Financiamento no celular"
                loading="lazy"
              />
            </div>
          </div>

          {/* Banner 2: Avalie seu Usado */}
          <div className="promo-banner banner-usado" id="avaliar">
            <div className="banner-content">
              <h3>Avalie seu Usado</h3>
              <p>Quem quer vender ou trocar de carro com a melhor avaliação.</p>
              <button
                type="button"
                className="btn-banner-action"
                onClick={onOpenTradeIn}
              >
                AVALIE AGORA
              </button>
            </div>
            <div className="banner-image">
              <img
                src="/images/banners/banner-avalie-usado.jpg"
                alt="Carro premium seminovo"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
