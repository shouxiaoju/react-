import { Table ,Form, Input,Button} from 'antd';
import qs from 'qs';
import { useEffect, useState} from 'react';
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  let params=""
  function Page(){
    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
    });
    const[gender,setGender]=useState("")
    const fetchData = (params) => {
      setLoading(true);
      fetch(`https://randomuser.me/api?${params}`)
        .then((res) => res.json())
        .then(({ results }) => {
          setData(results);
          setLoading(false);
          setPagination({
            ...params.pagination,
            total: results.length>=10?200:results.length,
          });
        });
    };
  
    useEffect(() => {
        params=`results=${pagination.pageSize}&page=${pagination.current}&pagination[current]=${pagination.current}&pagination[pageSize]=${pagination.pageSize}&pagination[total]=200&gender=`
      fetchData(params,);
    }, []);
  
    const handleTableChange = (newPagination, filters, sorter) => {
        console.log(newPagination, filters, sorter);
        if(gender){
            params=`results=${newPagination.pageSize}&page=${newPagination.current}&pagination[current]=${newPagination.current}&pagination[pageSize]=${newPagination.pageSize}&pagination[total]=200&gender=`  
        }else{
            params=`results=${newPagination.pageSize}&page=${newPagination.current}&pagination[current]=${newPagination.current}&pagination[pageSize]=${newPagination.pageSize}&pagination[total]=200`  
        }
        fetchData(params);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        params=`results=${pagination.pageSize}&page=${pagination.current}&pagination[current]=${pagination.current}&pagination[pageSize]=${pagination.pageSize}&pagination[total]=200&gender=${values.name}`  
        fetchData(params);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const react=()=>{
        form.resetFields();
        params=`results=10&page=1&pagination[current]=1&pagination[pageSize]=10&pagination[total]=200`  
        fetchData(params);
    }
      return(
          <div>
              <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="inline"
                    form={form}
                >
                <Form.Item
                    label="Username"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight:"10px"}}>
                       查询
                    </Button>
                    <Button type="primary" onClick={react}>
                      重置
                    </Button>
                </Form.Item>
            </Form>
            <Table
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            />
          </div>
    
      )
  }
  export default Page