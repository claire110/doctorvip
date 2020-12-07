import React, { Component } from "react";
//layout component
import LayoutAside from "./compoments/layoutAside";
import LayoutHeader from "./compoments/layoutHeader";
import ContainerMain from "../../components/containerMain/index";
import LayoutTime from "./compoments/layoutTime";
// css
import "./layout.css";
// antd
import { Layout } from 'antd';
import { Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class Index extends Component {
    constructor(props){
    super(props);
    this.state = {};
}

    render(){
        return(
            <Layout className="layout">
                
                <Header className="header" style={{ backgroundColor:'#00796b'}}>
                    <LayoutHeader/>
                </Header>
                <Layout>
                    <Sider width="250px" breakpoint="lg" collapsedWidth="0">
                        <LayoutAside/>
                    </Sider>
                    <Content className = "content">
                        <div className ="container">
                            <ContainerMain />
                        </div>
                    </Content>
                </Layout>
                <Footer >
                    <Row style={{ padding: 0 }}>
                        <Col sm={24} className="footerText" style={{ textAlign: 'center' }}>
                            <p>Doctor Booking ©2020 Created by Claire </p>
                        </Col>
                        <Col className="footerTime" sm={24} style={{ textAlign: 'center'}}>
                            <LayoutTime />
                        </Col>
                    </Row>
                </Footer> 
            </Layout>
        )
    }
}

export default Index;