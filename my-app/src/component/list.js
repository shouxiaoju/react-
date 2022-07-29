
import React, { Component } from 'react';
import { Table, Divider, Tag ,Button } from 'antd';
import ToModal from './modal';


class List  extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[
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
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ],
      visible:false,//控制弹出是否展示
      list:[{//如果点击修改，对话框中展示当前内容,点击提交内容为空
        Name:"",
        age:"",
        address:""
      }],
      subadd:"",//判断是点击的提交或者修改
      only:""//修改数据的唯一标识
    }
  }
  
  /* 点击添加弹出对话框 */
  add=(typ,record)=>{
    if(typ=="Update"){
      const list=[]
      list.push({
        Name:record.name,
        age:record.age,
        address:record.address
      })
      this.setState({
        list,
        subadd:"修改",
        only:record.key
      })
    }else if(typ=="add"){
      const list=[]
      list.push({
        Name:"",
        age:null,
        address:""
      })
      this.setState({
        list,
        subadd:"提交"
      })
    }
    this.setState({//打开对话框
      visible:true
    })
  }
  /* 关闭对话框 */
  showModal = () => {
    this.setState({
      visible: false,
    });
  };
  /* 添加列表数据 */
  tolist=({Name,age,address},subadd)=>{
    if(subadd=="提交"){
      const data=[...this.state.data]
      data.push({
          key:data.length+1,
          name: Name,
          age:Number(age),
          address: address,
      })
      console.log("添加列表",data);
        this.setState({
          data
        })
    }else if(subadd=="修改"){
      const data=[...this.state.data]
     // console.log('修改前',this.state.data);
      for(let i=0;i<data.length;i++){
        if(data[i].key==this.state.only){
          data[i].key=data[i].key;
          data[i].name= Name;
          data[i].age=Number(age);
          data[i].address= address;
        }
      }
      console.log("修改列表",data);
      this.setState({
        data
      })
    }
  }
  /* 删除列表数据 */
  delete=(keys)=>{
    const data=[...this.state.data]
    for(let i=0;i<data.length;i++){
      if(data[i].key==keys){
        data.splice(i,1)
      }
  }
    console.log("删除数据",keys,data);
    this.setState({
      data
    })
  }
  render(){
    const {data,visible,list,subadd}=this.state
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
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
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={()=>{this.add("Update",record)}}>Update</Button>{/* 修改 */}
            <Divider type="vertical" />
            <Button type="danger" onClick={()=>{this.delete(record.key)}} >Delete</Button>{/* 删除 */}
          </span>
        ),
      },
    ];
    return(
      <div >
        <Button  type="primary" onClick={()=>{this.add("add")}}>add a row</Button>{/* 新增 */}
        <Table columns={columns} dataSource={data} />{/* 表格 */}
        {/* 对话框 */}
        <ToModal 
          visible={visible} //展示对话框
          showModal={this.showModal} //关闭对话框
          tolist={this.tolist} //新增数据
          count={list}//默认展示内容
          subadd={subadd}//判断是点击的提交或者修改
        />
      </div>
    )
  }
}
  

export default List;