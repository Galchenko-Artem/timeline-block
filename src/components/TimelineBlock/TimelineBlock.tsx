/* TimelineBlock.tsx
   ───────────────────────────────────────────────────────── */
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import gsap from 'gsap';

import 'swiper/css';
import 'swiper/css/navigation';
import './TimelineBlock.scss';
import { TimeSlice } from './types';

SwiperCore.use([Navigation]);

interface Props { slices: TimeSlice[] }

export const TimelineBlock: React.FC<Props> = ({ slices }) => {
  /* ---------------- state / refs ---------------- */
  const [active, setActive] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);   // слой-карусель с точками
  const yearsRef    = useRef<HTMLDivElement>(null);   // «1980  1986»

  /* ---------------- geometry -------------------- */
  const sliceAngle  = 360 / slices.length;
  const ORBIT_SIZE  = 360;        // ⌀ окружности
  const ADJUST      = 3;          // чуть дальше, чем радиус
  const R           = ORBIT_SIZE / 2 + ADJUST;

  /* ---------------- swiper id ------------------- */
  const uid = useMemo(() => Math.random().toString(36).slice(2, 10), []);

  /* ---------------- rotation animation ---------- */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const toDeg = -sliceAngle * active;                    // целевой угол

    gsap.to(el, {
      rotation: toDeg,
      duration: .6,
      ease: 'power3.inOut',

      /* ⇣ при каждом кадре пишем «встречный» угол в CSS-переменную */
      onUpdate() {
        const cur = gsap.getProperty(el, 'rotation') as number;
        el.style.setProperty('--rot', `${-cur}deg`);       // «минус»!
      }
    });
  }, [active, sliceAngle]);

  /* лёгкая смена крупных лет */
  useEffect(() => {
    if (!yearsRef.current) return;
    gsap.fromTo(
      yearsRef.current.children,
      { yPercent: 20, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: .5, stagger: .05 }
    );
  }, [active]);

  /* ---------------- helpers --------------------- */
  const prev = () => setActive(a => (a - 1 + slices.length) % slices.length);
  const next = () => setActive(a => (a + 1) % slices.length);

  /* ================== render ==================== */
  return (
    <section className="timeline">
      <h2 className="tl-title">Исторические даты</h2>

      {/* ───── окружность ───── */}
      <div className="orbit">
        <div ref={carouselRef} className="carousel">
          {slices.map((slice, i) => {
            const angle = sliceAngle * i;                 // собственный угол точки

            return (
              <div
                key={slice.id}
                className={`pin${i === active ? ' active' : ''}`}
                style={{ transform: `rotate(${angle}deg) translateY(-${R}px)` }}
                onClick={() => setActive(i)}
              >
                {/* точка + цифра (компенсируем оба вращения) */}
                <span
                  className="dot"
                  style={{ transform: `rotate(calc(var(--rot) - ${angle}deg))` }}
                >
                  <span className="num">{i + 1}</span>
                </span>

                {/* подпись — только у выбранной */}
                {i === active && (
                  <span
                    className="label"
                    style={{ transform: `translateX(-50%) rotate(calc(var(--rot) - ${angle}deg))` }}
                  >
                    {slice.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* ───── большие года ───── */}
      <div ref={yearsRef} className="years">
        <span>{slices[active].from}</span>
        <span>{slices[active].to}</span>
      </div>
      {/* ───── нав-бар «‹ 01/06 ›» ───── */}
      <div className="slice-nav">
        <span className="counter">
          {String(active + 1).padStart(2, '0')}/{String(slices.length).padStart(2, '0')}
        </span>
        <div className="arrows">
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </div>
      </div>
      {/* ───── события внутри слайда ───── */}
      <div className="events">
        <button className={`ev-prev-${uid} ev-btn`}>‹</button>
        <Swiper
          className="swiper"
          slidesPerView="auto"
          spaceBetween={32}
          navigation={{ prevEl: `.ev-prev-${uid}`, nextEl: `.ev-next-${uid}` }}
          key={slices[active].id}                           /* сброс позиции */
        >
          {slices[active].events.map(ev => (
            <SwiperSlide key={ev.year}>
              <h3>{ev.year}</h3>
              <p>{ev.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={`ev-next-${uid} ev-btn`}>›</button>
      </div>
    </section>
  );
};
