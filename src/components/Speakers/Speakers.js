import React, { useContext } from 'react';
import SpeakerContext from './SpeakerContext';

const Speakers = () => {
  const speakers = useContext(SpeakerContext);
  return (
    <div>
      {speakers.map((speaker) => {
        return <img src={`/images/${speaker.imageSrc}.png`} alt={speaker.name} key={speaker.imageSrc}/>
      })}
    </div>
  );
};

export default Speakers;


// *****************
// EXAMPLE WITH RENDER PROPS
// *****************
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