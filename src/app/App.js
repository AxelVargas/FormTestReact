import React, { Component } from 'react';
let td = {
  'word-wrap': 'break-word',
  
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      email: '',      
      titles:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTitle = this.addTitle.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    
  }

  addTitle(e) {

    e.preventDefault();    
    let dataIssue = {
      title: 'Issue Api',
      body: 'Email: ' + this.state.email + ' Titulo: ' + this.state.title 
    } ; 
      fetch('/api/title', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
         
          console.log(data);
          window.M.toast({html: 'Título Registrado'});
          this.fetchTitle();
          this.setState({title: '', email: ''});
         
        })
        .catch(err => console.error(err)); 
        
        fetch('https://api.github.com/repos/AxelVargas/FormTestReact/issues',
          {
            method: 'POST',
            body: JSON.stringify(dataIssue),
            headers: {
              'Authorization': 'Token 268848cb07f2a0cd298057de8b87580e3ce0df34',
              
            }
          }
        )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Issue Creado'});
        })
        .catch(err => console.error(err));  

  }  

  componentDidMount() {
    this.fetchTitle();
  }

  fetchTitle() {
    
    fetch('/api/title')
      .then(res => res.json())
      .then(data => {
        
        this.setState({titles: data.info});
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="lamber lighten-1">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">CC Prueba</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTitle}>
                    
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="title" onChange={this.handleChange} value={this.state.title} cols="30" rows="10" placeholder="Escribe tú título" autoFocus className="materialize-textarea" required></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <input name="email" onChange={this.handleChange} value={this.state.email} type="email" placeholder="Escribe tú e-mail" required/>
                      </div>
                    </div>

                    <button type="submit" className="btn deep-orange accent-3" disabled={!this.state.email || !this.state.title}>
                      Enviar 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                { 
                    this.state.titles.map(titleInfo => {
                      return (

                        <tr>
                          <td >{titleInfo.title}</td>
                          <td >{titleInfo.email}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;
