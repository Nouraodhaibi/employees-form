import axios from "axios"
import { useEffect, useState , useRef} from "react"
import '../App.css'
import {CSVLink} from 'react-csv'
import {useReactToPrint} from "react-to-print"


function Tabel() {
    const [data, setData]= useState([])
    const [name, setName]= useState('')
    const [name2, setName2]= useState('')
    const [name3, setName3]= useState('')
    const [email, setEmail]= useState('')
    const [passport, setPassport]= useState('')
    const [phone, setPhone]= useState('')
    const [rtb, setRtb]= useState('')
    const [urtb, usetRtb]= useState('')
    const [uphone, usetPhone]= useState('')
    const [upassport, usetPassport]= useState('')
    const [uname, usetName]= useState('')
    const [uname2, usetName2]= useState('')
    const [uname3, usetName3]= useState('')
    const [uemail, usetEmail]= useState('')
    const[editId ,setEditID]= useState(-1)
    const [errors, setErrors]= useState(null)

    useEffect(()=> {
            axios.get('https://backend-9-djc2.onrender.com/users')
            .then(res => setData(res.data))
            .catch(errors => console.log(errors));
    },[])
    function isValidEmail(email) {

      return /\S+@\S+\.\S+/.test(email);
      
      
    }
    const handleChange = event => {
      if ( ! isValidEmail(event.target.value)) {
        setErrors(true);
      } 
      else {
        setErrors(false);
         
      }
  
     setEmail(event.target.value);
    };
  
    const handleSubmit = (event) => {
      
       event.preventDefault();
      if(name3.length==0 ||name2.length==0 ||name.length==0 || email.length==0 || passport.length==0 || phone.length==0 || passport.length !='10' || phone.length !='10' ){
        setErrors(true)
      }
      

      
        if (!name.match(/[\u0600-\u06FF\u0750-\u077F]/)) {
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
      if( !errors &&name && passport && email && phone && name2 && name3){
      axios.post('https://backend-9-djc2.onrender.com/users', {id: id ,passport: passport, name: name , email: email , phone: phone, name2: name2 ,name3: name3, rtb : rtb })
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
        usetName2(res.data.name2)
        usetName3(res.data.name3)
        usetEmail(res.data.email)
        usetPhone(res.data.phone)
        usetRtb(res.data.rtb)
      })
      .catch(er => console.log(er));
      setEditID(id)
    }
    const handleUpdate = ()=>{
      axios.put('https://backend-9-djc2.onrender.com/users/'+editId, {id: editId, passport: upassport, name: uname,email: uemail, phone: uphone, name2: uname2, name3: uname3, rtb: urtb})
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
      <h1>أهلا بك !</h1>
      <h2>.. من فضلك أدخل بياناتك بالأسفل</h2>
      <h6>*ملاحظة: يجب اكمال كافة الحقول</h6>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="vv">
            <label className="cc">رقم الهوية:</label>
          <input type="number"  placeholder="أدخل رقم الهوية" onChange={e => setPassport(e.target.value)} /> 
          </div>
          <div>
            {errors && passport.length<=0?
          <label className="n">رقم الهوية يجب ألا يكون فارغ</label>:

          errors &&  passport.length <'10' || passport.length >'10'?
          <label className="n">رقم الهوية يجب أن يكون 10 أرقام</label>
          :""}
          </div>
          <div className="vv">
            <label className="cc">الأسم:</label>
          <input type="string" placeholder="أدخل الأسم الأول" onChange={e => setName(e.target.value)} 
            
          />
          </div>
          <div>
            {errors && name.length<=0?
          <label className="n">الحقل يجب ألا يكون فارغ</label> :

          errors && ! name.match('^[sa-zA-Zء-ي]*$')  ?
          <label className="n">الحقل يجب أن يحتوي على الحروف فقط</label>
          :""}

          
          </div>


          <div className="vv">
            <label className="cc">اسم الأب:</label>
          <input type="text" placeholder="أدخل اسم الأب" onChange={e => setName2(e.target.value)} />
          </div>
          <div>
            {errors && name2.length<=0?
          <label className="n">الحقل يجب ألا يكون فارغ</label>:""}
          </div>

          <div className="vv">
            <label className="cc">اسم العائلة:</label>
          <input type="text" placeholder="أدخل اسم العائلة" onChange={e => setName3(e.target.value)} />
          </div>
          <div>
            {errors && name3.length<=0?
          <label className="n">الحقل يجب ألا يكون فارغ</label>:""}
          </div>


          <div className="vv">
            <label className="cc">رقم الجوال:</label>
          <input type="number" placeholder="05********" onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            {errors && phone.length<=0? 
          <label className="n">الحقل يجب ألا يكون فارغ</label>: 

          errors &&  phone.length <'10' || phone.length >'10'?
          <label className="n">رقم الجوال يجب أن يكون 10 أرقام</label>
          :""}
          </div>
          <div className="vv">
            <label className="cc">الايميل:</label>
          <input type="text" placeholder="أدخل الايميل"  onChange={handleChange} />
          </div>
          <div>
            {errors && email.length<=0?
          <label className="n">الحقل يجب ألا يكون فارغ</label>: 
          
            errors && ! isValidEmail(email)?
            <label className="n">الايميل غير صالح </label>: ""
            // errors && !checkEmail?
            // <label>Email Is Already Exist </label>: ""
          } 
             {/* <div className="vv">
            <label className="cc">المرتبة:</label>
          <input type="listbox" placeholder="أدخل الايميل"  onChange={handleChange} />
          </div> */}
          
          <label className="cc">
      المرتبة:
      <select className='vv'     name="" onChange={e => setRtb(e.target.value)} >
        <option value="الأولى" selected>الأولى</option>
        <option value="الثانية">الثانية</option>
        <option value="الثالثة">الثالثة</option>
        <option value="الرابعة">الرابعة</option>
        <option value="الخامسة">الخامسة</option>
        <option value="السادسة">السادسة</option>
        <option value="السابعة">السابعة</option>
        <option value="الثامنة">الثامنة</option>
        <option value="التاسعة">التاسعة</option>
        <option value="العاشرة">العاشرة</option>
        <option value="الأحدى عشر">الأحدى عشر</option>
        <option value="الاثنى عشر">الاثنى عشر</option>
        <option value="الثالثة عشر">الثالثة عشر</option>
        <option value="الرابعة عشر">الرابعة عشر</option>

      </select>
    </label>





          </div>
          {/* {errors.email && <span>{errors.email}</span>} */}
          <div className="btn1">
         
          <button className="btn1">أضف</button> 
          {/* <div>
            {!errors && handleSubmit?
            <label>Submitted Successfully!</label>:""
              }
          </div> */}
          </div>
        </form>
      </div>
      <CSVLink data={data}><button className="btn">تصدير إلى اكسل</button></CSVLink>
      <button className="btn" onClick={ generatePDF}>PDF تصدير  </button>
      <div ref={conponentPDF} style={{width: '100%'}}>

      
        <table>
          
            <thead>
                <tr>
                   <th>I</th>
                    <th>الهوية</th>
                    <th>الأسم</th>
                    <th>اسم الأب</th>
                    <th>العائلة</th>
                    <th>الايميل</th>
                    <th>الجوال</th>
                    <th>المرتبة</th>
                    <th>التحرير</th>
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
                      <td> <input type="text" value={uname2} onChange={e => usetName2(e.target.value)} /></td>
                      <td> <input type="text" value={uname3} onChange={e => usetName3(e.target.value)} /></td>
                      <td> <input type="text" value={uemail} onChange={e => usetEmail(e.target.value)} /></td>
                      <td> <input type="text" value={uphone} onChange={e => usetPhone(e.target.value)} /></td>
                      <td> <input type="string" value={urtb} onChange={e => usetRtb(e.target.value)} /></td>
                      <td><button className= "lb2" onClick={handleUpdate}>تحديث</button></td>
                                        </tr>
                  :
                      <tr key={index}>
                        <td> {user.id} </td>
                        <td> {user.passport} </td>
                        <td> {user.name} </td>
                        <td> {user.name2} </td>
                        <td> {user.name3} </td>
                        <td> {user.email} </td>
                        <td> {user.phone} </td>
                        <td> {user.rtb} </td>
                        <td className="space">
                          <button className= "lb2" onClick={() => handleEdit(user.id)}>تعديل</button>
                          <button className= "lb2" onClick={() => handleDelete(user.id)}>حذف</button>
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