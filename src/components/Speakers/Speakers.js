import React from 'react';
import withData from './withData';

const Speakers = ({ speakers }) => {
  return (
    <div>
      {speakers.map((speaker) => {
        return <img src={`/images/${speaker.imageSrc}.png`} alt={speaker.name} key={speaker.imageSrc}/>
      })}
    </div>
  );
};

const maxSpeakersToShow = 2;
export default withData(maxSpeakersToShow)(Speakers);