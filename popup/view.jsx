/* global React, PropTypes */

import { STATES } from './constants';

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
  currentState: STATES.WAITING,
  transcription: 'No Available Transcription',
};
