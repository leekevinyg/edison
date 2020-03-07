/* global React, PropTypes */
const Popup = ({ currentState, transcription }) => {
  let logoClassName = 'logo-waiting';
  switch (currentState) {
    case 'Listening...':
      logoClassName = 'logo-listening';
      break;
    case 'Sorry, something went wrong. Please try again.':
      logoClassName = 'logo-error';
      break;
    default:
      break;
  }
  return (
    <div className="popup-wrapper">
      <div className="microphone">
        <img className={logoClassName} src="../assets/microphone-logo.svg"/>
      </div>
      <div className="status-text">
        {transcription ? transcription : currentState}
      </div>
    </div>
  );
}

export default Popup;

Popup.propTypes = {
  currentState: PropTypes.string,
  transcription: PropTypes.string,
};

Popup.defaultProps = {
  currentState: 'Waiting...',
  transcription: 'No Available Transcription',
};
