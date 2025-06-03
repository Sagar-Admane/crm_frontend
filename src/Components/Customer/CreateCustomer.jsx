import axios from "axios";
import { useState } from "react"
import styles from "./create.module.scss"
import freelance from "../../assets/freelancer.svg";

function CreateCustomer() {
  
    const [form, setForm] = useState({
        name : '',
        email : '',
        totalSpend : '',
        visits : '',
        lastActive : ''
    })

    function handleChange(e){
        setForm({...form, [e.target.name] : e.target.value});
    }

    async function handleClick(e){
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/customer', {
                f : JSON.stringify(form),
            });
            if(res){
                console.log(res); 
            } else {
                console.log("Cannot save data");
            }
        } catch (error) {
            console.log(error.mesage);
        }
    }
  
    return (
    <div className={styles.container} >
    <div className={styles.contact}>
        <p className={styles.head}>Create Customer</p>
        <div className={styles.form}>
            <div className={styles.left}>
                <div className={styles.text}>
                    <p>Let's create some customers for better understanding : </p>
                </div>
                <div className={styles.lform}>
            <form>
             <div><input type="text" name="name" placeholder="Enter Your Name" onChange={handleChange} /></div>
             <div><input type="email" name="email" placeholder="Enter your Email" onChange={handleChange} /></div>
             <div><input type="number" name="totalSpend" placeholder="Enter your Total Spend" onChange={handleChange} /></div>
             <div><input type="number" name="visits" placeholder="Enter your Total Visits" onChange={handleChange} /></div>
             <div><input type="date" name="lastActive" placeholder="Last Active Date" onChange={handleChange} /></div>
             <div><button className={styles.btn} onClick={handleClick} >Add Customer</button></div>
         </form>
                </div>
            </div>
            <div className={styles.right} >
                <div className={styles.image} >
                    <img src={freelance} alt="" />
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CreateCustomer
