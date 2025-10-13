import React, { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePortfolioStore } from "../../../../store/portfolioStore";

function AllPhoto() {
  // const queryClient = useQueryClient();

  const { fetchPortfolio, deletePhoto, portfolio } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div>
      {portfolio.map(({ _id, alt, section, photo }, index) => {
        return (
          <div key={index}>
            <img src={photo} width={250} height={150} alt={alt} />
            <p>{alt}</p>
            <p>{section}</p>
            <button type="button" onClick={() => deletePhoto(_id, photo)}>
              Видали мене
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AllPhoto;
