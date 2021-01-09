import React, { useContext } from "react";
import {
  SpeakerContext,
  SpeakersProvider,
} from "../src/contexts/SpeakersContext";

const SpeakersComponent = () => {
  const speakers = useContext(SpeakerContext);

  return (
    <div>
      {speakers.map(({ imageSrc, name }) => {
        return (
          <img src={`/images/${imageSrc}.png`} alt={name} key={imageSrc} />
        );
      })}
    </div>
  );
};

const Speakers = () => {
  return (
    <SpeakersProvider>
      <SpeakersComponent></SpeakersComponent>
    </SpeakersProvider>
  );
};

export default Speakers;
