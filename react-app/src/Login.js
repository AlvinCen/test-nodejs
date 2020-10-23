import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { username, password } = this.state;
        fetch("http://localhost:4000/login/" + username + '&' + password)
            .then(res => res.text())
            .then(res => this.setState({
                apiResponse: res,
                message: 'Sukses'
            })
            );
        event.preventDefault();

    }

    render() {
        return (
            <div className="container-fluid pt-3">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Email"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        /></div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        /></div>


                    <button type="submit">Login</button>
                </form>
                <div className="form-group pt-10">
                    <p>{this.state.apiResponse}</p>
                </div>
            </div>
        );
    }
}
