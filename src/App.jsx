import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import "./App.css"
import CreateCampaign from './Components/pages/createCampaign'
import CampaignHistory from './Components/History/CampaignHistory'
import CreateCustomer from './Components/Customer/CreateCustomer'
import MessageSuggester from './Components/Generate/MessageSuggester'
import Dashboard from './Components/Dashboard/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard1' element={<CreateCampaign />} />
        <Route path='/campaign/history' element={<CampaignHistory />} />
        <Route path='/create-customer' element={<CreateCustomer />} />
        <Route path='/generate' element={<MessageSuggester />} /> 
      </Routes>
    </Router>
  )
}

export default App
