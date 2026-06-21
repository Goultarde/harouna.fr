'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/context/AppContext';

const content = {
  fr: {
    status:    'Disponible pour alternance',
    location:  'France',
    role:      'Mastere Cybersecurite, Red Team & Securite Offensive',
    lede:      "Etudiant passionne par la securite offensive. Je me forme aux techniques d'attaque, au Red Teaming et au developpement d'outils. A la recherche d'une alternance en Pentest.",
    cta1:      'Voir les projets',
    cta2:      'Me contacter',
  },
  en: {
    status:    'Available for apprenticeship',
    location:  'France',
    role:      "Cybersecurity Master's, Red Team & Offensive Security",
    lede:      'Student passionate about offensive security. I specialize in attack techniques, Red Teaming and tool development. Seeking a Penetration Testing apprenticeship.',
    cta1:      'View Projects',
    cta2:      'Contact',
  },
};

const HeroGrid = () => {
  const canvasRef = useRef(null);
  const state = useRef({ mx: -9999, my: -9999, offset: 0, raf: null });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const { mx, my, offset } = state.current;
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

    // Reveal layer near mouse
    if (mx >= 0 && mx <= w) {
      const RADIUS = 280;
      ctx.save();
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
      grad.addColorStop(0, 'rgba(184,155,122,0.5)');
      grad.addColorStop(1, 'rgba(184,155,122,0)');
      ctx.strokeStyle = 'rgba(184,155,122,1)';
      ctx.lineWidth = 1;

      for (let x = startX; x < w + CELL; x += CELL) {
        const dist = Math.abs(x - mx);
        if (dist > RADIUS) continue;
        const alpha = Math.max(0, 1 - dist / RADIUS) * 0.5;
        ctx.strokeStyle = `rgba(184,155,122,${alpha})`;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = startY; y < h + CELL; y += CELL) {
        const dist = Math.abs(y - my);
        if (dist > RADIUS) continue;
        const alpha = Math.max(0, 1 - dist / RADIUS) * 0.5;
        ctx.strokeStyle = `rgba(184,155,122,${alpha})`;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.restore();
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

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.closest('.hero')?.getBoundingClientRect();
    if (!rect) return;
    state.current.mx = e.clientX - rect.left;
    state.current.my = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    state.current.mx = -9999;
    state.current.my = -9999;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-grid-canvas"
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
                <a href="#projets" className="btn primary">
                  {c.cta1} <span className="arr">↗</span>
                </a>
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
