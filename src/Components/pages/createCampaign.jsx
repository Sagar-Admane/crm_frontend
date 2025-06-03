import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import style from "./campaign.module.scss"

const fields = [
    {label : "Total Spend", value : "totalSpend"},
    {label : "Visits", value : "visits"},
    {label : "Inactive days", value : "inactiveDays"}
];

const operator = ['>','<','=','>=','<='];

function CreateCampaign() {

    const navigate = useNavigate();

    const [rules, setRules] = useState([
        {field : '', value : '', operator : '', logic : "AND"}
    ]);
    const [audienceSize, setAudienceSize] = useState(null); 

    function handleRuleChange(i, key, val){
        const updateRule = [...rules];
        updateRule[i][key] = val;
        setRules(updateRule);
    }

    function removeRule(index){
        const updated = rules.filter((_, i) => i!==index);
        setRules(updated);
    }

    function addRule(){
        setRules([...rules, {field : '', operator : '', value : '', logic : "AND"}]);
    }

    async function handleSubmit(){
        console.log('Segmentation rule  : ', rules);
        try {
            const res = await axios.post('https://mini-crm-backend-zamw.onrender.com/api/segment/view', {
                rules
            })
            console.log(res.data.cutomers);
            setAudienceSize(res.data.cutomers);
        } catch (error) {
            console.log(error.message);
        }

        
    }

    async function handleSave(){
        try {
            const res = await axios.post(`https://mini-crm-backend-zamw.onrender.com/api/segment/save`, {
                rules
            })
            if(rules){
                console.log("Rules saved");
                navigate("/campaign/history");
            } else {
                console.log("Not Saved");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        async function getUser(){
            try {
                const res = await axios.get('https://mini-crm-backend-zamw.onrender.com/auth/user', {withCredentials : true});
                console.log(res.data); 
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [])

//   return (
//     <div>
//       <h2>Campaign Rules : </h2>
//         {rules.map((rule, i) => (
//             <div key={i} >
//                 <select value={rule.field} onChange={(e) => handleRuleChange(i, 'field', e.target.value)} >
//                     <option value="">Select field</option>
//                     {fields.map(f => <option key={f.value} value={f.value} >{f.label}</option>)}
//                 </select>
//                 <select value={rule.operator} onChange={(e) => handleRuleChange(i, 'operator', e.target.value)} >
//                     <option value="">Op</option>
//                     {operator.map(op => <option key={op} value={op} >{op}</option>)}
//                 </select>

//                 <input type="number" value={rule.value} onChange={(e) =>handleRuleChange(i, 'value', e.target.value)} />

//                 {i!==0 && (
//                     <select value={rule.logic} onChange={(e) => handleRuleChange(i, 'logic', e.target.value)} >
//                         <option value="AND">AND</option>
//                         <option value="OR">OR</option>
//                     </select>
//                 )}

//                 <button onClick={() => removeRule(i)} >Remove Rule</button>

//             </div>
//         ))}

//         <div>
//             <button onClick={addRule} >Add Rule</button>
//             <button onClick={handleSubmit} >Preview Audience</button>
//         </div>


//         {audienceSize!==null && (
//             <p>Estimated audience size is : {audienceSize}</p>
//         )}

//         <button onClick={handleSave} >Save Campaign</button>

//     </div>
//   )

    return (
        <div className={style.container} >
            <div className={style.header1} >
                <div className={style.list} >
                  <p onClick={() => navigate("/campaign/history")} >Customer History</p>
                  <p onClick={() => navigate("/generate")} >Message suggestor</p>
                </div>
            </div>

            <div className={style.hero} >
                <p>Let's create campaign, see what's really happening</p>
                <div className={style.form}>
         {rules.map((rule, i) => (
             <div key={i} className={style.input1} >
                 <select value={rule.field} onChange={(e) => handleRuleChange(i, 'field', e.target.value)} >
                     <option value="">Select field</option>
                     {fields.map(f => <option key={f.value} value={f.value} >{f.label}</option>)}
                 </select>
                 <select value={rule.operator} onChange={(e) => handleRuleChange(i, 'operator', e.target.value)} >
                     <option value="">Op</option>
                     {operator.map(op => <option key={op} value={op} >{op}</option>)}
                 </select>

                 <input type="number" value={rule.value} onChange={(e) =>handleRuleChange(i, 'value', e.target.value)} />

                 {i!==0 && (
                     <select value={rule.logic} onChange={(e) => handleRuleChange(i, 'logic', e.target.value)} >
                         <option value="AND">AND</option>
                         <option value="OR">OR</option>
                     </select>
                 )}

                 <button onClick={() => removeRule(i)} >Remove Rule</button>

             </div>
         ))}

         <div className={style.button} >
             <button onClick={addRule} >Add Rule</button>
             <button onClick={handleSubmit} >Preview Audience</button>
         {audienceSize!==null && (
             <p>Estimated audience size is : {audienceSize}</p>
         )}

         <button onClick={handleSave} >Save Campaign</button>
         </div>



     </div>
                </div>
            </div>
    )
}

export default CreateCampaign
