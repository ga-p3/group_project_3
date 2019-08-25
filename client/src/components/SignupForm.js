import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            showError: false
        }
    }

    handleSubmitForm = async (event) => {
        event.preventDefault()

        const { name, email, password } = this.state
        const { handleSignup } = this.props

        this.setState({ showError: false })

        try {
            await handleSignup({ name, email, password })
        } catch (e) {
            this.setState({ showError: true })
        }
    }

    handleTextInput = (event) => {
        const fieldName = event.target.name
        const value = event.target.value

        this.setState(state => {
            return { [fieldName]: value }
        })
    }

    render() {
        const { showError } = this.state
        const { isSignedIn } = this.props

        let errorMessage

        if (showError) {
            errorMessage = (
                <div className='errorMessage'>
                    <span>
                        An error occurred, please ensure your credentials are correct
          </span>
                </div>
            )
        }

        if (isSignedIn) {
            return <Redirect to='/dashboard' />
        }

        return (
            <div>
                {errorMessage}
                <form className='signup-form' onSubmit={this.handleSubmitForm}>
                    <div>
                        <label>Name</label>
                        <input
                            type='text'
                            name='name'
                            placeholder="Jon Doe"
                            onChange={this.handleTextInput}
                            value={this.state.name}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            placeholder="No AOL emails"
                            onChange={this.handleTextInput}
                            value={this.state.email}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder="Strong Password"
                            onChange={this.handleTextInput}
                            value={this.state.password}
                        />
                    </div>

                    <button
                        className="sign-in-button"
                        id="sign-up-button">
                            Sign Up
                    </button>
                </form>
            </div>
        )
    }
}

export default SignupForm