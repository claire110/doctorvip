import React, { Component, Fragment} from "react";
import { Link } from "react-router-dom";
// antd
import {Menu} from 'antd';
// icon
import {ClusterOutlined} from '@ant-design/icons';
// router
import Router from '../../router/index';
// css
import "./index.css";


const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props){
    super(props);
    this.state = {};
}

// Menu
renderMenu = ({title,key,icon}) => {
   return(
        <Menu.Item key={key} icon={icon}>
            <Link to={key}><span>{title}</span></Link>
        </Menu.Item>
   ) 
}

// subMenu
renderSubMenu =({title, key, child}) => {
    return <SubMenu key={key} icon={<ClusterOutlined />} title={title}>
        {
            child && child.map(Item =>{
                return Item.child && Item.child.length > 0 ? this.renderSubMenu(Item):this.renderMenu(Item)
            })
        }
    </SubMenu>
}


    render(){
        return(
           <Fragment>
               <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0, backgroundColor:'#00796b', color:"white" }}
                    >
                     {
                         Router && Router.map(firstItem =>{
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem): this.renderMenu(firstItem);
                         })
                     } 
                </Menu>
           </Fragment>
        )
    }
}

export default AsideMenu;