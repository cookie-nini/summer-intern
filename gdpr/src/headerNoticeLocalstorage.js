import React, { Component } from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

class HeaderNoticeLocalstorage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : this.props.visible
        }
    }

    handleClose = () => {
        localStorage.setItem('agreeGDPR', true);
        this.props.showNoticeAlert(false);
    }

    render() {
        return (
            <div>
                {
                    this.state.visible ? (
                        <Alert message="LocalStorage"
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

export default HeaderNoticeLocalstorage;