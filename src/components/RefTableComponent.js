import React, {Component} from "react";
import axios from "axios";

export default class RefTableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount () {
    this.loadData()
  }
  
  loadData() {
    axios.get(this.props.url)
      .then(response => {
        this.setState({ data: response.data})
      })
      .catch(error => {

      })
  }

  render () {
    return(
      <div>
        {this.state.data ? 
          <a href={this.props.url}>{this.state.data.title}</a>
        : '' }
         
      </div>
    )
  }
}