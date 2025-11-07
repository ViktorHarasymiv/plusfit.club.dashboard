import React, { useEffect } from "react";
import { usePortfolioStore } from "../../../store/portfolioStore";

import css from "./Style.module.css";

function AllPhoto() {
  const { fetchPortfolio, deletePhoto, portfolio } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div className={css.wrapper}>
      {portfolio.map(({ _id, alt, section, photo }, index) => {
        return (
          <div key={index} className={css.images_block}>
            <img
              src={photo}
              width={250}
              height={170}
              alt={alt}
              className={css.image}
            />
            <p>{alt}</p>
            <p>{section}</p>
            <button
              type="button"
              onClick={() => deletePhoto(_id, photo)}
              className="button"
            >
              Видалити
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AllPhoto;
