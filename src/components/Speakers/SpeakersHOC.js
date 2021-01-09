import React, { useState } from 'react';
import Speaker from '../Speaker/Speaker';
import SpeakerSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';

import { REQUEST_STATUS } from '../../reducers/request';

import withRequest from '../HOCs/withRequest';
import withSpecialMessage from '../HOCs/withSpecialMessage';
import { compose } from 'recompose';

const Speakers = ({ records: speakers, status, error, put, bgColor, specialMessage }) => {
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
  const onFavoriteToggleHandler = async (speakerRec) => {
    put({
      ...speakerRec,
      isFavourite: !speakerRec.isFavorite
    });
  };
  
  const [searchQuery, setSearchQuery] = useState("");  

  // const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
  // const [error, setError] = useState({});

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = status === REQUEST_STATUS.ERROR;

  return (
    <div className={bgColor}>
      <SpeakerSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {specialMessage && specialMessage.length > 0 && (
        <div className='bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-4' role='alert'>
          <p className='font-bold'>Special Message</p>
          <p>{specialMessage}</p>
        </div>
      )}

      {isLoading && <div>Loading...</div>}

      {hasErrored && (
        <div> 
          Loading error... Is the json-server running? (try "npm run json-server" at terminal prompt)
          <br/>
          <b>ERROR: {error.message}</b>
        </div>
      )}

      {success && <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        {speakers
        .filter((rec) => {
          const targetString = `${rec.firstName} ${rec.lastName}`.toLowerCase();
          return searchQuery.length === 0 ? true : targetString.includes(searchQuery.toLowerCase());
        })
        .map((speaker) => (
          <Speaker key={speaker.id} {...speaker} onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}/>
        ))}
      </div>}
    </div>
  );
};

export default compose(
  withRequest('http://localhost:4000', 'speakers'),
  withSpecialMessage()
)(Speakers);


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