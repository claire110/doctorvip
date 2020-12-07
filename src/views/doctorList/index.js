import React, { Component, Fragment} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//baseurl
import { baseUrl } from '../../service.json'
// antd
import { Image , Popover, Button, Table, message } from 'antd';
import { UsergroupAddOutlined, DeleteOutlined, SnippetsOutlined } from '@ant-design/icons';
// css
import "./index.css";

const content = (
    <div>
      <p>Are you sure you want to delete this item?</p>
    </div>
);

class DoctorList extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            keyWork:"",

            // modal: cancel notification 
            visible:false,
            doctorID:"",
            
            // table header
            columns:[
                
                {title:"Doctor Photo", dataIndex:"picUrl", key:"picUrlMenu", width:70, fixed: 'left',     
               
                render: picUrl => <Image className="doctorPhoto" style={{ height: 50, width:50 }} alt={picUrl} src= {`${baseUrl}/${picUrl}`}/> 
                },
                {title:"DoctorID", dataIndex:"doctorID", key:"doctorIdMenu", width:70, fixed: 'left',responsive: ['md'],
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.doctorID - b.doctorID,         
                },
                {title:"First Name", dataIndex:"firstName", key:"firstName",  width: 80, fixed: 'left',
                    sorter: (a, b) => a.firstName.localeCompare(b.firstName),
                },
                {title:"Last Name", dataIndex:"lastName", key:"lastName", width: 80,
                    sorter: (a, b) => a.lastName.localeCompare(b.lastName),
                },
                {title:"Medical Center", dataIndex:"medicalCenter", key:"medicalCenter", width: 100,
                    sorter: (a, b) => a.medicalCenter.localeCompare(b.medicalCenter),
                },
                {title:"Date Of Birth", dataIndex:"dateOfBirth", key:"dateOfBirth", width: 100,
                    sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
                },
                {title:"Email", dataIndex:"email", key:"email", width: 100,
                    sorter: (a, b) => a.email.localeCompare(b.email),
                },
                {title:"Contact Number", dataIndex:"contactNumber", key:"contactNumber", width: 100},
                {title:"area Of Spec", dataIndex:"areaOfSpec", key:"areaOfSpec", width: 100},
                {title:"Introduction", dataIndex:"Intro", key:"Intro", width: 200},
                {title:"Management", dataIndex:"management", key:"management", width:200, fixed: 'right',
                    render:(text, rowData) =>{
                        return(
                            <div>
                                <Link 
                                    to={{
                                        pathname: "/index/plan", 
                                        state:{doctorid: rowData.doctorID}
                                        }}>
                                    <Button className="planButton" type="primary" icon={<SnippetsOutlined />}>
                                        <span className="plan">Plan</span>
                                    </Button>
                                </Link>
                            
                                <Popover content={content} >
                                    <Button className="delDoctorButton" icon={<DeleteOutlined />} onClick={()=>this.delDoctor(rowData.doctorID)} >Delete</Button>
                                </Popover>
                            </div>
                        )
                    } 
                }   
            ],

            // tabel data
            data:[],   
        };
    }

    // load data 
    componentDidMount() {
        this.loadData();
    }

    // get doctor list
    loadData = () => {
        axios.get(`${baseUrl}/api/api.php?action=readDoctorName`,{withCredentials:true})
        .then(res => {
            //console.log(res.data);
            const doctors = res.data;

            if(doctors){
                this.setState({ 
                    data:doctors 
                });
            }   
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

    // delete doctor
    delDoctor(doctorID){
        if (window.confirm('Do you want to delete this doctor?')){
            //console.log(doctorID)
            if(!doctorID){
                message.info("The doctor's information does not exist");
                return false;
            }
    
            // deleteDoctor()
            axios.delete(`${baseUrl}/api/api.php?action=delDoctor&doctorid=${doctorID}`,{withCredentials:true})
            .then(res => {
                // console.log(res);
                //console.log(res.data);
                message.info("Successfully Deleted");
    
                //refresh page, load data again
                this.loadData();  
            })
            .catch((error) => {
                console.log(error)
    
                if (error.response.status === 401) {
                    message.info("Please login firstly.");
                }
    
                if (error.response.status === 403) {
                    message.info("Forbidden! Sorry, we can not delete the doctor, because some appointments have not completed.");
                }
    
                if (error.response.status === 501) {
                    message.info("The doctor's information does not exist.");
                }
    
                if (error.response.status === 400) {
                    message.info("Invalid, Please select the doctor you want to delete.");
                }
            });
        }  
    }

    render(){
        const { columns, data } = this.state;
        return(
            <Fragment>  
                <h2>Doctor List</h2>      
                
                <Link
                    to='/index/add'
                    className="addDoctor" style={{display: "table-cell"}} 
                >
                    <Button className="addDoctorButton" type="primary" danger icon={<UsergroupAddOutlined />} htmlType="submit">
                        Add New Doctor
                    </Button>
                </Link>
            
                <Table rowKey="doctorID" columns={columns} dataSource={data} scroll={{ x: 1500, y: 600 }}/>
            </Fragment>
        )
    }
}

export default DoctorList;