/* global React, PropTypes */

const Popup = ({ currentState, transcription }) => (
  <div className="popup-wrapper">
    <div className="popup-state">
      {currentState}
    </div>
    <div className="popup-transcription">
      {transcription}
    </div>
  </div>
);

export default Popup;

Popup.propTypes = {
  currentState: PropTypes.string,
  transcription: PropTypes.string,
};

Popup.defaultProps = {
  currentState: "Waiting...",
  transcription: 'No Available Transcription',
};
