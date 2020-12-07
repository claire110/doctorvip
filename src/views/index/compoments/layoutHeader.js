import React, { Component, Fragment } from "react";
import{withRouter} from 'react-router-dom';
import axios from "axios";
//baseurl
import { baseUrl } from '../../../service.json'
// antd
import { Row, Col, Button, message} from 'antd';
import { LogoutOutlined} from '@ant-design/icons';
// css
import "./layoutHeader.css";
//logo
import logo from '../../../img/logo.png'

class layoutHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    handleLogout = event => {
            event.preventDefault();
            axios.get(`${baseUrl}/api/api.php?action=admin_logout`,{withCredentials: true})
            .then(res => {
                this.props.history.push("/");
                // console.log(res);
                // console.log(res.data);
                console.log(res.status);
                window.location.reload(false);
            }).catch((error) => {
                console.log(error)

                if (error.response.status === 401) {
                    message.info("You are not login");
                    // Redirect
                    this.props.history.push("/");
                }
                if (error.response.status === 429) {
                    message.info("rate limit exceeded");
                }
            });
    }

    render(){
        return(
            <Fragment >
                <Row>
                    <Col span={4}>
                        <h2>
                            <span id="logo">
                                {/* <img alt="logo" src="../logo.png"/> */}
                                <img alt="logo" src={logo}/>
                            </span>  
                        </h2> 
                    </Col>
                    <Col span={8} offset={12} className="logoutHover">
                        <Button type="text" icon={<LogoutOutlined />} className="logoutButton" onClick={this.handleLogout}>Logout</Button >            
                    </Col>
                </Row>
            </Fragment> 
        )
    }
}

export default withRouter(layoutHeader);