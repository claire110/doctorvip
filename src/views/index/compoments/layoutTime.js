import React, { Component, Fragment } from "react";
import {formatTime} from "../../../components/formatTime"

class layoutTime extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTime:formatTime(Date.now())
        };
    }
    
    componentDidMount() {
        this.getTime()
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
          const currentTime = formatTime(Date.now())
          this.setState({
            currentTime
          })
        },1000)
    }

    render(){
        const {currentTime} = this.state
        return(
            <Fragment >
                <span>{currentTime}</span>
            </Fragment> 
        )
    }
}

export default layoutTime;