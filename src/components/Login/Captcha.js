import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { Form } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;


export default class Captcha extends React.Component {
	constructor(props) {
    super(props);
  }

  handleGetCaptcha = () => {
    this.props.onClick();
  }


  render() {
  	const { image,  onGetCaptcha} = this.props;

    return (
    	<FormItem>
    		<img src={image} onClick={this.handleGetCaptcha} className={styles.captcha}/>
    	</FormItem>);
  }
}
