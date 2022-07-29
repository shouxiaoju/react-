import { Space, Table, Tag ,Pagination} from 'antd';

import { useEffect, useState } from 'react';

  

function List(){
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        }
      ];
    const list=[ {
        key: '1',
        name: 'John',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Joh',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '5',
        name: 'Jim',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '6',
        name: 'JoeBlack',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '7',
        name: 'JohnBrown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '8',
        name: 'JimGreen',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '9',
        name: 'JoeB',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '10',
        name: 'Joown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '11',
        name: 'Jimreen',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '12',
        name: 'Jlack',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '13',
        name: 'Joown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '14',
        name: 'Jieen',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '15',
        name: 'Joeck',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '16',
        name: 'JoBrown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '17',
        name: 'JiGreen',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '18',
        name: 'Jolack',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '19',
        name: 'Joiwn',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '20',
        name: 'Jreen',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '21',
        name: 'Joclack',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '22',
        name: 'Jonron',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '23',
        name: 'Jiren',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
    ]
      const [data ,setDate]=useState(list)
      const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total:100
      });
      const handleTableChange = (newPagination, filters, sorter) => {
        console.log(newPagination,filters, sorter);
        setPagination(()=>{
            const obj={...newPagination}
            return obj
        })
        setDate((predata)=>{
            console.log("predata",newPagination.pageSize);
            let arr=list.slice(0,newPagination.total)
            console.log(arr);
            return arr
        })
      };

      useEffect(()=>{
        let newlist=list.slice(0,10)
        setDate(newlist)
        setPagination({
            current: 1,
            pageSize: 10,
            total:list.length
        })
      },[])
    return(
        
        <div>
           <Table 
                columns={columns} 
                dataSource={data} 
                pagination={pagination}
                onChange={handleTableChange}
           />;
        </div>
    )
}
export default List