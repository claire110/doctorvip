import React, {Component, Fragment} from 'react';
import axios from "axios";
//baseurl
import { baseUrl } from '../../service.json'
// ANTD
import { Form, Input, Button, DatePicker, message} from 'antd';
import { UserOutlined, HeartOutlined, MailOutlined, PhoneOutlined, ProfileOutlined, StarOutlined, ScheduleOutlined } from '@ant-design/icons';
// VALIDATION
import { validate_name, validate_phone} from "../../utils/validate";
import 'antd/dist/antd.css'
// CSS
import "./index.css";

const { TextArea } = Input;

class AddDoctor extends Component{
    constructor(){
        super();
        this.state = {
            dfirstname: '',
            dlastname: '',
            ddateofbirth: '',
            demail: '',
            dcontactnumber: '',
            dpicurl: '',
            dintro: '',
            dmedicalcenter: '',
            dareaofspec: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange (evt, field) {
        this.setState({ [field]: evt.target.value });
    }

    handleChangeDate(name, date, value){ //date picker 
        let state = this.state;
        state[name] = value;
        this.setState({state});
    }

    handleInputChange(event) { // upload
        this.setState({
            dpicurl: event.target.files[0],
        })
    }
    
    // clear input
    formRef = React.createRef();

    onFinish = event => {
        // event.preventDefault();
        const userObject = new FormData();

        this.setState({
            loading: true
        })

        userObject.append('dfirstname', this.state.dfirstname);
        userObject.append('dlastname', this.state.dlastname);
        userObject.append('ddateofbirth', this.state.ddateofbirth);
        userObject.append('demail', this.state.demail);
        userObject.append('dcontactnumber', this.state.dcontactnumber);
        userObject.append('file', this.state.dpicurl)
        userObject.append('dintro', this.state.dintro);
        userObject.append('dmedicalcenter', this.state.dmedicalcenter);
        userObject.append('dareaofspec', this.state.dareaofspec);
    
        axios.post(`${baseUrl}/api/api.php?action=doctorRegister`,
        userObject, {
            withCredentials:true,
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            this.setState({
                loading: false
            })
            // console.log(res);
            // console.log(res.data);
            console.log(res.status);
            message.info("Added Successfully");
            this.formRef.current.resetFields(); // clear input

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
                message.info("There are something wrong on the process, please try again.");
            }
        });
        //this.setState({ dfirstname: '', dlastname: '', ddateofbirth: '', demail:'', dcontactnumber:'', dpicurl:'', dintro:'',  dmedicalcenter:'',  dareaofspec:''})
        console.log('Success:', event);
    }
        
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render(){
        const {loading}  = this.state;
        return(
            <Fragment>
                <div className="addDoctorForm">
                    <div className="addDoctorContent">
                        <h2 className="addDoctorText">Doctor Registration</h2>
                        <Form //antd
                            ref={this.formRef}   // clear input
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            size="large"
                            encType="multipart/form-data"
                        >
                            <Form.Item
                                name="firstName"
                                rules={[
                                    {required: true, message: 'Please input your first name!' },
                                    {pattern: validate_name, message:"Please input a valid firstname, 2 letters at least ( only letters can be accepted )."}
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First name" 
                                    onChange={(event)=>this.handleChange(event, "dfirstname")}/>
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[
                                    {required: true, message: 'Please input your last name!' },
                                    {pattern: validate_name, message:"Please input a valid lastname, 2 letters at least ( only letters can be accepted )."}
                                ]}
                            >
                                <Input prefix={<HeartOutlined  className="site-form-item-icon" />} placeholder="Last name" 
                                    onChange={(event)=>this.handleChange(event, "dlastname")}/>
                            </Form.Item>

                            <Form.Item name="date-picker" 
                                rules={[{required: true, message: 'Please input the date of birth, format: yyyy-mm-dd.' },]}>
                                <DatePicker style={{width:"100%"}} name="ddateofbirth" placeholder="Date of Birth"  value={this.state.ddateofbirth} onChange={this.handleChangeDate.bind(this, 'ddateofbirth')} />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {required: true, message: 'Please input your E-mail!'},
                                    {type: 'email', message: 'The input is not valid E-mail!'}
                                ]}
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"
                                    onChange={(event)=>this.handleChange(event, "demail")}/>
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                rules={[
                                    {required: true, message: 'Please input the contact number!'},
                                    {pattern: validate_phone, message:"please input a vaild number, at least 8 numbers."}
                                ]}
                            >
                                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Contact Number"
                                    onChange={(event)=>this.handleChange(event, "dcontactnumber")}/>
                            </Form.Item>

                            <Form.Item
                                name="medicalCenter"
                                rules={[{ required: true, message: 'Please input medical center name!' }]}
                            >
                                <Input prefix={<ScheduleOutlined className="site-form-item-icon" />} placeholder="Medical Center" 
                                    onChange={(event)=>this.handleChange(event, "dmedicalcenter")}/>
                            </Form.Item>

                            <Form.Item
                                name="areaOfInterst"
                                rules={[{ required: true, message: 'Please input area of interst!' }]}
                            >
                                <Input prefix={<StarOutlined className="site-form-item-icon" />} placeholder="Area Of Interest" 
                                    onChange={(event)=>this.handleChange(event, "dareaofspec")}/>
                            </Form.Item>

                            <Form.Item
                                name="intro"
                                rules={[{ required: true, message: 'Please input some introduction!' }]}
                            >
                                <TextArea autosize={{minRows: 12}} prefix={<ProfileOutlined className="site-form-item-icon" />} placeholder="Introduction" 
                                    onChange={(event)=>this.handleChange(event, "dintro")}/>
                            </Form.Item>

                            <Form.Item
                                name="pic"
                                rules={[{ required: true, message: 'Please upload a doctor photo!' }]}
                                label="Upload A Photo">
                                <Input className="uploadFile" type="file" id="myFile" name="filename" onChange={this.handleInputChange}/>              
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" loading={loading} htmlType="submit" block>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Fragment>
        ) 
    }
}

export default AddDoctor;