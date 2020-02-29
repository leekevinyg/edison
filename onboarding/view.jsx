/* global React, PropTypes */

const OnboardingView = ({ permissionError }) => (permissionError
  ? (
    <div>
      {permissionError}
    </div>
  )
  : <div>Instructions on how to use Tulip Voice</div>
);

export default OnboardingView;

OnboardingView.propTypes = {
  permissionError: PropTypes.string,
};

OnboardingView.defaultProps = {
  permissionError: null,
};
