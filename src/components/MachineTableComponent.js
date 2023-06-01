import React, {Component, createRef} from "react";
import axios from "axios";
import RefTableComponent from "./RefTableComponent";
import './MachineTableComponent.css'

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

class MachineCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      model: [],
      engine: [],
      transmission: [],
      drivingBridge: [],
      controlledBridge: [],
      clientUser: [],
      serviceUser: [],
      status: ''
    }
    this.createMachine = this.createMachine.bind(this)
    this.createFrom = createRef()
  }
  componentDidMount() {
    axios.get('/api/referencetable/?type=MM')
      .then(response => {
        this.setState({ model: response.data })
      })
      axios.get('/api/referencetable/?type=EM')
      .then(response => {
        this.setState({ engine: response.data })
      })
      axios.get('/api/referencetable/?type=TM')
      .then(response => {
        this.setState({ transmission: response.data })
      })
      axios.get('/api/referencetable/?type=DM')
      .then(response => {
        this.setState({ drivingBridge: response.data })
      })
      axios.get('/api/referencetable/?type=CM')
      .then(response => {
        this.setState({ controlledBridge: response.data })
      })
      axios.get('/api/users')
      .then(response => {
        this.setState({ clientUser: response.data })
      })
      axios.get('/api/users')
      .then(response => {
        this.setState({ serviceUser: response.data })
      })
  }

  createMachine(e) {
    e.preventDefault()
    const formData = new FormData(this.createFrom.current)
    axios.post(
      '/api/machine/', formData,
      {headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-CSRFToken': getCookie('csrftoken'),
        }     
      })
      .then(response => {
        if (response.status == 201) {
          this.props.newMachineCallback()
          this.setState(response.statusText)
        }
      })
      .catch(error => {
        this.setState(error.statusText)
      })
  }
  
  render() {
    return(
      <div>
     <form ref={this.createFrom} className="creator" onSubmit={this.createMachine}>
      <div className="selector">
        <select name="model">
          {this.state.model.map((item, number) =>
            <option key={number} value={item.url}>{item.title}</option>
          )}
        </select>
        <input type="text" name="model_serial" />
      </div>
      
      <div className="selector">  
      <select name="engine">
        {this.state.engine.map((item, number) =>
          <option key={number} value={item.url}>{item.title}</option>
        )}
      </select>
      <input type="text" name="engine_serial" />
      </div>
      
      <div className="selector">  
      <select name="transmission">
        {this.state.transmission.map((item, number) =>
          <option key={number} value={item.url}>{item.title}</option>
        )}
      </select>
      <input type="text" name="transmission_serial" />
      </div>
      
      <div className="selector">  
      <select name="driving_bridge">
        {this.state.drivingBridge.map((item, number) =>
          <option key={number} value={item.url}>{item.title}</option>
        )}
      </select>
      <input type="text" name="driving_bridge_serial" />
      </div>
      
      <div className="selector">  
      <select name="controlled_bridge">
        {this.state.controlledBridge.map((item, number) =>
          <option key={number} value={item.url}>{item.title}</option>
        )}
      </select>
      <input type="text" name="controlled_bridge_serial" />
      </div>
      
      <div className="selector">  
      <select name="client_user">
      {this.state.clientUser.map((item, number) =>
          <option key={number} value={item.url}>{item.username}</option>
        )}
      </select>
      </div>
      
      <div className="selector">  
      <select name="service_user">
      {this.state.serviceUser.map((item, number) =>
          <option key={number} value={item.url}>{item.username}</option>
        )}
      </select>
      </div>
      <input type="text" name="contract" placeholder="contract"/>
      <input type="text" name="shipment_address" placeholder="shipment_address" />
      <input type="text" name="equipment" placeholder="equipment" />
      <input type="submit" value="Create" />
     </form>
     {this.state.status? this.state.status : ''}
     </div>
    )
  }
}

export default class MachineTableComponent extends Component {
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
      '/api/machine'
    )
      .then(response => {
        this.setState({ data: response.data })
      })
  }

  render () {
    return(
      <div>
      <table>
        <thead><tr>
          <th>Serial</th>
          <th>Client</th>
          <th>Controlled Bridge</th>
        </tr></thead>
        <tbody>
        {this.state.data.map((machine, number) => 
          <tr key={number}>
            <td>
              {machine.model_serial}
            </td>
            <td>{machine.client_user}</td>
            <td><RefTableComponent url={machine.controlled_bridge.replace(/^(?:\/\/|[^/]+)*\//, '')} /></td>
          </tr>  
        ) }
        </tbody>
    </table>
    <MachineCreator newMachineCallback={this.loadData} />
    </div>
    )
  }
}