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
  const [active, setActive] = useState(0);

  /* refs */
  const carouselRef = useRef<HTMLDivElement>(null);   // слой с точками
  const yearsRef    = useRef<HTMLDivElement>(null);   // пара больших лет

  /* угол между точками */
  const sliceAngle = 360 / slices.length;

  /* уникальный id для стрелок Swiper-а */
  const uid = useMemo(() => Math.random().toString(36).slice(2, 10), []);

  const ORBIT_SIZE = 360;   
  const ADJUST = 3;                       // на сколько увеличить радиус
  const R = ORBIT_SIZE / 2 + ADJUST

  /* вращаем карусель при смене active */
  useEffect(() => {
    if (!carouselRef.current) return;
    gsap.to(carouselRef.current, {
      rotate: -sliceAngle * active,
      duration: .6,
      ease: 'power3.inOut'
    });
  }, [active, sliceAngle]);

  /* лёгкая анимация фигур */
  useEffect(() => {
    if (!yearsRef.current) return;
    gsap.fromTo(
      yearsRef.current.children,
      { yPercent: 20, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: .5, stagger: .05 }
    );
  }, [active]);

  /* переключатели окружности */
  const prev = () => setActive(a => (a - 1 + slices.length) % slices.length);
  const next = () => setActive(a => (a + 1) % slices.length);

  return (
    <section className="timeline">
      <h2 className="tl-title">Исторические даты</h2>

      {/* ───── ОКРУЖНОСТЬ ───── */}
      <div className="orbit">
        <div ref={carouselRef} className="carousel">
          {slices.map((slice, i) => (
            <div
              key={slice.id}
              className={`pin${i === active ? ' active' : ''}`}
              /* ⬇︎ единственная правка: -R вместо -160 */
              style={{ transform: `rotate(${sliceAngle * i}deg) translateY(-${R}px)` }}
              onClick={() => setActive(i)}
            >
              <span className="dot" />
              {i === active && (
                <span className="label">
                  <span className="num">{i + 1}</span>
                  {slice.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ───── БОЛЬШИЕ ЛЕТА ───── */}
      <div ref={yearsRef} className="years">
        <span>{slices[active].from}</span>
        <span>{slices[active].to}</span>
      </div>

      {/* ───── НАВИГАЦИЯ ‹ 01/06 › ───── */}
      <div className="slice-nav">
        <button onClick={prev}>‹</button>
        <span>{String(active + 1).padStart(2, '0')}/{String(slices.length).padStart(2, '0')}</span>
        <button onClick={next}>›</button>
      </div>

      {/* ───── КАРУСЕЛЬ СОБЫТИЙ ───── */}
      <div className="events">
        <button className={`ev-prev-${uid} ev-btn`}>‹</button>

        <Swiper
          className="swiper"
          slidesPerView="auto"
          spaceBetween={32}
          navigation={{ prevEl: `.ev-prev-${uid}`, nextEl: `.ev-next-${uid}` }}
          key={slices[active].id}
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
