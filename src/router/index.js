import React from 'react';
// icon
import {FundProjectionScreenOutlined, UsergroupAddOutlined, ScheduleOutlined, AppstoreAddOutlined } from '@ant-design/icons';

const router = [
    {
        title: "Doctor Management",
        icon:"index",
        key: "/index",
        child:[
            {key:"/index", title:"Dcotor list", icon: <UsergroupAddOutlined />,},
            {
                key: "/index/add",
                title: "Add Doctor",
                icon: <AppstoreAddOutlined  />
            },
        ]
    },
    {
        title: "Available Times",
        icon: <ScheduleOutlined />,
        key: "/index/available"  
    },
    {
        title: "Rating Management",
        icon: <FundProjectionScreenOutlined />,
        key: "/index/rating"  
    }
]

export default router;