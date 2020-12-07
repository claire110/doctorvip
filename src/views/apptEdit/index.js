import React, {Component} from 'react';
import axios from "axios";
//baseurl
import { baseUrl } from '../../service.json'
// ANTD
import { Form, Input, Button, message} from 'antd';
import { FieldTimeOutlined, ScheduleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
//VALIDATION
import { validate_date, validate_time } from "../../utils/validate";
// CSS
import "./index.css";

class apptPlan extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            planid: '',
            doctorid: '',
            firstname: '',
            lastname: '',
            plandate: '',
            starttime: '',
            endtime: '',
        };
    }

    UNSAFE_componentWillMount (){ //before render
        //console.log(this.props.location.state)
        if(this.props.location.state) {
            this.setState({
                planid: this.props.location.state.planid,
                doctorid: this.props.location.state.doctorid,
                firstname: this.props.location.state.firstname,
                lastname: this.props.location.state.lastname,

                plandate: this.props.location.state.plandate,
                starttime: this.props.location.state.starttime,
                endtime: this.props.location.state.endtime
            })
        } 
    }

    componentDidMount(){ //after render
        //console.log(this.state)
        this.getDetailed();
    }
    
    getDetailed = () =>{
        axios.get(`${baseUrl}/api/api.php?action=apptDetail&planid=${this.props.location.state.planid}`,{withCredentials:true})
        .then(res => {
            // console.log(res);
            // console.log(res.data);
            // console.log(res.data[0].planDate);

            this.refs.form.setFieldsValue({
                planID: res.data[0].planID,
                doctorID: res.data[0].doctorID,
                firstName: res.data[0].firstName,
                lastName: res.data[0].lastName,
                planDate:res.data[0].planDate,
                planTimeEnd: res.data[0].planTimeEnd,
                planTimeStart: res.data[0].planTimeStart
            }) 
        })
        .catch((error) => {
            console.log(error)

            if (error.response.status === 204) {
                message.info("Sorry, there are not any doctors' information.");
            }

            if (error.response.status === 401) {
                message.info("Please login firstly.");
            }
        });
    }
    
    handleChange (evt, field) {
        this.setState({ [field]: evt.target.value });
    }

    onFinish = (event) =>{
        //  alert(111)  
        const userObject = new FormData();
        this.setState({
            loading: true
        })

        // userObject.append('firstname', this.state.firstname);
        // userObject.append('lastname', this.state.lastname);
        userObject.append('planid', this.state.planid);
        userObject.append('doctorid', this.state.doctorid);
        userObject.append('plandate', this.state.plandate);
        userObject.append('starttime', this.state.starttime);
        userObject.append('endtime', this.state.endtime);
      
        axios.post(`${baseUrl}/api/api.php?action=apptEdit&planid=${this.state.planid}`,userObject, {
            withCredentials:true,
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                this.setState({
                    loading: false
                })  
                // fill form
                // this.refs.form.resetFields();

                message.info("Edited Successfully");
                console.log(res.status);
                // console.log(res);
                // console.log(res.data);
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })  
                console.log(error)

                if (error.response.status === 401) {
                    message.info("Please login firstly.");
                }

                if (error.response.status === 501) {
                    message.info("There are something wrong on the process, please try again..");
                }
    
                if (error.response.status === 400) {
                    message.info("Invalid, Please make sure the input is valid.");
                }

            });
            // console.log('Success:', event);
    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    normFile = e => {
    //console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.filelist;
    };
        
    render(){
        const {loading}  = this.state;
        return(
            <div className="editPlanForm">
                <div className="apptPlanContent">
                <h2 className="apptPlanText">Edit Plan</h2>
                    <Form ref="form" //antd
                        initialValues={{doctorID:0, planID:0, planDate: 0, planTimeStart:0, planTimeEnd:0}}
                        layout="vertical"
                        name="basic"
                        // initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size="large"
                        >

                        <Form.Item name="planID"  label="plan ID" hidden>
                            <Input/>
                        </Form.Item>

                        <Form.Item name="doctorID"  label="Doctor ID" hidden>
                            <Input/>
                        </Form.Item>

                        <Form.Item name="firstName"  label="Doctor First Name">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="lastName"  label="Doctor Last Name">
                            <Input disabled/>
                        </Form.Item>

                        <Form.Item name="planDate" label="Appointment date"   
                            rules={[
                                {required: true, message: 'Please input the appointment date!' },
                                {pattern: validate_date, message:"Please enter a valid date. format: yyyy-mm-dd.."}
                                ]}>
                            <Input placeholder="Appointment date" prefix={<ScheduleOutlined className="site-form-item-icon" />}
                                onChange={(event)=>this.handleChange(event, "plandate")} />
                        </Form.Item>

                        <Form.Item name="planTimeStart" label="Start time"
                            rules={[
                                {required: true, message: 'Please input start time!' },
                                {pattern: validate_time, message:"Please enter a valid time. format: HH:mm"}
                                ]}>
                            <Input placeholder="Start Time"  prefix={<FieldTimeOutlined className="site-form-item-icon" />}
                                onChange={(event)=>this.handleChange(event, "starttime")} />
                        </Form.Item>

                        <Form.Item  name="planTimeEnd" label="End time"
                            rules={[
                                {required: true, message: 'Please input end time!' },
                                {pattern: validate_time, message:"Please enter a valid time. format: HH:mm"}
                            ]}>
                            <Input  placeholder="End Time" prefix={<FieldTimeOutlined  className="site-form-item-icon" />}
                                onChange={(event)=>this.handleChange(event, "endtime")} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )  
    }
}

export default apptPlan;