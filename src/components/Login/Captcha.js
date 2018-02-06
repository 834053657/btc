import React from 'react';
import { Form } from 'antd';
// import { connect } from 'dva';
// import classNames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item;

export default class Captcha extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleGetCaptcha = () => {
    this.props.onClick();
  }

  render() {
    // const { image, onGetCaptcha } = this.props;
    const { image } = this.props;

    return (
      <FormItem>
        <img alt="captcha" src={image} onClick={this.handleGetCaptcha} className={styles.captcha} />
      </FormItem>);
  }
}
