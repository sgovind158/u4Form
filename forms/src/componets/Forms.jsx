import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

import styles from "./style.module.css"
    let data1 = [{
          username:"govind",
           age : 50,
           gender : "Male"
    }]
const Forms = () => {
    const [form,setForm] = useState(data1)
       const ref = useRef()

      
      
    const handleChange = (e) =>{

        let {checked,type,name,value ,files} = e.target;
        // console.log(e)
  
        if(type ==="checkbox"){

          
                setForm({
                    ...form,
                    [name]:checked,
                })

           
           
        } else if(type === "file"){
            setForm({
                ...form,
                [name]:files,
            })
        }
        
        else{
            setForm({
                ...form,
                [name]:value,
            })

        }
       
    }


    useEffect(()=>{
        // console.log(form)

    },[form])

    const  handleOnSubmit= (e)=>{
      e.preventDefault()

      if(!form.username) ref.current.focus()
      console.log(form)
      let {username,age,email,departement,MaterialStutus,resume,salary,gender} = form

       
     
      let sel = Number(salary)
      console.log(sel)
      fetch("http://localhost:3004/forms",{
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
           age: age,
          email:email,
         departement: departement,
         MaterialStutus: MaterialStutus,
         resume: resume,
         salary: sel,
         gender : gender
        })
       }) 

       fetch(`http://localhost:3000/forms`)
    
       .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"this is ")
            setForm(data)
        
    })
    


        

    }



  return (
               
    <>
    <div >
        hello 
    </div>
    <div  className={styles.mainFormDiv}> Form
       <form onSubmit={handleOnSubmit} >
        <div>
            <label>Name</label>
            <input type="text" 
            ref={ref}
               name='username'
               placeholder='enter your name'
            //    value={form.username}
               onChange={handleChange}/>
        </div>

        <div>
           
            <label>Age</label>
            <input type="number" 
               name='age'
               placeholder='enter your age'
            //    value={form.age}
               onChange={handleChange}/>
        </div>

      

        <div>
           
            <label>Address</label>
            <input type="text" 
               name='email'
               placeholder='enter address'
            //    value={form.email}
               onChange={handleChange}/>
        </div>

        <select
         name='departement'
         value={form.departement}
         onChange={handleChange}>


        <option value="HR">HR</option>
        <option value="Account">Account</option>
        <option value="Operation">Operation </option>
       </select>

       <div>
           
           <label>Salary</label>
           <input type="number" 
              name= "salary"
              placeholder='enter your age'
           //    value={form.age}
              onChange={handleChange}/>
       </div>
        
        <div>
           
            <label>MaterialStutus</label>
            <input type="checkbox" 
               name='MaterialStutus'
              
            //    value={form.isIndian}
               onChange={handleChange}/>
        </div>
        <label>Gender</label>
        <div>
           
           <label>Male</label>
           <input type="radio" 
              name='gender'
              placeholder='enter your name'
              value="Male"
              onChange={handleChange}/>
       </div>

       <div>
           
           <label>Female</label>
           <input type="radio" 
              name='gender'
              placeholder='enter your name'
              value= "Female"
              onChange={handleChange}/>
       </div>

       <div>
           
           <label>user resume</label>
           <input type="file" 
              name='resume'
              placeholder='enter your name'
            //   files = {form.resume}
              onChange={handleChange}/>
       </div>

    
       <button type='submit' >submit</button>
       </form>
    </div>
  
    </>
  )
}

export default Forms

