/* eslint-disable react/prop-types -- Component props follow the project's JSX convention. */
import { ArrowUpRight } from "lucide-react";
import ProjectImage from "./ProjectImage";

export default function ProjectCard({ project, index, categoryName, onOpen }) {
  return (
    <button
      className="catalog-card"
      onClick={onOpen}
      aria-label={"Ver proyecto: " + project.title}
    >
      <div className="catalog-card-visual">
        <ProjectImage
          src={project.imageUrl}
          alt={project.title}
          eager={index < 3}
        />
        <span className="catalog-card-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="catalog-card-arrow">
          <ArrowUpRight size={23} aria-hidden="true" />
        </span>
      </div>
      <div className="catalog-card-copy">
        <span className="catalog-card-category">{categoryName}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <span className="catalog-card-detail">
          Conocer el proyecto <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}
