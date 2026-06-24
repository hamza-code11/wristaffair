'use client';

import React, { useRef, useEffect, useState } from 'react';

const milestones = [
  {
    year: '1906',
    title: 'The Beginning',
    description: 'Founded in Geneva, Switzerland, with a singular vision — to create timepieces that transcend generations.',
    number: '01',
  },
  {
    year: '1956',
    title: 'First Chronograph',
    description: 'Introduced the world\'s first automatic chronograph movement, redefining precision engineering.',
    number: '02',
  },
  {
    year: '1986',
    title: 'Heritage Collection',
    description: 'Launched the iconic Heritage collection — a perfect union of traditional craft and modern innovation.',
    number: '03',
  },
  {
    year: '2026',
    title: 'Future Forward',
    description: 'A new chapter begins. Cutting-edge horology meets timeless design philosophy.',
    number: '04',
  },
];

const Heritage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Header observer
    const headerObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) headerObs.observe(sectionRef.current);

    // Item observers
    const itemObservers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      itemObservers.push(obs);
    });

    return () => {
      headerObs.disconnect();
      itemObservers.forEach(o => o.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        color: '#fff',
        padding: '120px 0 140px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle background texture lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 120px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 60px', position: 'relative' }}>

        {/* Header */}
        <div style={{
          marginBottom: '100px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#7f7f7f',
            margin: '0 0 20px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            Our Legacy
          </p>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 300,
              fontFamily: 'Georgia, Cambria, serif',
              color: '#fff',
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '2px',
            }}>
              A Century of<br />
              <span style={{ color: '#404040' }}>Timeless Craft</span>
            </h2>

            <p style={{
              fontSize: '13px',
              color: '#7f7f7f',
              maxWidth: '300px',
              lineHeight: 1.85,
              fontWeight: 300,
              fontFamily: 'Inter, system-ui, sans-serif',
              flexShrink: 0,
              margin: '0 0 8px',
            }}>
              Over one hundred years of uncompromising dedication to the art of watchmaking — each piece a testament to enduring excellence.
            </p>
          </div>

          {/* Rule */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, #404040 0%, transparent 100%)',
            marginTop: '48px',
            width: '100%',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s',
          }} />
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {milestones.map((m, index) => {
            const isEven = index % 2 === 0;
            const visible = visibleItems[index];

            return (
              <div
                key={index}
                ref={el => { itemRefs.current[index] = el; }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 1fr',
                  gap: '0',
                  marginBottom: index < milestones.length - 1 ? '0' : '0',
                  position: 'relative',
                }}
              >
                {/* LEFT SIDE */}
                <div style={{
                  padding: '48px 48px 48px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  textAlign: 'right',
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? 'translateX(0)'
                    : isEven ? 'translateX(-40px)' : 'translateX(0)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                }}>
                  {isEven ? (
                    // Content on left for even
                    <>
                      <span style={{
                        fontSize: '10px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        color: '#404040',
                        marginBottom: '16px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        display: 'block',
                      }}>
                        {m.number}
                      </span>
                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: 300,
                        fontFamily: 'Georgia, Cambria, serif',
                        color: '#fff',
                        margin: '0 0 12px',
                        letterSpacing: '1px',
                      }}>
                        {m.title}
                      </h3>
                      <p style={{
                        fontSize: '13px',
                        color: '#7f7f7f',
                        lineHeight: 1.8,
                        fontWeight: 300,
                        fontFamily: 'Inter, system-ui, sans-serif',
                        maxWidth: '320px',
                        margin: 0,
                      }}>
                        {m.description}
                      </p>
                    </>
                  ) : (
                    // Year on left for odd
                    <span style={{
                      fontSize: 'clamp(48px, 5vw, 72px)',
                      fontWeight: 200,
                      fontFamily: 'Georgia, Cambria, serif',
                      color: '#1a1a1a',
                      letterSpacing: '4px',
                      lineHeight: 1,
                    }}>
                      {m.year}
                    </span>
                  )}
                </div>

                {/* CENTER — timeline */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  {/* Vertical line top */}
                  <div style={{
                    width: '1px',
                    flex: index === 0 ? '0 0 40px' : '1',
                    background: index === 0 ? 'transparent' : '#1e1e1e',
                  }} />

                  {/* Dot */}
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: visible ? '#fff' : '#1e1e1e',
                    border: '1px solid #404040',
                    flexShrink: 0,
                    position: 'relative',
                    transition: 'background 0.5s ease 0.4s',
                    zIndex: 2,
                  }}>
                    {/* Pulse ring */}
                    {visible && (
                      <div style={{
                        position: 'absolute',
                        inset: '-6px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.15)',
                        animation: 'heritagePulse 2s ease-out infinite',
                      }} />
                    )}
                  </div>

                  {/* Vertical line bottom */}
                  <div style={{
                    width: '1px',
                    flex: index === milestones.length - 1 ? '0 0 40px' : '1',
                    background: index === milestones.length - 1 ? 'transparent' : '#1e1e1e',
                  }} />
                </div>

                {/* RIGHT SIDE */}
                <div style={{
                  padding: '48px 0 48px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? 'translateX(0)'
                    : !isEven ? 'translateX(40px)' : 'translateX(0)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                }}>
                  {!isEven ? (
                    // Content on right for odd
                    <>
                      <span style={{
                        fontSize: '10px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        color: '#404040',
                        marginBottom: '16px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        display: 'block',
                      }}>
                        {m.number}
                      </span>
                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: 300,
                        fontFamily: 'Georgia, Cambria, serif',
                        color: '#fff',
                        margin: '0 0 12px',
                        letterSpacing: '1px',
                      }}>
                        {m.title}
                      </h3>
                      <p style={{
                        fontSize: '13px',
                        color: '#7f7f7f',
                        lineHeight: 1.8,
                        fontWeight: 300,
                        fontFamily: 'Inter, system-ui, sans-serif',
                        maxWidth: '320px',
                        margin: 0,
                      }}>
                        {m.description}
                      </p>
                    </>
                  ) : (
                    // Year on right for even
                    <span style={{
                      fontSize: 'clamp(48px, 5vw, 72px)',
                      fontWeight: 200,
                      fontFamily: 'Georgia, Cambria, serif',
                      color: '#1a1a1a',
                      letterSpacing: '4px',
                      lineHeight: 1,
                    }}>
                      {m.year}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          marginTop: '100px',
          background: '#1a1a1a',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease 0.8s, transform 1s ease 0.8s',
        }}>
          {[
            { value: '118', label: 'Years of Heritage', suffix: '+' },
            { value: '47', label: 'Exclusive Movements', suffix: '' },
            { value: '120', label: 'Countries Worldwide', suffix: '+' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#000',
              padding: '48px 40px',
              borderTop: '1px solid #1a1a1a',
            }}>
              <div style={{
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 200,
                fontFamily: 'Georgia, Cambria, serif',
                color: '#fff',
                letterSpacing: '2px',
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                {stat.value}<span style={{ fontSize: '0.5em', color: '#404040' }}>{stat.suffix}</span>
              </div>
              <div style={{
                fontSize: '9px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#7f7f7f',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          marginTop: '64px',
          opacity: headerVisible ? 1 : 0,
          transition: 'opacity 1s ease 1s',
        }}>
          <button
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid #404040',
              padding: '16px 44px',
              fontSize: '10px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300,
              transition: 'border-color 0.3s ease, color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#fff';
              const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
              if (arrow) arrow.style.transform = 'translateX(6px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#404040';
              const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            Discover Our Story
            <span className="arrow" style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}>→</span>
          </button>

          <div style={{ height: '1px', flex: 1, background: '#1a1a1a', maxWidth: '80px' }} />
        </div>
      </div>

      <style>{`
        @keyframes heritagePulse {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(2.5); }
        }
      `}</style>
    </section>
  );
};

export default Heritage;