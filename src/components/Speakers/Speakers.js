import React from 'react';

const Speakers = () => {

  const speakers = [
    {
      imageSrc: "speaker-component-1124",
      name: "Douglas Crockford"
    },
    {
      imageSrc: "speaker-component-1530",
      name: "Tamara Baker"
    },
    {
      imageSrc: "speaker-component-10803",
      name: "Eugene Chuvyrov"
    }
  ]

  return (
    <div>
      {speakers.map((speaker) => {
        return <img src={`/images/${speaker.imageSrc}.png`} alt={speaker.name} key={speaker.imageSrc}/>
      })}
    </div>
  );
};

export default Speakers;