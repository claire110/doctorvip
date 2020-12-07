import React from 'react';
import {Switch} from 'react-router-dom';
// component
import Add from '../../views/addDoctor/index'
import Plan from '../../views/apptPlan/index'
import DoctorList from '../../views/doctorList/index'
import availableAppt from '../../views/availableAppt/index'
import ratingList from '../../views/ratingList/index'
// import test from '../../test/axios'
// private component
import PrivateRouter from '../privateRouter/index'
import ApptEdit from '../../views/apptEdit/index';



class ContainerMain extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div>
          <Switch>
            <PrivateRouter component ={DoctorList} exact path="/index" />
            <PrivateRouter component ={Add} exact path="/index/add" />
            <PrivateRouter component ={Plan} exact path="/index/plan" />
            <PrivateRouter component ={ApptEdit} exact path="/index/apptedit" />
            <PrivateRouter component ={availableAppt} exact path="/index/available" />
            <PrivateRouter component ={ratingList} exact path="/index/rating" />
            {/* <PrivateRouter component ={test} exact path="/index/test" /> */}
          </Switch>
      </div>
    )
  }
}

export default ContainerMain;
