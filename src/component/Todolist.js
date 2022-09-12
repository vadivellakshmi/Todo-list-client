import React,{useState, useEffect} from "react";
import axios from "axios"

const Todolist = () =>{

    const [list, setList] = useState([])
    const [addlist, setAddlist] = useState(
        {listitem:""}
    )

    

    const getList = () =>{
        axios.get(" https://todolistmernapp.herokuapp.com/todo/getlist")
        .then((res) => setList(res.data))
        .catch(err => console.log(err))

    }
    const addListItem = (e) =>{

        e.preventDefault()
          axios.post(' https://todolistmernapp.herokuapp.com/todo/insertlist',addlist)
          .then((res) => console.log(res.data)
           )
           getList()
        
        }

 


    const deleteList = (id) =>{

        axios.delete(" https://todolistmernapp.herokuapp.com/todo/"+id)
        .then((res) =>{
            console.log(res)
            getList()
        }) 

        .catch(err => console.log(err))
    }

    


    

    useEffect(()=>{

        getList()

    },[])

    return(
<>
<div className="container mt-5">
    <div className="row">
        <div className="col">

            <h1 className="display-3 ">Welcome To ToDo List</h1>
            </div>
    </div>

    <form  className="m-auto mt-5 " onSubmit={addListItem}>
        <div className="mb-3 row align-item-center justify-content-center">
            <div className="col-md-6 d-flex ">
            <input type="text" className="form-control col" placeholder="List The Activity To Do" name="listitem"  value={addlist.listitem}  onChange={(e)=> setAddlist({...addlist, listitem:e.target.value  })}required/>
            <button className="btn btn-primary ms-3" type="submit">ADD</button></div>
           
       

            
       
       </div>
    </form>

    <div className="row align-item-center justify-content-center mt-5">
        <div className="col-md-6">
            
        <ol className="list-group list-group-numbered">
            {list.length>0 ? list.map((item) =>{ return(

<div className="d-flex align-item-center mb-3 " key={item._id}>
<li className="list-group-item w-100 text-info bg-dark fst-italic text-capitalize">  {item.listitem} </li>

<button className="btn btn-danger ms-3" type="submit" onClick={()=>deleteList(item._id)}><i class="fa-solid fa-trash"></i></button>

</div>



            )
            }): (<h2>no-data</h2>)}
            
        
        
       
            </ol>
             </div>


    </div>

</div>
</>
    )
}

export default Todolist