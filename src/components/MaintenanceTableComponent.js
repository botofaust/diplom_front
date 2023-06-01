import React, {Component} from "react";
import axios from "axios";
import RefTableComponent from "./RefTableComponent";

export default class MaintenanceTableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    this.loadData = this.loadData.bind(this)
  }
  
  componentDidMount () {
    this.loadData()
  }
  
  loadData () {
    axios.get(
      '/api/maintenance'
    )
      .then(response => {
        this.setState({ data: response.data })
      })
  }

  render () {
    return(
      <table>
        <thead><tr>
          <th>Order number</th>
          <th>Order date</th>
          <th>Type</th>
        </tr></thead>
        <tbody>
        {this.state.data.map((elem, number) => 
          <tr key={number}>
            <td>{elem.order_number}</td>
            <td>{elem.order_date}</td>
            <td>{elem.type}</td>
          </tr>  
        ) }
        </tbody>
    </table>
    )
  }
}