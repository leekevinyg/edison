/* global React, PropTypes */
// eslint-disable-file react/no-unescaped-entities

const OnboardingView = ({ permissionError }) => (permissionError
  ? (
    <div className="permission-error">
      <div className="error-message">
        Please enable your microphone access to use Edison.
        {' '}
        <a href="https://support.google.com/chrome/answer/2693767">Instructions</a>
      </div>
    </div>
  )
  : (
    <div className="welcome">
      <div className="welcome-message">
        Welcome to Edison!
      </div>
      <div className="welcome-message">
        First, enable your microphone access.
      </div>
      <div className="welcome-message">
        Try saying "Hey Edison, Open Youtube"
      </div>
      <div className="welcome-message">
        More commands available in the
        {' '}
        <a
          href="https://github.com/leekevinyg/tulip-web/blob/master/README.md#UserGuide"
        >
          User Guide
        </a>
      </div>
    </div>

  )
);

export default OnboardingView;

OnboardingView.propTypes = {
  permissionError: PropTypes.string,
};

OnboardingView.defaultProps = {
  permissionError: null,
};
