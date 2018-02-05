import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './UserIcon.less';

class component extends Component {

		render() {
				let { style, className} = this.props
				let {size = 'md', userinfo} = this.props
				let {portrait_url, name=''} = userinfo || {}
				name = name.substr(0, 1)

				if (portrait_url && (portrait_url !== "NULL")) {
						//return <img className={styles.avatar_img} src={portrait_url} alt={name} />
						//return <span className={styles.bit_user_face} style={style}><img className={`avatar-img avatar-img-${size}`} src={portrait_url} alt={name} /></span>
						return <img className={styles.avatar_img} src={portrait_url} onClick={this.props.onClick} alt={name} />
				} else {
						return <span className={styles.bit_user_face} style={style}><div className={styles.bit_user_face}>{name}</div></span>
				}
		}
}

component.PropTypes = {
		userinfo: PropTypes.object.isRequired
}

export default component;
