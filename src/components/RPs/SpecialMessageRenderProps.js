function SpecialMessageRenderProps({ children }) {
  return children({
    // could get this from something like a push notification
    specialMessage: 'Angular class at 2:45PM cancellled',
  });
}

export default SpecialMessageRenderProps;
