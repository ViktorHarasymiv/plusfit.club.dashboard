import React, { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePortfolioStore } from "../../../../store/portfolioStore";

function AllPhoto() {
  // const queryClient = useQueryClient();

  const { fetchPortfolio, portfolio } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // useQuery({
  //   queryKey: ["portfolio"],
  //   queryFn: () => fetchPortfolio(),
  //   select: (data) => data.result.data,
  // });

  return (
    <div>
      {portfolio.map(({ alt, section, photo }, index) => {
        return (
          <div key={index}>
            <img src={photo} width={250} height={150} alt={alt} />
            <p>{alt}</p>
            <p>{section}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AllPhoto;
