import { useState } from 'react';
import LoginComponent from './components/LoginComponent';
import MachineTableComponent from './components/MachineTableComponent';
import NavigatorComponent from './components/NavigatorComponent';
import MaintenanceTableComponent from './components/MaintenanceTableComponent';
import { NAV_ITEMS } from './components/NAV_ITEMS';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState(NAV_ITEMS.homePage)

  const loggedSetter = (logged) => {
    setIsLoggedIn(logged)
  }
  
  const changePage = (page) => {
    setPage(page)
  }

  return(
    <div>
      <LoginComponent loggedSetter={loggedSetter}/>
      <NavigatorComponent changePage={changePage}/>
      {(page == NAV_ITEMS.machinePage)? <MachineTableComponent /> : ''}
      {(page == NAV_ITEMS.maintenancePage)? <MaintenanceTableComponent /> : ''}
    </div>
  )     
}

export default App;
