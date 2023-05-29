import React, { useEffect, useState } from "react";
import HomeCard from "../Components/Card/HomeCard";
import NoHomeFound from "../Components/Card/NoHomeFound";
import SearchForm from "../Components/Form/SearchForm";
import Spinner from "../Components/Spinner/Spinner";
import { getAllHome } from "../api/services";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    getAllHome()
      .then((data) => {
        setHomes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  console.log("home", homes);

  return (
    <div className="justify-center gap-10">
      <div className="mt-4">
        <SearchForm setHomes={setHomes} setLoading={setLoading} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex-1 mt-4">
          {homes.length === 0 ? (
            <NoHomeFound />
          ) : (
            <>
              {homes.filter((home) => home.category === "rent").length > 0 && (
                <div className="pb-8 mx-auto">
                  <h1 className="py-3 text-2xl font-semibold">Rent Homes:</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                    {homes
                      .filter((home) => home.category === "rent")
                      .map((home, i) => (
                        <HomeCard key={i} home={home} />
                      ))}
                  </div>
                </div>
              )}
              {homes.filter((home) => home.category === "vacation").length >
                0 && (
                <div className="pb-8 mx-auto">
                  <h1 className="py-3 text-2xl font-semibold">
                    Vacation Homes:
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                    {homes
                      .filter((home) => home.category === "vacation")
                      .map((home, i) => (
                        <HomeCard key={i} home={home} />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
