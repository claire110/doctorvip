import React, {Component} from 'react';
import axios from "axios";
//baseurl
import { baseUrl } from '../../service.json'
// ANTD
import { Form, Button, message, DatePicker, TimePicker} from 'antd';
import 'antd/dist/antd.css'
// CSS
import "./index.css";

const format = 'HH:mm';

class apptPlan extends Component{
    constructor(props){
        super(props);
        this.state = {
            plandate: '',
            starttime: '',
            endtime: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name, date,value){
        let state = this.state;
        state[name] = value;
        this.setState({state});
    }

    onFinish = event => {
        const userObject = new FormData();
        this.setState({
            loading: true
        })
        userObject.append('doctorid', this.props.location.state.doctorid);
        userObject.append('plandate', this.state.plandate);
        userObject.append('starttime', this.state.starttime);
        userObject.append('endtime', this.state.endtime);
      
        axios.post(`${baseUrl}/api/api.php?action=apptPlan`,userObject, {
            withCredentials:true,
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            this.setState({
                loading: false
            })  
            message.info("Added Successfully");
            console.log(res.status);

            this.formRef.current.resetFields();   // clear input
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

            if (error.response.status === 400) {
                message.info("Please make sure the input is valid.");
            }

            if (error.response.status === 501) {
                message.info("There are something wrong on the process, please try again..");
            }
        });
        this.setState({ plandate: '', starttime: '', endtime:''})

        console.log('Success:', event);
    };
    
    // clear input
    formRef = React.createRef();

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render(){
        const {loading}  = this.state;
        return(
            <div className="apptPlanForm">
                <div className="apptPlanContent">
                <h2 className="apptPlanText">Appointment Plan</h2>
                    <Form
                        ref={this.formRef}   // clear input
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size="large"
                        className= "apptPlan"
                        >
                        <Form.Item name="date-picker" 
                            rules={[
                                {required: true, message: 'Please input the appointment date!' },
                            ]}
                            label="Appointment date" {...this.config}>
                            <DatePicker placeholder="Appointment date" style={{width:"100%"}}
                                value={this.state.plandate} onChange={this.handleChange.bind(this, 'plandate')} 
                            />
                        </Form.Item> 

                        <Form.Item 
                            name="startTime" 
                            rules={[
                                {required: true, message: 'Please input start time!' },
                            ]}
                            label="Start time" {...this.config}>
                            <TimePicker  style={{width:"100%"}} placeholder="Start Time"
                                value={this.state.starttime} onChange={this.handleChange.bind(this, 'starttime')} format={format} 
                            />
                        </Form.Item>

                        <Form.Item 
                            name="endTime" 
                            rules={[
                                {required: true, message: 'Please input end time!' },
                            ]}
                            label="End time" {...this.config}>
                            <TimePicker  placeholder="End Time" style={{width:"100%"}}
                                value={this.state.endtime} onChange={this.handleChange.bind(this, 'endtime')} format={format} />
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