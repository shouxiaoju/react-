const defortcont={
    data:[
    {
        name:"张三",
        age:24,
        address:"北京",
        id:1
    },
    {
        name:"李四",
        age:18,
        address:"上海",
        id:2
    },{
        name:"王五",
        age:20,
        address:"深圳",
        id:3
    }]
}
const CreatReducer=(state=defortcont,action)=>{
    const{type,key,list}=action
    const{data}=state
    switch (type){
        case 'MOVE_UP':
            const move_data=[...data]
            let arr1=null
            arr1=move_data[key]
            move_data[key]=move_data[key-1]
            move_data[key-1]= arr1
        return {
            data:move_data
        };
        case 'MOVE_DOWN':
            const downdata=[...data]
            let arr2=null
            arr2=downdata[key]
            downdata[key]=downdata[key+1]
            downdata[key+1]= arr2
        return {
            data:downdata
        };
        case 'UPDATE_DATA':
            const updata=[...data]
                for(let i=0;i<updata.length;i++){
                    if(updata[i].id==key){
                        updata[i]={
                            id:updata[i].id,
                            name:list.name,
                            age:list.age,
                            address:list.address,
                        }
                    }
                  }
            return {
                data:updata
            };
        case 'DELETE_DATA':
            let delarr=[...data]
            for(let i=0;i<delarr.length;i++){
                if(delarr[i].id==key){
                    delarr.splice(i,1)
                }
            }
        return {
            data:delarr
        };
        case 'ADD':
            let arr=[...data]
            arr.push({
                name:list.name,
                age:list.age,
                address:list.address,
                id:`${arr.length>0?arr[arr.length-1].id*1+1:arr.length+1}`
            })
            return {
                data:arr
            };
        default:
            return state;
    };
}
export {CreatReducer}
