import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';
import { useNavigate } from "react-router-dom";

// Importações necessárias para criar e estilizar os marcadores no mapa
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import { Style, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style.js';

function MapaPublico() {
  const navigate = useNavigate();
  const elementoMapaRef = useRef(null);
  const mapaInstanciaRef = useRef(null);

  useEffect(() => {
    if (elementoMapaRef.current !== null) {
      // Definindo a localização da nossa UBS para centralizar o mapa
      const coordenadasUBS = fromLonLat([-44.246, -2.555]);

      // Criando o objeto que representará o ponto da UBS no mapa
      const marcadorUBS = new Feature({
        geometry: new Point(coordenadasUBS),
        name: 'Unidade Mista São Bernardo',
      });

      // Aplicando aquele estilo que desenhamos no Figma: círculo vermelho com "H"
      marcadorUBS.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 14,
            fill: new Fill({ color: '#e11d48' }),
            stroke: new Stroke({
              color: '#ffffff',
              width: 3,
            }),
          }),
          // Adicionando o "H" de hospital centralizado na bolinha
          text: new Text({
            text: 'H',
            font: 'bold 12px sans-serif',
            fill: new Fill({ color: '#ffffff' }),
            textAlign: 'center',
            textBaseline: 'middle',
          }),
        })
      );

      // Agrupando o marcador para poder adicioná-lo ao mapa
      const fonteVetor = new VectorSource({
        features: [marcadorUBS],
      });

      // Criando a camada que vai exibir os marcadores na tela
      const camadaMarcadores = new VectorLayer({
        source: fonteVetor,
      });

      // Montando o mapa com a camada de fundo (OSM) e nossos pontos personalizados
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          camadaMarcadores,
        ],
        target: elementoMapaRef.current,
        view: new View({
          center: coordenadasUBS,
          zoom: 15,
        }),
      });

      mapaInstanciaRef.current = map;

      // Limpeza do mapa ao desmontar o componente para evitar erros
      return () => {
        map.setTarget(undefined);
      };
    }
  }, []);

  // Funções para controlar o zoom via botões da interface
  const lidarZoomIn = () => {
    if (mapaInstanciaRef.current) {
      const view = mapaInstanciaRef.current.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom + 1);
    }
  };

  const lidarZoomOut = () => {
    if (mapaInstanciaRef.current) {
      const view = mapaInstanciaRef.current.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom - 1);
    }
  };

  const clicarAcessoGestor = () => {
    navigate("/login");
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* Atalho de acessibilidade para quem usa teclado */}
      <a 
        href="#mapa-publico-ubs"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '0',
          backgroundColor: '#ffffff',
          color: '#003366',
          padding: '10px',
          zIndex: 2000,
          transition: 'top 0.2s'
        }}
        onFocus={(e) => { e.target.style.top = '0px'; }}
        onBlur={(e) => { e.target.style.top = '-100px'; }}
      >
        Ir direto para o mapa
      </a>

      {/* Cabeçalho do sistema */}
      <header style={{
        height: '70px',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 30px',
        borderBottom: '1px solid #e0e0e0',
        zIndex: 1100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#003366', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold' }}>
            🏥
          </div>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#003366' }}>
            Maranhão Saúde Digital
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '25px', color: '#555555', fontSize: '14px', fontWeight: '500' }}>
          <span style={{ color: '#003366', borderBottom: '2px solid #003366', paddingBottom: '4px', cursor: 'pointer' }}>Início</span>
          <span style={{ cursor: 'pointer' }}>Unidades de Saúde</span>
          <span style={{ cursor: 'pointer' }}>Serviços</span>
          <span style={{ cursor: 'pointer' }}>Dúvidas</span>
        </nav>

        <button 
          onClick={clicarAcessoGestor}
          style={{
            border: '1px solid #003366',
            backgroundColor: '#ffffff',
            color: '#003366',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          👤 Acesso Gestor
        </button>
      </header>

      {/* Área principal: Mapa com a sidebar de busca */}
      <div style={{ flex: 1, position: 'relative', width: '100%' }}>
        
        {/* Painel lateral de controle (estilo Figma) */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '320px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          padding: '24px',
          zIndex: 1000
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#003366', fontSize: '18px' }}>
            Encontrar Unidade
          </h3>
          
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Busca por bairro ou nome..." 
              style={{
                width: '100%',
                padding: '12px 12px 12px 35px',
                borderRadius: '8px',
                border: '1px solid #cccccc',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            <span style={{ position: 'absolute', left: '12px', top: '14px', color: '#888888' }}>🔍</span>
          </div>

          <div style={{
            marginTop: '20px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#003366', fontSize: '14px' }}>
              Mapa de Saúde do Estado
            </h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '12px', lineHeight: '1.5' }}>
              Localize a Unidade Básica de Saúde (UBS) mais próxima de você em tempo real.
            </p>
          </div>

          {/* Botões de controle de zoom */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={lidarZoomIn}
              style={{ flex: 1, padding: '10px', backgroundColor: '#003366', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Aumentar Zoom
            </button>
            <button 
              onClick={lidarZoomOut}
              style={{ flex: 1, padding: '10px', backgroundColor: '#64748b', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Diminuir Zoom
            </button>
          </div>
        </div>

        {/* Local onde o mapa será renderizado */}
        <div 
          id="mapa-publico-ubs"
          ref={elementoMapaRef} 
          tabIndex="0"
          style={{ width: '100%', height: '100%' }}
          onFocus={(e) => { e.target.style.outline = '#4A74A8 solid 0.15em'; }}
          onBlur={(e) => { e.target.style.outline = 'none'; }}
        >
        </div>

      </div>

      {/* Rodapé com informações institucionais */}
      <footer style={{
        height: '35px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 30px',
        fontSize: '11px',
        color: '#888888',
        zIndex: 1100
      }}>
        <span>© 2026 Governo do Estado do Maranhão — <strong>Secretaria de Estado da Saúde</strong></span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <span>Privacidade</span>
          <span>Termos de Uso</span>
          <span>Portal da Transparência</span>
        </div>
      </footer>

    </div>
  );
}

export default MapaPublico;