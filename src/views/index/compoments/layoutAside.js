import React, { Component} from "react";
// asideMenu
import AsideMenu from "../../../components/asideMenu/index"

class layoutAside extends Component {
    constructor(props){
    super(props);
    this.state = {};
}

    render(){
        return(
            <AsideMenu />
        )
    }
}

export default layoutAside;