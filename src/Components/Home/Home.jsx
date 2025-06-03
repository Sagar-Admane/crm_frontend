import style from "./home.module.scss"
import logo from "../../assets/Shape_1.svg"
import google from "../../assets/google.svg"

function Home() {

  
  return (
    <div className={style.container} >
      
      <div className={style.signup}>
        <div className={style.logo}>
          <img width={60} height={60} src={logo} alt="" />
        </div>
         
        <div className={style.hero}>
           <div className={style.welcome}>
            <p className={style.p1} >Welcome, to our CRM web page <br /> and our resources</p>
            <p className={style.p2} >Sign up to see more</p>
          </div>
          <div className={style.auth} >
            <a href="https://mini-crm-backend-zamw.onrender.com/auth/google">
              <button>
                <img src={google} alt="" />
                <p>Continue with Google</p>
              </button>
            </a>
            <p className={style.footer} >By continuing, you agree to the <span className={style.s1} >Terms of Service</span> <br />
and acknowledge you’ve read our <span className={style.s2} >Privacy Policy</span>. </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
