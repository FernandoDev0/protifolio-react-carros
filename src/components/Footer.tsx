import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Coluna 1: Marca */}
          <div className="footer-col footer-brand">
            <a href="#" className="brand-logo" aria-label="Drive Motors">
              <img src="/icons/logo.svg" alt="Drive Motors" />
            </a>
            <p>
              As melhores ofertas com garantia e procedência. Mais de 15 anos proporcionando a melhor experiência na compra e venda de veículos.
            </p>
          </div>

          {/* Coluna 2: Rápidos */}
          <div className="footer-col">
            <h4>Rápidos</h4>
            <ul>
              <li><a href="#estoque">Comprar</a></li>
              <li><a href="#avaliar">Vender</a></li>
              <li><a href="#financiamento">Financiamento</a></li>
              <li><a href="#servicos">Serviços</a></li>
            </ul>
          </div>

          {/* Coluna 3: Links */}
          <div className="footer-col">
            <h4>Links</h4>
            <ul>
              <li><a href="#diferenciais">Vistoria Cautelar</a></li>
              <li><a href="#diferenciais">Garantia 1 Ano</a></li>
              <li><a href="#categorias">Categorias</a></li>
              <li><a href="#servicos">Oficina Especializada</a></li>
            </ul>
          </div>

          {/* Coluna 4: Endereço & Contato */}
          <div className="footer-col">
            <h4>Endereço</h4>
            <div className="footer-contact-item">
              <img src="/icons/map-pin.svg" alt="" aria-hidden="true" />
              <span>Av. das Nações Unidas, 14401 - Chácara Santo Antônio, São Paulo - SP</span>
            </div>
            <div className="footer-contact-item">
              <img src="/icons/phone.svg" alt="" aria-hidden="true" />
              <span>(11) 5509-5010</span>
            </div>

            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <img src="/icons/facebook.svg" alt="" aria-hidden="true" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <img src="/icons/instagram.svg" alt="" aria-hidden="true" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                <img src="/icons/youtube.svg" alt="" aria-hidden="true" />
              </a>
              <a href="https://wa.me/551155095010" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <img src="/icons/whatsapp.svg" alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Drive Motors - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
