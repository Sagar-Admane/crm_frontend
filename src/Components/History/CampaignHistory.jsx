import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from "./history.module.scss"

function CampaignHistory() {

    const [campaigns, setCampaigns] = useState([]);
    const [visibleLogs, setVisibleLogs] = useState({});
    const [logs, setLogs] = useState({});

    useEffect(() => {
        async function init(){
            const res = await axios.get(`http://localhost:3001/api/segment/history`);
            if(res){
                setCampaigns(res.data.result);
            } else {
                console.log("there is some error");
            }
        }

        init();

        console.log(campaigns);
    }, [])

    useEffect(() => {
        console.log(campaigns);
    }, [campaigns])

    async function toggleLogs(campaignId){
      const isVisible = visibleLogs[campaignId];
      if(!isVisible && !logs[campaignId]){
      try {
        const res = await axios.get(`http://localhost:3001/api/logs/${campaignId}`);
        setLogs((prev) => ({...prev, [campaignId] : res.data}));
      } catch (error) {
        console.log(error.message);
      }
    }
    setVisibleLogs((prev) => ({...prev, [campaignId] : !isVisible}));
  }


  // return (
  //   <div>
  //     <p>This is campaign history</p>
  //     <ul>
  //     {
  //       campaigns.map((c, i) => {
  //           return(
  //           <li key={i} >
  //               <p><strong>Created : </strong> {new Date(c.createdAt).toLocaleString()} </p>
  //               <p><strong>Audience size : </strong>{c.audienceSize}</p>
  //               <p><strong>Sent : </strong> {c.sent} | <strong>Failed : </strong> {c.failed} </p>

  //               <button onClick={() => toggleLogs(c._id)} >{visibleLogs[c._id] ? 'Hide Logs' : 'View Logs'}</button>

  //               {visibleLogs[c._id] && logs[c._id] && (
  //                 <div>
  //                   <h4>Communication logs</h4>
  //                   <ul>
  //                     {logs[c._id].map((log, idx) => (
  //                       <li key={idx}>
  //                       {log.customerId?.name || 'Unknown user'} ({log.customerId?.email}) —
  //                       <span className={`ml-2 font-semibold ${log.status === 'SENT' ? 'text-green-600' : 'text-red-500'}`}>
  //                         {log.status}
  //                       </span>
  //                       </li>
  //                     ))}
  //                   </ul>
  //                 </div>
  //               )}

  //           </li>
  //           )
  //       })
  //     }
  //     </ul>



  //   </div>
  // )

  return(
    <div className={style.container} >
      <p>Campaign History</p>
      <div className={style.main} >
      {
         campaigns.map((c, i) => {
             return(
             <li key={i} >
                 <p><span>Created : </span> {new Date(c.createdAt).toLocaleString()} </p>
                 <p><span>Audience size : </span>{c.audienceSize}</p>
                 <p><span>Sent : </span> {c.sent} | <span>Failed : </span> {c.failed} </p>

                 <button onClick={() => toggleLogs(c._id)} >{visibleLogs[c._id] ? 'Hide Logs' : 'View Logs'}</button>

                 {visibleLogs[c._id] && logs[c._id] && (
                   <div>
                     <h4>Communication logs</h4>
                     <ul>
                       {logs[c._id].map((log, idx) => (
                         <li key={idx}>
                         {log.customerId?.name || 'Unknown user'} ({log.customerId?.email}) —
                         <span className={`ml-2 font-semibold ${log.status === 'SENT' ? 'text-green-600' : 'text-red-500'}`}>
                           {log.status}
                         </span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}

             </li>
             )
         })
       }
      </div>
    </div>
  )
}

export default CampaignHistory
