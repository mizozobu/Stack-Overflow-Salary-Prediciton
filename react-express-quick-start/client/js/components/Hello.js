import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

class Hello extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x * 10,
      y: this.props.y * 10,
      z: this.props.z * 10,
    };
  }

  render() {
    const { t, tReady } = this.props;
    const lang = 'ja';

    return (
      <div className='animated infinite flash'>
        { t('test') } <a href={`/_api/config/language/${lang}?redirect=${window.location.pathname}`}>Click to switch lang</a> {this.state.x} {this.state.y} {this.state.z}
      </div>
    );
  }
}

Hello.propTypes = {
  t: PropTypes.func.isRequired,
  tReady: PropTypes.bool.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
};

export default translate('translation')(Hello);
