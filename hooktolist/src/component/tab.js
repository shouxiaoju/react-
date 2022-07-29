import React, { useState } from 'react';
import { Tabs,Space,Button ,Table } from 'antd';
import Lsit from './list';
import Modalt from './modal';
const { TabPane } = Tabs;

function Tab () {
    const [columns,setColumns]=useState([
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
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                  <Button type="primary" onClick={()=>{add("修改",record,"address")}} >修改</Button>
                  <Button type="primary" danger  onClick={()=>deletelist(record.key,"address")}>删除</Button>
              </Space>
            ),
          }])
    const[data,setData]=useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          },
    ]) 
    const [columns_1,setcColumns_1]=useState([
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                  <Button type="primary" onClick={()=>{add("修改",record,"Email")}} >修改{record.key}</Button>
                  <Button type="primary" danger onClick={()=>deletelist(record.key,"Email")}>删除</Button>
              </Space>
            ),
          }
    ])
    const [data_1,setData_1]=useState([
        {
            key: '1',
            name: 'John',
            age: 32,
            email: 'New York No. 1 Lake Park',
          },
          {
            key: '2',
            name: 'Jim',
            age: 42,
            email: 'London No. 1 Lake Park',
          }
    ])
    const [isVisible, setIsvisible] = useState(false);//对话框展示隐藏
    const [deftitle,setdeftitle]=useState("address");//判断是地址项还是Email项
    const [typetext,setTypetext]=useState("提交")//判断是提交还是修改
    const[selfkey,setSelfkey]=useState()//每行id
    const [defcontent,setDefcontent]=useState({
        name: '',
        age: null,
        address: '',
        email: '',
      })//修改时的回显内容
    /* 判断是地址项还是Email项*/
    function onChange(keys){
        setdeftitle((deftitle)=>{
            if (keys==1) {
                return "address"
            }else if(keys==2){
                return "Email"
            }
        })
    }
    /* 点击提交展示对话框 */
    function add(tex,onlykey){
        //console.log("add",tex,onlykey,onlyname);
        if(tex=="提交"){
            setTypetext("提交")
            setDefcontent({
                Name: "",
                Age: null,
                address: "",
                Email: "",
            })
        }else if(tex=="修改"){
            setTypetext("修改")
            setSelfkey(onlykey.key)
            setDefcontent({
                Name: onlykey.name,
                Age: onlykey.age,
                address: onlykey.address,
                Email: onlykey.email,
            })
        }
        setIsvisible(true)
        
    }
    /* 关闭对话框 */
    function handle(){        
        setIsvisible(false)
    }
    /* 新增数据 */
    function addList(listex){
        //console.log("新增",deftitle);
        if(deftitle=="address"){
            setData((data)=>{
                console.log("data",data);
                const data1=[...data]
                data1.push({
                    key:`${data.length>0?data[data.length-1].key*1+1:data.length+1}` ,
                    name: listex.Name,
                    age: listex.Age,
                    address: listex.address,
                })
                return data1
            })
        }else if(deftitle=="Email"){
            setData_1((data)=>{
                const data1=[...data]
                data1.push({
                    key: `${data.length>0?data[data.length-1].key*1+1:data.length+1}`,
                    name: listex.Name,
                    age:listex.Age,
                    email: listex.Email,
                })
                return data1
            })
        }
        setIsvisible(false)
    }
    /* 删除数据 */
   function deletelist(key,def){
       //console.log("删除数据",deftitle)
        if(def=="address"){
            setData((data)=>{
                const data1=[...data]
                for(let i=0;i<data1.length;i++){
                    if(data1[i].key==key){
                        data1.splice(i,1)
                    }
                }
                return data1
            })
        }else if(def=="Email"){
            setData_1((data)=>{
                const data1=[...data]
                for(let i=0;i<data1.length;i++){
                    if(data1[i].key==key){
                        data1.splice(i,1)
                    }
                }
                return data1
            })
        }
   }
   /* 修改 */
    function updatelist(context){
        //console.log("修改1",context,deftitle,selfkey);
        const {Name,Age,address,Email}=context
        if(deftitle=="address"){
            setData((predata)=>{
                const nwedata=[...predata]
                for(let i=0;i<nwedata.length;i++){
                    if(nwedata[i].key==selfkey){
                        nwedata[i]={
                            key:nwedata[i].key,
                            name:Name,
                            age:Age,
                            address:address,
                        }
                    }
                  }
                return nwedata
            })
        }else if(deftitle=="Email"){
            setData_1((dat)=>{
                const data1=[...dat]
            for(let i=0;i<data1.length;i++){
                if(data1[i].key==selfkey){
                    data1[i]={
                        key:data1[i].key,
                        name:Name,
                        age:Age,
                        email:Email,
                    }
                }
              }
            return data1
            }) 
        }
        setIsvisible(false)
    }
    return(
        <div>
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="个人住址信息" key="1">
                    <Button type="primary" onClick={()=>{add("提交")}}>新增</Button>
                    <Lsit columns={columns} data={data} />
                </TabPane>
                <TabPane tab="个人email信息" key="2">
                    <Button type="primary" onClick={()=>{add("提交")}}>新增</Button>
                    <Lsit columns={columns_1} data={data_1}/>
                </TabPane>            
            </Tabs>
            <Modalt 
                isVisible={isVisible} 
                handle={handle} 
                deftitle={deftitle} 
                addList={addList} 
                typetext={typetext}
                updatelist={updatelist}
                defcontent={defcontent}
            />
        </div>
        
    )
};

export default Tab;