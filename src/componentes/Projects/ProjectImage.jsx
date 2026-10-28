/* eslint-disable react/prop-types -- Component props follow the project's JSX convention. */
import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function ProjectImage({
  src,
  alt,
  eager = false,
  className = "",
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const optimizedSrc = src.replace("/upload/", "/upload/f_auto,q_auto,w_1000/");
  return (
    <div
      className={
        "catalog-image " +
        (loaded ? "is-loaded " : "") +
        (failed ? "has-error " : "") +
        className
      }
    >
      {failed ? (
        <span className="catalog-image-error">
          <ImageOff size={28} aria-hidden="true" />
          Imagen no disponible
        </span>
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          width="1000"
          height="800"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
