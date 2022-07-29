import {  Modal,Button, Form, Input, InputNumber } from 'antd';
import React, { useState } from 'react';
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
    const{isVisible,handle,deftitle,addList,typetext,updatelist,defcontent}=props
    const onFinish = (values) => {
        if(typetext=="提交"){
            addList(values)
        }else if(typetext=="修改"){
            updatelist(values)
        }
        //console.log("modal",values,typetext);
      };
    const handleCancel = () => {
        handle()
    };
  return (
    <>
      <Modal 
      title="Basic Modal" 
      visible={isVisible} 
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}
      >
        <Form 
          {...layout} 
          name="nest-messages" 
          onFinish={onFinish} 
          validateMessages={validateMessages}
          initialValues={defcontent}
        >
          <Form.Item
              name="Name"
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
              name={deftitle}
              label={deftitle}
          >
            <Input />
          </Form.Item>
          <Form.Item
              name="Age"
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
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit">提交</Button>           
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Modalt;