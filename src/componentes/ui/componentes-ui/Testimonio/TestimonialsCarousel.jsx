/* eslint-disable react/prop-types -- Component props follow the project's JSX convention. */
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Modal from "../../Modal";
import "./TestimonialsCarousel.css";

const visibleCards = (total) =>
  Math.max(
    1,
    Math.min(
      total,
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1,
    ),
  );

function ReviewCard({ testimonial, index, total, onRead }) {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const name = testimonial.nombre || "Cliente de Inox Rossel";

  useEffect(() => {
    let active = true;
    const text = textRef.current;
    const measure = () => {
      if (active && text)
        setIsTruncated(text.scrollHeight > text.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(text);
    document.fonts?.ready.then(measure);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [testimonial.texto]);

  return (
    <figure
      className="review-card"
      role="group"
      aria-roledescription="comentario"
      aria-label={index + 1 + " de " + total}
    >
      <figcaption className="review-author">
        <span className="review-avatar" aria-hidden="true">
          {name.slice(0, 1).toUpperCase()}
        </span>
        <span className="review-author-info">
          <strong title={name}>{name}</strong>
          <small>Cliente de Inox Rossel</small>
        </span>
      </figcaption>
      <blockquote className="review-text" ref={textRef}>
        {testimonial.texto}
      </blockquote>
      <div className="review-card-footer">
        {isTruncated && (
          <button
            className="review-read-more"
            onClick={() => onRead(testimonial)}
            aria-label={"Leer comentario completo de " + name}
          >
            Leer completo <ArrowUpRight size={13} aria-hidden="true" />
          </button>
        )}
      </div>
    </figure>
  );
}

export default function TestimonialsCarousel({ testimonials }) {
  const railRef = useRef(null);
  const id = "reviews-" + useId().replace(/:/g, "");
  const [perView, setPerView] = useState(() =>
    visibleCards(testimonials.length),
  );
  const [position, setPosition] = useState({ page: 0, first: 0 });
  const [selected, setSelected] = useState(null);
  const total = testimonials.length;
  const pageCount = Math.ceil(total / perView);

  useEffect(() => {
    const onResize = () => setPerView(visibleCards(total));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [total]);

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: "instant" });
    setPosition({ page: 0, first: 0 });
  }, [perView, total]);

  const updatePosition = () => {
    const rail = railRef.current;
    if (!rail || !rail.children.length) return;
    const step = rail.children[1]
      ? rail.children[1].offsetLeft - rail.children[0].offsetLeft
      : rail.clientWidth;
    const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 3;
    const first = Math.max(
      0,
      Math.min(total - perView, Math.round(rail.scrollLeft / step)),
    );
    const page = atEnd
      ? pageCount - 1
      : Math.min(pageCount - 1, Math.round(first / perView));
    setPosition((previous) =>
      previous.page === page && previous.first === first
        ? previous
        : { page, first },
    );
  };

  const goToPage = (page) => {
    const rail = railRef.current;
    if (!rail) return;
    const boundedPage = Math.max(0, Math.min(pageCount - 1, page));
    const target =
      rail.children[Math.min(boundedPage * perView, total - perView)];
    if (!target) return;
    rail.scrollTo({
      left: target.offsetLeft - rail.children[0].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const firstDot = Math.max(0, Math.min(position.page - 2, pageCount - 5));
  const dotPages = Array.from(
    { length: Math.min(pageCount, 5) },
    (_, index) => firstDot + index,
  );

  return (
    <div
      className={[
        "reviews-carousel",
        total > perView && "can-scroll",
        total === 1 && "is-single",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--reviews-visible": perView }}
    >
      <div
        id={id}
        ref={railRef}
        className="reviews-rail"
        role="group"
        aria-roledescription="carrusel"
        aria-label="Comentarios de nuestros clientes"
        tabIndex={pageCount > 1 ? 0 : undefined}
        onScroll={updatePosition}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goToPage(position.page + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToPage(position.page - 1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            goToPage(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            goToPage(pageCount - 1);
          }
        }}
      >
        {testimonials.map((testimonial, index) => (
          <ReviewCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
            total={total}
            onRead={setSelected}
          />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="reviews-navigation">
          <div
            className="reviews-count"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span aria-hidden="true">
              {String(position.first + 1).padStart(2, "0")}
              {perView > 1 && (
                <>
                  –
                  {String(Math.min(position.first + perView, total)).padStart(
                    2,
                    "0",
                  )}
                </>
              )}{" "}
              <span>/ {String(total).padStart(2, "0")}</span>
            </span>
            <span className="sr-only">
              Mostrando comentarios {position.first + 1} a{" "}
              {Math.min(position.first + perView, total)} de {total}.
            </span>
          </div>
          <div
            className="reviews-dots"
            role="group"
            aria-label="Páginas de comentarios"
          >
            {dotPages.map((page) => (
              <button
                key={page}
                className={position.page === page ? "is-active" : ""}
                aria-label={
                  "Ver comentarios " +
                  (Math.min(page * perView, total - perView) + 1) +
                  " a " +
                  Math.min(page * perView + perView, total)
                }
                aria-current={position.page === page ? "true" : undefined}
                aria-controls={id}
                onClick={() => goToPage(page)}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="reviews-arrows">
            <button
              onClick={() => goToPage(position.page - 1)}
              disabled={position.page === 0}
              aria-label="Comentarios anteriores"
              aria-controls={id}
            >
              <ArrowLeft size={17} aria-hidden="true" />
            </button>
            <button
              onClick={() => goToPage(position.page + 1)}
              disabled={position.page === pageCount - 1}
              aria-label="Siguientes comentarios"
              aria-controls={id}
            >
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      {selected && (
        <Modal
          title={
            "Experiencia de " + (selected.nombre || "un cliente de Inox Rossel")
          }
          onClose={() => setSelected(null)}
        >
          <p className="review-full-text">{selected.texto}</p>
          <span className="review-modal-signature">
            Una experiencia con nuestro taller.
          </span>
        </Modal>
      )}
    </div>
  );
}
