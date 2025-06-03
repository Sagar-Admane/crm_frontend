import { useRef } from "react";
import style from "./dashboard.module.scss"
import Typed from "typed.js"
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"

function Dashboard() {

    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        typed.current = new Typed(el.current, {
            strings : ['Create campaign', 'Generate strategy', 'and lot more'],
            stringsElement: null,
            typeSpeed: 80,
            backSpeed : 100,
            loop : true
        });

        return () => {
          typed.current.destroy()
        }
    }, []);

    const navigate = useNavigate();


  return (
    <div className={style.container} >
      <div className={style.header1} >
        <div className={style.list} >
          <p onClick={() => navigate("/campaign/history")} >Customer History</p>
          <p onClick={() => navigate("/generate")} >Message suggestor</p>
        </div>
      </div>
      <div className={style.hero} >
        <div className={style.header} >
            <p><span className={style.s1} >WELCOME,</span> to the world of <span className={style.s2} >CRM,</span></p>
            <p>You can <span ref={el} /></p>
        </div>
        <div className={style.button} >
          <button className={style.b1} onClick={() => navigate("/dashboard1")} >+ Create Campaign</button>
          <button className={style.b2} onClick={() => navigate("/create-customer")} >+ Add Customer</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
