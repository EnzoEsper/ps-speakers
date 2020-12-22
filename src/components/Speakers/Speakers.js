import React, { useEffect, useReducer, useState } from 'react';
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

    try {
      await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledSpeakerRec);
      setSpeakers([...speakers.slice(0, speakerIndex), toggledSpeakerRec, ...speakers.slice(speakerIndex + 1)]);
    } catch (error) {
      setStatus(REQUEST_STATUS.ERROR);
      setError(error);
    }

  }
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'GET_ALL_SUCCESS':
        return {
          ...state,
          status: REQUEST_STATUS.SUCCESS,
          speakers: action.speakers
        };
      case 'UPDATE_STATUS':
        return {
          ...state,
          status: action.status
        };
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  
  const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error"
  };
  
  const [{speakers, status}, dispatch] = useReducer(reducer, {
    status: REQUEST_STATUS.LOADING,
    speakers: []
  });

  // const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState({});

  useEffect(() => {
    
    const fetchData = async() => {
      try {
        const response = await axios.get("http://localhost:4000/speakers");
        dispatch({
          speakers: response.data,
          type: "GET_ALL_SUCCESS"
        });
        // setStatus(REQUEST_STATUS.SUCCESS);
        // dispatch({
        //   status: REQUEST_STATUS.SUCCESS,
        //   type: "UPDATE_STATUS"
        // });
      } catch (error) {
        // setStatus(REQUEST_STATUS.ERROR);
        dispatch({
          status: REQUEST_STATUS.ERROR,
          type: "UPDATE_STATUS"
        });
        setError(error);
      }
    }

    fetchData();
  }, []);

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = status === REQUEST_STATUS.ERROR;

  return (
    <div>
      <SpeakerSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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