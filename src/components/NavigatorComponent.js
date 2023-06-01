import React, {Component} from "react";
import { NAV_ITEMS } from "./NAV_ITEMS";
import './NavigatorComponent.css'

export default class NavigatorComponent extends Component {
  constructor(props) {
    super(props)
  }

  navClick = (event) => {
    this.props.changePage(event.target.getAttribute('page'))
  }

  render () {
    return(
      <div>
        <ul className="nav-bar">
          <li className="nav-item" page={NAV_ITEMS.homePage} onClick={this.navClick}>Home</li>
          <li className="nav-item" page={NAV_ITEMS.machinePage} onClick={this.navClick}>Machines</li>
          <li className="nav-item" page={NAV_ITEMS.maintenancePage} onClick={this.navClick}>Maintenances</li>
          <li className="nav-item" page={NAV_ITEMS.reclamationPage} onClick={this.navClick}>Reclamations</li>
        </ul>
      </div>
    )
  }
}
