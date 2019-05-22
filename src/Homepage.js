import React, {Component} from 'react';
import Axios from 'axios';
import Auth from './Auth';
import Login from './login';
import Signup from './signup';
import Shop from './shop';

class Homepage  extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.refreshPage = this.refreshPage.bind(this);
        this. refreshPageAndGoToLogin = this.refreshPageAndGoToLogin.bind(this);
    }

    toggle() {
		this.setState({
			shown: !this.state.shown
		});
    }

    refreshPage(){
        this.forceUpdate();
    }
    
    refreshPageAndGoToLogin(){
        this.refreshPage();
        this.toggle();
    }

    logout(){
        alert('logout');

        // Add this token to blacklist 
        Axios.post('/logout',{token:Auth.getToken()}).then((result)=>{
            // access results
            console.log(result);
        })

        // Delete token from browser
        Auth.deauthenticateUser();

        this.refreshPage();
    }
    
    render() {
        var shown = {
			display: this.state.shown ? "none" : "block"
		};
		
		var hidden = {
            display: this.state.shown ? "block" : "none"
        };
        
        return (
            <div>
            {Auth.isUserAuthenticated() ? (
                <div>
                    <div id="logout"><button onClick={this.logout.bind(this)}>LogOut</button></div>
                    <Shop/>
                </div>
             ) : (
               <div id="login">
                 <div style={ shown }>
                    <Login refreshPage={this.refreshPage} /><br/>
                    <button onClick={this.toggle.bind(this)}>Register</button>
                 </div>
                 <div style={ hidden }>
                    <Signup refreshPageAndGoToLogin={this.refreshPageAndGoToLogin} />
                </div>
                  
               </div>
           )}
           </div>
        );
    }
}

export default Homepage;