import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Hand, Pause, Play, Sparkles } from "lucide-react";
import "./WeldingScene.css";

const sparks = Array.from({ length: 19 }, (_, index) => {
  const angle = ((-172 + index * 12) * Math.PI) / 180;
  const distance = 49 + (index % 5) * 19;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: (index * 0.13) % 1.5,
    duration: 1.1 + (index % 3) * 0.2,
    angle: (angle * 180) / Math.PI,
  };
});

export default function WeldingScene() {
  const sceneRef = useRef(null);
  const hasWelcomed = useRef(false);
  const id = "welder-" + useId().replace(/:/g, "");
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGreeting, setIsGreeting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  const greet = useCallback(() => {
    hasWelcomed.current = true;
    if (isPaused || reducedMotion) {
      setIsGreeting((value) => !value);
      return;
    }
    setIsGreeting(true);
  }, [isPaused, reducedMotion]);

  useEffect(() => {
    if (!isGreeting || !isInView || isPaused || reducedMotion) return;
    const timer = window.setTimeout(() => setIsGreeting(false), 2800);
    return () => window.clearTimeout(timer);
  }, [isGreeting, isInView, isPaused, reducedMotion]);

  useEffect(() => {
    if (!isInView || isPaused || reducedMotion) return;
    const welcome = window.setTimeout(() => {
      if (!hasWelcomed.current) greet();
    }, 1800);
    const repeat = window.setInterval(greet, 15000);
    return () => {
      window.clearTimeout(welcome);
      window.clearInterval(repeat);
    };
  }, [greet, isInView, isPaused, reducedMotion]);

  return (
    <div
      ref={sceneRef}
      className={[
        "welding-scene",
        isInView && "is-in-view",
        isPaused && "is-paused",
        isGreeting && "is-greeting",
        reducedMotion && "is-reduced-motion",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="welding-scene-heading">
        <span>
          <span className="workshop-status-dot" /> EL TALLER COBRA VIDA
        </span>
        <button
          className="welding-motion-control"
          onClick={() => setIsPaused((value) => !value)}
          aria-label={
            reducedMotion
              ? "Movimiento reducido activado en tu dispositivo"
              : isPaused
                ? "Reanudar animación del soldador"
                : "Pausar animación del soldador"
          }
          aria-pressed={isPaused}
          title={
            reducedMotion
              ? "Movimiento reducido activado en tu dispositivo"
              : isPaused
                ? "Reanudar animación"
                : "Pausar animación"
          }
          disabled={reducedMotion}
        >
          {isPaused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="welder-greeting" aria-hidden="true">
        <Hand size={17} /> ¡Hola! ¿Qué vamos a crear?
      </div>

      <svg
        className="welding-stage"
        viewBox="0 0 640 540"
        role="img"
        aria-labelledby={id + "-title " + id + "-description"}
      >
        <title id={id + "-title"}>El oficio de crear, en movimiento</title>
        <desc id={id + "-description"}>
          Ilustración de un artesano con máscara y guantes soldando una pieza en
          su mesa de trabajo. Las chispas se iluminan y el personaje levanta la
          mano para saludar.
        </desc>
        <defs>
          <linearGradient id={id + "-suit"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#2c6c83" />
            <stop offset="1" stopColor="#143b54" />
          </linearGradient>
          <linearGradient id={id + "-helmet"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6eabb7" />
            <stop offset=".38" stopColor="#2b627a" />
            <stop offset="1" stopColor="#102e46" />
          </linearGradient>
          <linearGradient id={id + "-visor"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#a5fff1" />
            <stop offset=".3" stopColor="#58c9c9" />
            <stop offset="1" stopColor="#20708a" />
          </linearGradient>
          <linearGradient id={id + "-steel"} x1="0" y1="0" x2=".5" y2="1">
            <stop stopColor="#bed9df" />
            <stop offset=".45" stopColor="#7197a8" />
            <stop offset="1" stopColor="#33566e" />
          </linearGradient>
          <linearGradient id={id + "-apron"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#648a93" />
            <stop offset="1" stopColor="#355968" />
          </linearGradient>
          <linearGradient id={id + "-glove"} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f5d5a3" />
            <stop offset="1" stopColor="#b58d61" />
          </linearGradient>
          <linearGradient id={id + "-bench"} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#345f74" />
            <stop offset="1" stopColor="#16394e" />
          </linearGradient>
          <radialGradient id={id + "-halo"}>
            <stop stopColor="#5ee1dc" stopOpacity=".15" />
            <stop offset="1" stopColor="#5ee1dc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id + "-arc"}>
            <stop stopColor="#fff" />
            <stop offset=".18" stopColor="#bcfff9" stopOpacity=".9" />
            <stop offset=".5" stopColor="#59f0e5" stopOpacity=".25" />
            <stop offset="1" stopColor="#59f0e5" stopOpacity="0" />
          </radialGradient>
          <pattern
            id={id + "-peg"}
            width="19"
            height="19"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="8" cy="8" r="1.5" fill="#4d8192" opacity=".55" />
          </pattern>
          <filter
            id={id + "-shadow"}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="10"
              floodColor="#031521"
              floodOpacity=".35"
            />
          </filter>
          <filter
            id={id + "-glow"}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Quiet workshop details give the animated character a place to belong. */}
        <circle cx="322" cy="253" r="215" fill={"url(#" + id + "-halo)"} />
        <circle
          className="workshop-orbit"
          cx="322"
          cy="252"
          r="188"
          fill="none"
          stroke="#5cc4ce"
          strokeWidth="1"
          strokeDasharray="3 15"
          opacity=".2"
        />
        <path
          d="M53 460H590M73 485H570M135 511H510"
          stroke="#2f5a70"
          strokeWidth="1"
          opacity=".35"
        />
        <ellipse
          cx="326"
          cy="495"
          rx="244"
          ry="26"
          fill="#061c2c"
          opacity=".8"
        />
        <ellipse
          className="workshop-floor-light"
          cx="391"
          cy="480"
          rx="109"
          ry="14"
          fill="#65ddd7"
          opacity=".06"
        />

        <g opacity=".8">
          <rect
            x="59"
            y="155"
            width="123"
            height="160"
            rx="10"
            fill="#14394d"
            stroke="#305b70"
          />
          <rect
            x="68"
            y="164"
            width="105"
            height="141"
            rx="5"
            fill={"url(#" + id + "-peg)"}
          />
          <path
            d="M85 188v61m-8-66 8 8 8-8m-8 57-7 9 7 9 7-9-7-9"
            fill="none"
            stroke="#7aa9b8"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M125 204v64m-15-68h30v-10h-30z"
            fill="#638d9f"
            stroke="#638d9f"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <rect x="149" y="216" width="7" height="54" rx="3" fill="#a2b8bb" />
          <path d="m152 213-5-17 5-9 5 9z" fill="#5b8194" />
          <path d="M75 335h90v75H75z" fill="#16374b" stroke="#31596e" />
          <path d="M76 359h88m-88 25h88" stroke="#31596e" />
          <path
            d="M110 347h20m-20 26h20m-20 26h20"
            stroke="#7a9daf"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        <g opacity=".8">
          <path d="M465 29v39" stroke="#3e697c" strokeWidth="3" />
          <path d="m437 91 9-26h38l11 26z" fill="#426b7b" stroke="#7297a4" />
          <path
            d="M431 91h70"
            stroke="#81b4bc"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="m442 98-50 115h148L487 98" fill="#8af0e1" opacity=".025" />
          <rect
            x="515"
            y="274"
            width="45"
            height="145"
            rx="18"
            fill={"url(#" + id + "-steel)"}
          />
          <path
            d="M526 274v-13h22v13"
            fill="#32576c"
            stroke="#6c98a9"
            strokeWidth="2"
          />
          <path
            d="M530 260h15m-8-10v10"
            stroke="#94bfcb"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M517 318h41v20h-41z" fill="#22596c" />
          <path
            d="M532 327h12"
            stroke="#8dd9d7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="welding-hose"
            d="M537 267c60 0 54 173 21 180-42 9-56-7-68-44-12-35-59-82-95-76"
            fill="none"
            stroke="#061b2a"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            className="welding-hose"
            d="M537 267c60 0 54 173 21 180-42 9-56-7-68-44-12-35-59-82-95-76"
            fill="none"
            stroke="#39697e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* The artisan's silhouette, protective clothing, and welding helmet. */}
        <g filter={"url(#" + id + "-shadow)"}>
          <path
            d="m244 351-15 123 43 2 24-116m9-3 3 119h43l-7-125"
            fill="#17374c"
            stroke="#0b2538"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="m250 395-8 69m88-68 5 67"
            stroke="#33586b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M228 469h45l5 21h-69c-2-8 5-17 19-21Zm81 0h42l18 15c3 3 2 8-3 8h-60Z"
            fill="#10283a"
            stroke="#466577"
            strokeWidth="2"
          />
          <path
            d="M214 490h61m36 2h54"
            stroke="#92aeb9"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g className="welder-body">
            <path
              d="M252 214c-28 0-49 18-48 43l13 104c36 17 90 20 137 1l-3-107c0-26-20-41-48-42Z"
              fill={"url(#" + id + "-suit)"}
              stroke="#173b52"
              strokeWidth="3"
            />
            <path
              d="m245 217 8 27 48 3 20-32"
              fill="#0f3047"
              stroke="#608d9c"
              strokeWidth="3"
            />
            <path
              d="m243 223 10 29h-13l-12 109c28 17 76 22 116 2l-24-111h-13l10-29-11-3-14 33h-26l-12-32Z"
              fill={"url(#" + id + "-apron)"}
              stroke="#2c586c"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="m251 268-6 87c24 10 49 12 81 2l-16-89Z"
              fill="none"
              stroke="#a0b7b8"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              opacity=".55"
            />
            <rect
              x="261"
              y="274"
              width="42"
              height="35"
              rx="4"
              fill="#3c6575"
              stroke="#8eaaad"
            />
            <path
              d="M266 281h31"
              stroke="#bad2cf"
              strokeWidth="1.5"
              opacity=".65"
            />
            <circle cx="257" cy="252" r="3" fill="#c8e9df" />
            <circle cx="303" cy="252" r="3" fill="#c8e9df" />
            <g className="welder-head">
              <path
                d="M271 204v23c11 8 25 8 36 0v-28"
                fill="#12364a"
                stroke="#496c7d"
                strokeWidth="3"
              />
              <path
                d="M252 148c0-32 18-49 51-49 25 0 45 13 52 40l14 26-15 56c-26 17-57 19-88 5l-16-36Z"
                fill={"url(#" + id + "-helmet)"}
                stroke="#77a9b6"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M265 139c4-19 18-27 38-27 15 0 30 7 37 21"
                fill="none"
                stroke="#abd4d7"
                strokeWidth="4"
                strokeLinecap="round"
                opacity=".6"
              />
              <path
                d="m265 151 78-5 13 17-8 44-75 7-12-17Z"
                fill="#0b263b"
                stroke="#709caa"
                strokeWidth="2"
              />
              <path
                d="m274 158 63-4 9 13-6 28-60 6-9-12Z"
                fill={"url(#" + id + "-visor)"}
              />
              <path
                d="m282 158 26-1-18 42-9 1-9-11Z"
                fill="#e2fffa"
                opacity=".25"
              />
              <path
                d="m321 155 10-1-17 43-10 1Z"
                fill="#d6fff5"
                opacity=".13"
              />
              <path
                className="welder-visor-shine"
                d="m277 191 61-5"
                stroke="#d9ffff"
                strokeWidth="2"
                opacity=".3"
              />
              <circle
                cx="256"
                cy="173"
                r="12"
                fill="#244d65"
                stroke="#8bbac0"
                strokeWidth="3"
              />
              <circle cx="256" cy="173" r="4" fill="#74d9d3" />
              <path
                d="m280 221 49-4"
                stroke="#6c9caa"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>

        {/* A solid steel workbench and the piece taking shape on top. */}
        <g>
          <path
            d="m141 372-6 120h20l15-120m307 0 17 120h20l-9-120"
            fill="#17374c"
            stroke="#496d81"
            strokeWidth="2"
          />
          <path d="M153 462h341" stroke="#24485e" strokeWidth="9" />
          <path
            d="m123 350 355-3 43 21-353 10Z"
            fill={"url(#" + id + "-steel)"}
            stroke="#93b5bf"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M168 378v25l354-11v-24Z"
            fill={"url(#" + id + "-bench)"}
            stroke="#5b8294"
            strokeWidth="1.5"
          />
          <path
            d="m123 350 1 26 44 27v-25Z"
            fill="#21485e"
            stroke="#7296a7"
            strokeWidth="1.5"
          />
          <path
            d="m182 385 313-10"
            stroke="#8fbdc7"
            strokeWidth="2"
            opacity=".4"
          />
          <path
            className="bench-light-line"
            d="m182 385 313-10"
            stroke="#7df7eb"
            strokeWidth="2"
            strokeDasharray="30 290"
            opacity=".6"
          />
          <circle cx="187" cy="391" r="2.5" fill="#9ab6c0" />
          <circle cx="502" cy="379" r="2.5" fill="#9ab6c0" />
          <path
            d="m342 345 66-6 39 8-69 8Z"
            fill="#a4c6ce"
            stroke="#5f8ea0"
            strokeWidth="1.5"
          />
          <path d="m378 355 69-8v11l-69 8Z" fill="#40687e" stroke="#95bec9" />
          <path
            d="m402 341 5-43 14 3-3 43Z"
            fill="#608fa1"
            stroke="#b3d9dc"
            strokeWidth="1.5"
          />
          <path d="m407 298 14 3 8-5-14-4Z" fill="#c2dfdf" />
          <path d="m421 301 8-5-8 43-3 5Z" fill="#31586f" />
          <path d="m198 343 16-3 4 6-15 4Z" fill="#6c97a8" stroke="#a6c7d0" />
          <path
            d="m206 342 11-15"
            stroke="#b7cfce"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        <g className="welder-support-arm">
          <path
            d="m226 249-17 44 67 38"
            fill="none"
            stroke="#14364e"
            strokeWidth="37"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m226 249-17 44 67 38"
            fill="none"
            stroke={"url(#" + id + "-suit)"}
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m262 317 23-2 22 17c6 5 6 11-1 15l-14 2-27-14Z"
            fill={"url(#" + id + "-glove)"}
            stroke="#8b775b"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m288 328 12 10m-18-4 11 10"
            stroke="#997c58"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="m261 315 9 19" stroke="#e8d1a5" strokeWidth="3" />
        </g>

        <g className="welding-action">
          <g className="welder-working-arm">
            <path
              d="m337 248 28 37-22 29"
              fill="none"
              stroke="#14364e"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m337 248 28 37-22 29"
              fill="none"
              stroke={"url(#" + id + "-suit)"}
              strokeWidth="29"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m333 305 20-2 25 16-11 20-16-3-21-16Z"
              fill={"url(#" + id + "-glove)"}
              stroke="#987e5d"
              strokeWidth="2"
            />
            <path
              d="m349 311 18 12m-21-7 14 10"
              stroke="#b1946b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="m368 318 17 8-6 13-17-8Z"
              fill="#112e43"
              stroke="#8aaeba"
              strokeWidth="1.5"
            />
            <path
              d="m381 330 11 5 10 11"
              fill="none"
              stroke="#adcbd2"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="m400 344 7 7"
              stroke="#e2fff9"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          <g className="welding-arc" transform="translate(407 351)">
            <circle className="arc-halo" r="69" fill={"url(#" + id + "-arc)"} />
            <circle
              r="15"
              fill="#93fff3"
              opacity=".25"
              filter={"url(#" + id + "-glow)"}
            />
            <path
              d="m-13 0 9-3 4-13 4 13 14 3-14 3-4 12-4-12Z"
              fill="#d3fff9"
            />
            <circle r="4" fill="#fff" />
          </g>
          <g
            className="welding-sparks"
            transform="translate(407 351)"
            aria-hidden="true"
          >
            {sparks.map((spark, index) => (
              <g
                className="welding-spark"
                key={index}
                style={{
                  "--spark-x": spark.x + "px",
                  "--spark-y": spark.y + "px",
                  "--spark-delay": spark.delay + "s",
                  "--spark-duration": spark.duration + "s",
                }}
              >
                <path
                  d={
                    "M0 0l" +
                    Math.cos((spark.angle * Math.PI) / 180) * 8 +
                    " " +
                    Math.sin((spark.angle * Math.PI) / 180) * 8
                  }
                  stroke={index % 3 === 0 ? "#aafff5" : "#ffda93"}
                  strokeWidth={index % 2 ? "2" : "2.5"}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
          <g
            className="welding-smoke"
            fill="none"
            stroke="#91dadb"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="smoke-trail smoke-one"
              d="M413 325c-13-10 9-18-2-29s-4-15 2-20"
            />
            <path
              className="smoke-trail smoke-two"
              d="M424 327c11-12-6-20 2-31s0-13-3-17"
            />
          </g>
        </g>

        {/* A separate arm pose makes the greeting readable and natural. */}
        <g className="waving-action">
          <g className="welder-waving-arm">
            <path
              d="m338 249 39 10 20-49"
              fill="none"
              stroke="#14364e"
              strokeWidth="37"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m338 249 39 10 20-49"
              fill="none"
              stroke={"url(#" + id + "-suit)"}
              strokeWidth="30"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g className="welder-waving-hand">
              <path
                d="m385 215-6-24-9-13c-4-6 1-11 6-7l10 9-4-31c-1-8 8-9 9-2l5 22 2-30c1-8 10-7 10 1v29l8-23c3-7 11-4 8 3l-7 28 12-13c5-5 11 1 6 7l-17 24-8 22Z"
                fill={"url(#" + id + "-glove)"}
                stroke="#997e5b"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="m390 208 19 3m-21-27 14 7 11-1"
                fill="none"
                stroke="#a58b66"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="m385 212 24 6"
                stroke="#f3ddb2"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </g>
          <g
            className="wave-marks"
            fill="none"
            stroke="#8aeee0"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="m441 156 9-9m-7 30 13-1m-18 22 10 7" />
          </g>
          <path
            d="m383 347 18-1 8 9"
            fill="none"
            stroke="#b4d6dc"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect
            x="367"
            y="341"
            width="23"
            height="11"
            rx="3"
            fill="#17394e"
            stroke="#81aab9"
            transform="rotate(-5 367 341)"
          />
        </g>

        <g opacity=".6" fill="none" stroke="#537f93" strokeWidth="1">
          <path d="M36 91V60h31M574 60h31v31M36 458v31h31M574 489h31v-31" />
          <path d="M48 265h18m-9-9v18m523-58h18m-9-9v18" />
        </g>
      </svg>

      <div className="welding-scene-footer">
        <span className="welding-scene-motto">
          <Sparkles size={17} aria-hidden="true" />
          <span>
            CADA CHISPA,
            <br />
            <strong>UNA NUEVA IDEA.</strong>
          </span>
        </span>
        <button
          className="welder-greet-button"
          onClick={greet}
          aria-pressed={isGreeting}
        >
          <Hand size={16} aria-hidden="true" />
          {isGreeting && (isPaused || reducedMotion)
            ? "Volver al trabajo"
            : "Dile hola"}
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
