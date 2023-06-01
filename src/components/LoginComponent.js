import React, {Component, createRef} from "react";
import axios from "axios";
import './LoginComponent.css'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
  
export default class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userName: null,
      formUsername: '',
      formPassword: '',
      error: '',
    }
    this.usernameInput = createRef()
    this.passwordInput = createRef()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    axios.get('/api/user_info',
        {headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
    })
      .then(response => {
        const logged = response.data.logged
        this.setState({
          error: null,
          isLoggedIn: logged,
          userName: response.data.username,
        })
     })
      .catch(error => {
        this.setState({
          error: error.statusText,
          isLoggedIn: false,
          userName: null,
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!(this.state.isLoggedIn & prevState.isLoggedIn)) {
      this.props.loggedSetter(this.state.isLoggedIn)
    }
  }
  
  login(event) {
    event.preventDefault()
    const csrftoken = getCookie('csrftoken')
    axios.post('/api/login/',
      {headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-CSRFToken': csrftoken,
        },
        username: this.usernameInput.current.value,
        password: this.passwordInput.current.value,
      }
    )
      .then(response => {
        this.setState({
          error: null,
          isLoggedIn: true,
          userName: response.data.username,
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: 'Ошибка, подробности в консоли',
          isLoggedIn: false,
        })
       })
  }

  logout (event) {
    fetch('api/logout/')
      .then(() => {
        this.setState({ isLoggedIn: false })
      })
  }

  render() {
    return (
        <div>
          { !this.state.isLoggedIn? 
          <form className="loginForm" onSubmit={this.login}>
            <input type="text" name="username" ref={this.usernameInput}  placeholder="Username"/>
            <input type="password" name="password" ref={this.passwordInput} placeholder="Password"/>
            <input type="submit" name="submit" value="Войти"/>
          </form>
          :
          <div>Greetings, {this.state.userName} <button onClick={this.logout}>Выйти</button> </div>
          }
        </div>
    )
  }
}
