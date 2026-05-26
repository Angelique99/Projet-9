import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

const byDateDesc = data?.focus
  ?.slice()
  .sort((evtA, evtB) => 
    new Date(evtA.date) - new Date(evtB.date)
);

  // changement automatique de slide //
  useEffect(() => {

    // évite erreur si data pas encore chargée //
    if (!byDateDesc || byDateDesc.length === 0) return;

    // timer toutes les 5 secondes //
    const timer = setTimeout(() => {

      // évite dépassement du tableau //
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1: 0 );
    }, 5000);

    // nettoyage du timer //
    return () => clearTimeout(timer);

  }, [index, byDateDesc]);

  return (
  <div className="SlideCardList">

    {byDateDesc?.map((event, idx) => (
      <div
        key={`${event.title}-${idx}`}
        className={`SlideCard SlideCard--${
          index === idx ? "display" : "hide"
        }`}
      >
        <img src={event.cover} alt="forum" />

        <div className="SlideCard__descriptionContainer">
          <div className="SlideCard__description">
            <h3>{event.title}</h3>

            <p>{event.description}</p>

            <div>{getMonth(new Date(event.date))}</div>
          </div>
        </div>
      </div>
    ))}

    <div className="SlideCard__paginationContainer">
      <div className="SlideCard__pagination">

        {byDateDesc?.map((event, radioIdx) => (
          <input
            key={event.id}
            type="radio"
            name="radio-button"
            checked={index === radioIdx}
            readOnly
          />
        ))}

      </div>
    </div>

  </div>
);
};

export default Slider;
