import { Button } from 'antd';
import { useState } from 'react';
import {connect}from"react-redux"
import Modalt from './moda';
import './list.css'
function List(props){
    console.log("props",props);
    const[isVisible,setIsVisible]=useState(false)
    const[type,setType]=useState("新增")
    const[onlyid,setOnlyid]=useState(0)
    const[defdata,setDefdata]=useState()
    const {data,deleteAction,upAction,downAction}=props
    /* 上移动 */
    function Move_up(index){
        upAction(index)
     }
     /* 下移动 */
     function Move_down(index){
        downAction(index)
    }
    /* 更新 */
    function update_data(item){
        console.log("更新",item);
        setType("更新")
        setOnlyid(item.id)
        setDefdata(item)
        setIsVisible(true)
        
    }
    /* 删除 */
    function delete_data(item){
        deleteAction(item.id)
    }
    /* 展示对话框 */
    function add(){
        setType("新增")
        setDefdata("")
        setIsVisible(true)
    }
    /* 关闭对话框 */
    function handle(){        
        setIsVisible(false)
    }
    return(     
        <div>
             <Button type="primary" onClick={()=>{add()}}>新增</Button>
             {
                 data.map((item,index)=>{
                     return(
                        <div className='theme' key={item.id}>
                            <div className='theme_left'>
                                <p>{item.name}</p>
                                <p>{item.age}</p>
                                <p>{item.address}</p>
                            </div>
                            <div className='theme_right'>
                                {
                                    index!=0?<button onClick={()=>{Move_up(index)}}>上移</button>:<button style={{"visibility":"hidden"}}>上移</button>
                                    
                                }
                                {
                                    index!=data.length-1?<button onClick={()=>{Move_down(index)}}>下移</button>:<button style={{"visibility":"hidden"}}>下移</button>
                                }
                                <button onClick={()=>{update_data(item)}}>更新</button>
                                <button onClick={()=>{delete_data(item)}}>删除</button>
                            </div>
                        </div>
                     )
                 })
             }
             <Modalt  
                isVisible={isVisible} 
                handle={handle} 
                type={type}
                onlyid={onlyid}
                defdata={defdata}
             />
        </div>
    )
}
//发送action
const mapDispatch=(dispatch)=>{
    return{
        deleteAction:(key)=>{//删除的action
            dispatch({
                type:"DELETE_DATA",
                key:key
            })
        },
        upAction:(index)=>{//上移的action
            dispatch({
                type:"MOVE_UP",
                key:index
            })
        },
        downAction:(index)=>{//下移的action
            dispatch({
                type:"MOVE_DOWN",
                key:index
            })
        }
        
    }
}
//接收state
const mapnewstart=(state)=>{
    console.log("state",state);
    return state
}
export default connect(mapnewstart,mapDispatch)(List)