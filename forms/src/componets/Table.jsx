import React ,{useEffect, useState} from 'react'
import axios from "axios";
import styles from "./style.module.css"

const Table = ({form}) => {
    const [page, setPage] = useState(1);
    const [limit ,setLimit] = useState(5) 
    const [totoalCount, setTotalCount] = useState(0);
    const [deleteId,setDeleteId] = useState()
    const [table,setTable] = useState([{}])
   
     useEffect(() => {
        
        const getTodo = async () => {
          let res = await axios.get(
            `http://localhost:3004/forms?_page=${page}&_limit=${limit}`
          );
          var data1 = res.data
          
             
          data1.map(({  resume   ,id})=>{
            //   console.log(resume,id)
          })
        
          setTable(res.data)
          setTotalCount(Number(res.headers["x-total-count"]))
       
        
       
          
        //   setTodos(res.data);
        //   setTotalCount(Number(res.headers["x-total-count"]));
        };
        getTodo();
       
      }, [page,limit]);
      //// table set
     
     
   

  const filterByDep = (e)=>{
      console.log(e.target.value)
      let dep = e.target.value
      if(dep == "HR"){
        let nyaDep = table.filter((el)=> el.departement === "HR")
        // console.log(nyaDep,"filter1")
      }else if(dep == "Account"){
        let nyaDep1 = table.filter((el)=> el.departement === "Account") 
        // console.log(nyaDep1,"filter2")
      }else{
        let nyaDep2 = table.filter((el)=> el.departement === "Operation")
        // console.log(nyaDep2,"filter3")
      }
    

   

  }
     
    
 
   
        const sortFun  = (table)=>{
            let [{salary}] = table
            console.log(salary,"this " )
        fetch(`http://localhost:3000/forms?_sort=salary,name&_order=asc`)
        .then((res)=>res.json())
        .then((data)=>{
           console.log(data,"asc data")
           setTable(data)
        })
        

    }

    
    const sortDecFun  = (table)=>{
        let [{salary}] = table
        console.log(salary,"this " )
    fetch(`http://localhost:3000/forms?_sort=salary,name&_order=desc`)
    .then((res)=>res.json())
    .then((data)=>{
       console.log(data,"asc data")
       setTable(data)
    })
    

}



    const deleteFun = (id)=>{
        fetch(`http://localhost:3000/forms/${id}`,{
            method:"DELETE"
        })
        
        .then((res)=>res.json())
        .then((data)=>{
           console.log(data,"asc data")
          
        })

        fetch(`http://localhost:3000/forms`)
        .then((res)=>res.json())
        .then((data)=>{
           console.log(data,"asc data")
           setTable(data)
        })
       
        

         
    }

   



  

 


  return (
    <div  className={styles.tableDiv}>
        <table>
            <thead>
        <tr>
       
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Departement</th>
         
          <th>Marriage Stutus</th>
          <th>Salary</th>
         
          <th>Gender</th>
        </tr>
        </thead>
        {table.map(({id,username,age,email,departement,MaterialStutus,resume,salary,gender}) => {
          return (
              <tbody key={id} id={id}>
            <tr key={id} id={id} >
              <td >{username}</td>
              <td >{age}</td>
              <td>{email}</td>
              <td>{departement}</td>
              <td >{MaterialStutus ? "yes":"no"}</td>
            
              <td>{salary}</td>
              <td>{gender}</td>
              <td onClick= {()=>deleteFun(id)} >delete from record</td>
            </tr>
            
            </tbody>
          )
        })}

      </table>

      <select
         name='departement' 
       
         onChange={(e)=>filterByDep(e)} >


        <option value="HR">HR</option>
        <option value="Account">Account</option>
        <option value="Operation">Operation </option>
       </select>


      
      <button onClick= {()=>sortFun(table)}>Sort  Ascandig order Salary</button>
      <button onClick= {()=>sortDecFun(table)}>Sort  Decending order Salary</button>
     

      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          {"<"}
        </button>
        <button
          disabled={totoalCount <= page * limit}
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </button>

        <select onChange={(e)=>setLimit(Number(e.target.value))} >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      
    </div>

       
  )
}

export default Table
