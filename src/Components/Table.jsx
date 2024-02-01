import axios from "axios"
import { useEffect, useState , useRef} from "react"
import '../App.css'
import {CSVLink} from 'react-csv'
import {useReactToPrint} from "react-to-print"


function Tabel() {
    const [data, setData]= useState([])
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [passport, setPassport]= useState('')
    const [phone, setPhone]= useState('')
    const [uphone, usetPhone]= useState('')
    const [upassport, usetPassport]= useState('')
    const [uname, usetName]= useState('')
    const [uemail, usetEmail]= useState('')
    const[editId ,setEditID]= useState(-1)
    const [errors, setErrors]= useState(false)

    useEffect(()=> {
            axios.get('https://backend-9-djc2.onrender.com/users')
            .then(res => setData(res.data))
            .catch(errors => console.log(errors));
    },[])
    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
      
    }
    const handleChange = event => {
      if (! isValidEmail(event.target.value)) {
        setErrors(true);
      } 
      else {
        setErrors(false);
      }
  
      setEmail(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
      if(name.length==0 || email.length==0 || passport.length==0 || phone.length==0 || ! passport.length =='10'|| phone.length =='10'){
        setErrors(true)
      }
      //  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      //   errors.email = 'Invalid email address'
      //   setErrors(true)
      // }
      const id= String (data.length + 1);
      // const validationErrors ={}
      // if(!data.name.trim()){
      //   validationErrors.name ="Full Name Is Required!"
      // }
      // if(!data.email.trim()){
      //   validationErrors.email ="Email Is Required!"
      // }else if(!/\S+@\S+\.\S+/.test(data.email)){
      //   validationErrors.email ="Email Is Not Valid"
      // }
      // setErrors(validationErrors)
      // if(Object.keys(validationErrors).length === 0){
      //   alert("Form Submitted Succesfully")
      // }
      if( !errors &&name && passport && email && phone){
      axios.post('https://backend-9-djc2.onrender.com/users', {id: id ,passport: passport, name: name , email: email , phone: phone })
      .then(res => { alert("Submitted Successfully!")
        location.reload(res)
        
      })
      .catch(errors => console.log(errors));
    }
    }
    
    const handleEdit =(id)=>{
      axios.get('https://backend-9-djc2.onrender.com/users/'+id)
      .then(res =>{
        // checkEmail(res.data)
        console.log(res.data)
        usetPassport(res.data.passport)
        usetName(res.data.name)
        usetEmail(res.data.email)
        usetPhone(res.data.phone)
      })
      .catch(er => console.log(er));
      setEditID(id)
    }
    const handleUpdate = ()=>{
      axios.put('https://backend-9-djc2.onrender.com/users/'+editId, {id: editId, passport: upassport, name: uname,email: uemail, phone: uphone})
      .then(res => {
        console.log(res);
        location.reload();
        setEditID(-1);
      }).catch(err => console.log(err))
    }

    const handleDelete = (id) => {
      axios.delete('https://backend-9-djc2.onrender.com/users/'+(id))
      .then(res =>{
      location.reload();
       
      })
      .catch(errors => console.log(errors));
    }

    const conponentPDF= useRef();
    const generatePDF= useReactToPrint({
      content: ()=> conponentPDF.current, 
      documentTitle: "data",
      onAfterPrint:()=> alert("Data saved in PDF")
    });
    // const checkEmail = (data) => {
    //   console.log(data)
    //   if(data.includes(email)){
    //     alert("Email Is Already Exist")
    //   }
    // }
   
  //  function isValidSub (email , name , phone , passport) {
  //   return (email && name && phone && passport);
  // }
  // const handlesub = event => {
  //   if (!isValidSub(event.target.value)) {
  //     setErrors('sub');
  //   } else {
  //     setErrors(false);
  //   }

    
  // };

  return (
    <div className="container">
      <div className="lbl"> 
      <h1>welcome back!</h1>
      <h2>Please enter your information below..</h2>
      <h6>*note that: You must complete all fields</h6>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="vv">
            <label className="cc">Passport Number:</label>
          <input type="number"  placeholder="Enter Passport Number" onChange={e => setPassport(e.target.value)}  /> 
          </div>
          <div>
            {errors && passport.length<=0?
          <label className="n">Passport Number Cant be Empty</label>:

          errors &&  passport.length <'10' || passport.length >'10'?
          <label className="n">Passport Number Must Be 10 Digit</label>
          :""}
          </div>
          <div className="vv">
            <label className="cc">Full Name:</label>
          <input type="text" placeholder="Enter Full Name" onChange={e => setName(e.target.value)} />
          </div>
          <div>
            {errors && name.length<=0?
          <label className="n">Full Name Cant be Empty</label>:""}
          </div>
          <div className="vv">
            <label className="cc">Phone Number:</label>
          <input type="number" placeholder="Enter Phone Number" onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            {errors && phone.length<=0? 
          <label className="n">Phone Number Cant be Empty</label>: 

          errors &&  phone.length <'10' || phone.length >'10'?
          <label className="n">phone Number Must Be 10 Digit</label>
          :""}
          </div>
          <div className="vv">
            <label className="cc">Email:</label>
          <input type="text" placeholder="Enter Email"  onChange={handleChange} />
          </div>
          <div>
            {errors && email.length<=0?
          <label className="n">Email Cant be Empty</label>: 
          
             errors && ! email.isValidEmail?
            <label className="n">Email Is Not Valid </label>: ""
            // errors && !checkEmail?
            // <label>Email Is Already Exist </label>: ""
          } 

      
          </div>
          {/* {errors.email && <span>{errors.email}</span>} */}
          <div className="btn1">
         
          <button className="btn1">Add</button> 
          {/* <div>
            {!errors && handleSubmit?
            <label>Submitted Successfully!</label>:""
              }
          </div> */}
          </div>
        </form>
      </div>
      <CSVLink data={data}><button className="btn">Export to EXCEL</button></CSVLink>
      <button className="btn" onClick={ generatePDF}>Export to PDF</button>
      <div ref={conponentPDF} style={{width: '100%'}}>

      
        <table>
          
            <thead>
                <tr>
                   <th>ID</th>
                    <th>Passport</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody style={{}}>
                {
                data.map((user,index) => (
                  user.id === editId ?
                  <tr key={''}>
                      <td> {user.id} </td>
                      <td> <input type="text" value={upassport} onChange={e => usetPassport(e.target.value)}/> </td>
                      <td> <input type="text" value={uname} onChange={e => usetName(e.target.value)} /></td>
                      <td> <input type="text" value={uemail} onChange={e => usetEmail(e.target.value)} /></td>
                      <td> <input type="text" value={uphone} onChange={e => usetPhone(e.target.value)} /></td>
                      <td><button className= "lb2" onClick={handleUpdate}>Update</button></td>
                                        </tr>
                  :
                      <tr key={index}>
                        <td> {user.id} </td>
                        <td> {user.passport} </td>
                        <td> {user.name} </td>
                        <td> {user.email} </td>
                        <td> {user.phone} </td>
                        <td className="space">
                          <button className= "lb2" onClick={() => handleEdit(user.id)}>Edit</button>
                          <button className= "lb2" onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                      </tr>
                ))
                }
            </tbody>
        </table>
        </div>
        </div>
    </div>
  )
}

export default Tabel