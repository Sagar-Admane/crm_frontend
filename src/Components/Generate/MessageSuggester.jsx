import { useState } from "react";
import axios from "axios";
import style from "./generate.module.scss";
import {HashLoader} from "react-spinners"

function MessageSuggester() {
    const [loading, setLoading] = useState(false);
  const [obj, setObj] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  async function handleGenerate(e) {
    e.preventDefault();
    try {
        setLoading(true);
      const res = await axios.post(`https://mini-crm-backend-zamw.onrender.com/api/generate`, {
        obj,
      });
      if (res) {
        console.log(res.data.messages);
        setSuggestion(res.data.messages);
        setLoading(false);
      } else {
        console.log("Error in generating ...");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //   return (
  //     <div>
  //         <h3>Message suggestion</h3>
  //         <input type="text" placeholder="Enter your objective" onChange={(e) => setObj(e.target.value)} />
  //         <button onClick={handleGenerate} >Suggest</button>

  //         <div>
  //             <ul>
  //                 {suggestion.map((s) => {
  //                     return(
  //                         <li>
  //                             {s}
  //                         </li>
  //                     )
  //                 })}
  //             </ul>
  //         </div>

  //     </div>
  //   )

  return (
    <div className={style.container}>
      <p>Generate Message</p>

      <div className={style.main}>
        <div className={style.left}>
            <p>Enter value to generate some suggestion regarding strategy</p>
          <form>
            <input
              type="text"
              placeholder="Enter your objective"
              onChange={(e) => setObj(e.target.value)}
            />
            <button onClick={handleGenerate}>Suggest</button>
          </form>
        </div>
        <div className={style.right}>
            <p style={{fontSize : "25px"}} >Generated Suggestions : </p>
          {loading ? <HashLoader color="#ffffff" /> : (
            <ul>
            {suggestion.map((s) => {
              return <li>{s}</li>;
            })}
          </ul> 
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageSuggester;
