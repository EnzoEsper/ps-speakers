import React, { useEffect, useState } from 'react';
import Speaker from '../Speaker/Speaker';
import SpeakerSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';
import axios from 'axios';

const Speakers = () => {
  // const speakersArray = [
  //   {
  //     imageSrc: 'speaker-component-1124',
  //     name: 'Douglas Crockford',
  //     id: 1124,
  //     firstName: 'Douglas',
  //     lastName: 'Crockford',
  //     sat: true,
  //     sun: false,
  //     isFavorite: false,
  //     bio:
  //       'Douglas Crockford discovered the JSON Data Interchange Format. He is also the author of _JavaScript: The Good Parts_. He has been called a guru, but he is actually more of a mahatma.',
  //   },
  //   {
  //     imageSrc: 'speaker-component-1530',
  //     name: 'Tamara Baker',
  //     id: 1530,
  //     firstName: 'Tamara',
  //     lastName: 'Baker',
  //     sat: false,
  //     sun: true,
  //     isFavorite: true,
  //     bio:
  //       'Tammy has held a number of executive and management roles over the past 15 years, including VP engineering Roles at Molekule Inc., Cantaloupe Systems, E-Color, and Untangle Inc.',
  //   },
  //   {
  //     imageSrc: 'speaker-component-10803',
  //     name: 'Eugene Chuvyrov',
  //     id: 10803,
  //     firstName: 'Eugene',
  //     lastName: 'Chuvyrov',
  //     sat: true,
  //     sun: false,
  //     isFavorite: false,
  //     bio:
  //       'Eugene Chuvyrov is  a Senior Cloud Architect at Microsoft. He works directly with both startups and enterprises to enable their solutions in Microsoft cloud, and to make Azure better as a result of this work with partners.',
  //   },
  // ];

  function toggleSpeakerFavorite(speakerRec) {
    return {
      ...speakerRec,
      isFavorite: !speakerRec.isFavorite
    };
  }

  async function onFavoriteToggleHandler(speakerRec) {
    const toggledSpeakerRec = toggleSpeakerFavorite(speakerRec);
    const speakerIndex = speakers.map((speaker) => speaker.id).indexOf(speakerRec.id);

    await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledSpeakerRec);

    setSpeakers([...speakers.slice(0, speakerIndex), toggledSpeakerRec, ...speakers.slice(speakerIndex + 1)]);
  }
  
  const [searchQuery, setSearchQuery] = useState("");
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    
    const fetchData = async() => {
      const response = await axios.get("http://localhost:4000/speakers");
      setSpeakers(response.data);
    }

    fetchData();
  }, [])

  return (
    <div>
      <SpeakerSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        {speakers
        .filter((rec) => {
          const targetString = `${rec.firstName} ${rec.lastName}`.toLowerCase();
          return searchQuery.length === 0 ? true : targetString.includes(searchQuery.toLowerCase());
        })
        .map((speaker) => (
          <Speaker key={speaker.id} {...speaker} onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}/>
        ))}
      </div>
    </div>
  );
};

export default Speakers;


// *************************
// EXAMPLE WITH CONTEXT API
// *************************
// import React, { useContext } from 'react';
// import SpeakerContext from './SpeakerContext';

// const Speakers = () => {
//   const speakers = useContext(SpeakerContext);
//   return (
//     <div>
//       {speakers.map((speaker) => {
//         return <img src={`/images/${speaker.imageSrc}.png`} alt={speaker.name} key={speaker.imageSrc}/>
//       })}
//     </div>
//   );
// };

// export default Speakers;


// *************************
// EXAMPLE WITH RENDER PROPS
// *************************
// import React from 'react';
// import SpeakersRenderProps from './SpeakersRenderProps';

// const Speakers = () => {
//   return (
//     <SpeakersRenderProps>
//       {({speakers}) => {
//         return (
//           <div>
//             {speakers.map((speaker) => {
//               return <img src={`/images/${speaker.imageSrc}.png`} alt={speaker.name} key={speaker.imageSrc}/>
//             })}
//           </div>
//         )
//       }}
//     </SpeakersRenderProps>
//   );
// };

// export default Speakers;


// *****************
// EXAMPLE WITH HOC
// *****************
// import React from 'react';
// import withData from './withData';

// const Speakers = ({ speakers }) => {
//   return (
//     <div>
//       {speakers.map((speaker) => {
//         return <img src={`/images/${speaker.imageSrc}.png`} alt={speaker.name} key={speaker.imageSrc}/>
//       })}
//     </div>
//   );
// };

// const maxSpeakersToShow = 2;
// export default withData(maxSpeakersToShow)(Speakers);