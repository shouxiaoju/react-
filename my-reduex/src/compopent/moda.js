import {  Modal,Button, Form, Input, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState,useEffect } from 'react';
import {connect}from"react-redux"
const layout = {
    labelCol: {
      span: 4,
    },
  };
const validateMessages = {
    required: '${label} is required!',
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

function Modalt  (props) {
    const [form] = useForm();
    const{isVisible,handle,type,onlyid,defdata,updateAction,sendAction}=props
    console.log("defdata",defdata);
    useEffect(()=>{
        form.setFieldsValue(defdata)
    },[defdata])
   
    const onFinish = (values) => {
        if(type=="新增"){
            console.log("新增",values);
            sendAction(values)
        }else if(type=="更新"){
            console.log("更新",values);
            updateAction(values,onlyid)
        }
        handle()
      };
    const handleCancel = () => {
        handle()
    };
    const handleOk = () => {
        console.log("form",form);
        form.submit()
      };
    return (
    <>
      <Modal 
      title="Basic Modal" 
      visible={isVisible} 
      onCancel={handleCancel}
      onOk={handleOk}
      destroyOnClose={true}
      forceRender={true}
      >
        <Form 
        form={form}
          {...layout} 
          name="nest-messages" 
          onFinish={onFinish} 
          validateMessages={validateMessages}
          initialValues={defdata}
        >
          <Form.Item
              name="name"
              label="name"
              rules={[
              {
                  required: true,
              },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              name="address"
              label="address"
          >
            <Input />
          </Form.Item>
          <Form.Item
              name="age"
              label="age"
              rules={[
              {
                  type: 'number',
                  min: 0,
                  max: 99,
              },
              ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>     
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
//发送action
const modelDispatch=(dispatch)=>{
    return{
        sendAction:(data)=>{//新增
            dispatch({
                type:"ADD",
                list:data
            })
        },
        updateAction:(item,key)=>{//更新
            dispatch({
                type:"UPDATE_DATA",
                key:key,
                list:item
            })
        }
    }
}
export default connect(null,modelDispatch)(Modalt);