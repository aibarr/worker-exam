import React, { Component } from 'react'

import CoolWorker from '../worker/cool.worker'

class WorkerNotWorking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            iValue: '',
            theWorkingSaying: ''
        }
    }

    componentDidMount() {
        this.worker = new CoolWorker()

        this.worker.addEventListener('message', (event) => {

            this.setState({
                theWorkingSaying: event.data
            })
        })
    }

    render() {

        return (<form onSubmit={this.handleSubmit}>
            <input value={this.state.value} onChange={this.handleChange}>
            </input>
            <p>{this.state.theWorkingSaying}</p>

        </form>)
    }

    handleChange = event => {
        this.setState({
            iValue: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.worker.postMessage(this.state.iValue)
    }



}

export default WorkerNotWorking