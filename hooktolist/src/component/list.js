import { Space, Table, Tag } from 'antd';
import React from 'react';

function Lsit  (props) {
   
    const {columns,data}=props
    return(
        <Table columns={columns} dataSource={data} />
    )
} 

export default Lsit;