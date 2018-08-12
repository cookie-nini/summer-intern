import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HeaderNoticeLocalstorage from './headerNoticeLocalstorage.js';
import HeaderNoticeCookie from './headerNoticeCookie.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            showNotice: false,
            showNoticeCookie: false,
        };


        //  获取localstorage内数据
        let flag = localStorage.getItem("agreeGDPR");
        if (flag === "true") {
            this.state = {
                showNotice: false
            }
        } else {
            this.state = {
                showNotice: true
            }
        }

        //  获取cookie的数据
        let cookieAgreeGDPR = this.getCookie("agreeGDPR");
        if(cookieAgreeGDPR) {
            var flagCookie = cookieAgreeGDPR.split("=")[1];
        }
        if (flagCookie === "true") {
            this.state = {
                showNotice: this.state.showNotice,
                showNoticeCookie: false,
            }
        } else {
            this.state = {
                showNotice: this.state.showNotice,
                showNoticeCookie: true
            }
        }
        console.log(this.state);
    }

    showNoticeAlert(show) {
        this.setState({
            showNotice : show,
        })
    }

    getCookie(cookieName) {
        let name = cookieName + "=";
        let cookieArray   = document.cookie.split(";");
        let cookieValue = cookieArray.filter(value => {
            let eachCookie = value.trim();
            if (eachCookie.indexOf(name) === 0) {
                return eachCookie.substring(name.length, eachCookie.length);
            }
        })[0];
        return cookieValue;
    }

    showNoticeAlertCookie(show) {
        this.setState({
            showNoticeCookie: show
        })
    }

    render() {
        return (
            <div>
                <HeaderNoticeLocalstorage
                    showNoticeAlert={show => this.showNoticeAlert(show)}
                    visible={this.state.showNotice}>
                </HeaderNoticeLocalstorage>
                <HeaderNoticeCookie
                    showNoticeAlertCookie={show => this.showNoticeAlertCookie(show)}
                    visible={this.state.showNoticeCookie}>
                </HeaderNoticeCookie>
                <div className="App">
                    <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </div>
            </div>
        );
      }
}


export default App;
