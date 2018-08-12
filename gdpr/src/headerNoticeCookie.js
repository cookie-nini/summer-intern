import React, { Component } from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

class HeaderNoticeCookie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : this.props.visible
        }
    }

    handleClose = () => {
        document.cookie = "agreeGDPR=" + true;
        this.props.showNoticeAlertCookie(false);
    }

    render() {
        return (
            <div>
                {
                    this.state.visible ? (
                        <Alert message='Cookie Continue'
                               description='Test Test TestTestTest TestTestTest TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest'
                               type="warning"
                               showIcon="true"
                               closeText="Continue"
                               afterClose={this.handleClose}
                        />
                    ) : null
                }
            </div>
        );
    }
}

export default HeaderNoticeCookie;