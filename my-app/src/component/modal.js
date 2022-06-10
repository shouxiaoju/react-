import React, { Component } from 'react';
import { Modal, Form,Input,Button  } from 'antd';
import "./modal"
class ToModal extends Component{
    constructor(props){
        super(props)
    }
      handleCancel = e => {
        this.props.showModal()
        
      };
      handleSubmit = (values) => {
          this.props.tolist(values,this.props.subadd)
          this.props.showModal()
      };
    render(){
        const{visible,count,subadd}=this.props
        return(
            <Modal
                title={subadd}
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
                destroyOnClose={true}
            >
           <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} 
                onFinish={this.handleSubmit}
                initialValues={count[0]}
           >
                <Form.Item 
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: 'Please input your note!' }]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item 
                    label="address"
                    name="address"
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="age"
                    name="age"
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button onClick={this.handleCancel}>取消</Button>
                    <Button type="primary" htmlType="submit" className='queren'>
                        {subadd=="修改"?`确认${subadd}`:"确认"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        )
    }
}

export default ToModal
