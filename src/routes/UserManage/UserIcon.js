import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './UserIcon.less';

export default class UserIcon extends Component {
  static propTypes = {
    userinfo: PropTypes.object.isRequired
  };

  render() {
    // const { style, className } = this.props;
    // const { size = 'md', userinfo } = this.props;
    const { style, userinfo } = this.props;
    let { portraitUrl, name = '' } = userinfo || {};
    name = name.substr(0, 1);

    if (portraitUrl && (portraitUrl !== 'NULL')) {
      // return <img className={styles.avatar_img} src={portraitUrl} alt={name} />
      // return <span className={styles.bit_user_face} style={style}><img className={`avatar-img avatar-img-${size}`} src={portraitUrl} alt={name} /></span>
      return <img className={styles.avatar_img} src={portraitUrl} onClick={this.props.onClick} alt={name} />;
    } else {
      return <span className={styles.bit_user_face} style={style}><div className={styles.bit_user_face}>{name}</div></span>;
    }
  }
}
