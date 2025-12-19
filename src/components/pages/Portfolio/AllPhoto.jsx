import React, { useEffect } from "react";
import { usePortfolioStore } from "../../../store/portfolioStore";

// MEDIA

import style from "../../../styles/Form.module.css";

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
            <div className={css.action_wrapper}>
              <div>
                <p>{alt}</p>
                <p>{section}</p>
              </div>
              <button
                type="button"
                onClick={() => deletePhoto(_id, photo)}
                className={style.button}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllPhoto;
