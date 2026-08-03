'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/context/AppContext';

const content = {
  fr: {
    status:    'En alternance',
    location:  'France',
    role:      'Mastère Cybersécurité, Red Team & Sécurité Offensive',
    lede:      "Étudiant passionné par la sécurité offensive. Je me forme aux techniques d'attaque, au Red Teaming et au développement d'outils.",
    cta2:      'Me contacter',
  },
  en: {
    status:    'On apprenticeship',
    location:  'France',
    role:      "Cybersecurity Master's, Red Team & Offensive Security",
    lede:      'Student passionate about offensive security. I specialize in attack techniques, Red Teaming and tool development.',
    cta2:      'Contact',
  },
};

const HeroGrid = () => {
  const canvasRef = useRef(null);
  const state = useRef({ offset: 0, raf: null });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const { offset } = state.current;
    const CELL = 40;

    ctx.clearRect(0, 0, w, h);

    const startX = (offset % CELL);
    const startY = (offset % CELL);

    // Dim base grid
    ctx.strokeStyle = 'rgba(180,160,140,0.12)';
    ctx.lineWidth = 1;
    for (let x = startX; x < w + CELL; x += CELL) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = startY; y < h + CELL; y += CELL) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }


    // Vertical fade mask via globalCompositeOperation
    const fadeH = h * 0.25;
    const topFade = ctx.createLinearGradient(0, 0, 0, fadeH);
    topFade.addColorStop(0, 'rgba(0,0,0,1)');
    topFade.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = topFade;
    ctx.fillRect(0, 0, w, fadeH);

    const botFade = ctx.createLinearGradient(0, h - fadeH, 0, h);
    botFade.addColorStop(0, 'rgba(0,0,0,0)');
    botFade.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = botFade;
    ctx.fillRect(0, h - fadeH, w, fadeH);
    ctx.globalCompositeOperation = 'source-over';

    state.current.offset = (state.current.offset + 0.08) % CELL;
    state.current.raf = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    state.current.raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(state.current.raf);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-grid-canvas"
      aria-hidden="true"
    />
  );
};

const Hero = () => {
  const { language } = useApp();
  const c = content[language];

  return (
    <section className="hero" id="top">
      <div className="hero-aurora" aria-hidden="true" />
      <HeroGrid />

      <div className="shell">
        <div className="hero-inner">
          <div className="hero-top">
            <div className="hero-loc">
              <span className="caps">{c.location}</span>
            </div>
            <div className="hero-status">
              <span className="dot" />
              {c.status}
            </div>
          </div>

          <h1 className="hero-name">
            <span className="line name-1">Harouna</span>
            <span className="line name-2">Coulibaly</span>
          </h1>

          <div className="hero-meta">
            <p className="hero-role">{c.role}</p>
            <div>
              <p className="hero-lede">{c.lede}</p>
              <div className="hero-cta">
                <a href="#contact" className="btn ghost">
                  {c.cta2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
