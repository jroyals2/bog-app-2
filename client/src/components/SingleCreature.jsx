import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom' 

class SingleCreature extends Component {
    state = {
        creature: {
            name: '',
            description: ''
        },
        toggleUpdate: false,
        redirect: false
    }


    componentWillMount(){
        this.getCreature()
    }
    handleToggle = () => {
        this.setState({toggleUpdate: !this.state.toggleUpdate})
    }
    getCreature = async () => {
        const creatureId = this.props.match.params.id
        const res = await axios.get(`/api/creatures/${creatureId}`)
        this.setState({creature: res.data})
    }
    handleChange = (event) => {
        const attribute = event.target.name
        const creature = {...this.state.creature}
        creature[attribute] = event.target.value
        this.setState({creature})
    }
    handleSubmit = async(event) => {
        event.preventDefault()
        const payload = this.state.creature
        const creatureId = this.props.match.params.id
        await axios.put(`/api/creatures/${creatureId}`, payload)
        this.setState({toggleUpdate: !this.state.toggleUpdate})
    }

    deleteCreature = async (event) => {
        const creatureId = this.props.match.params.id
        console.log(creatureId)
        
        const res = await axios.delete(`/api/creatures/${creatureId}`)
        console.log(res)
            this.setState({redirect: true})
    }


    render() {
        if (this.state.redirect){
            return <Redirect to='/'/>
        }
        const notEdit =            
             <div>
                <h1>{this.state.creature.name}</h1>
                <h3>{this.state.creature.description}</h3>
                <button onClick={this.handleToggle}>Edit</button>
                <button onClick={this.deleteCreature}>Delete</button>
            </div>
        const edit = 
            <div>
                <form >
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" onChange={this.handleChange} name="name" value={this.state.creature.name} />
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" onChange={this.handleChange} value={this.state.creature.description} />
                    </div>
                    <button onClick={this.handleSubmit}>Edit</button>
                </form>
                <button onClick={this.handleToggle}>Close Form</button>
            </div>
        return (
                <div>
                    {this.state.toggleUpdate ? edit : notEdit}
                </div>
        );
    }
}

export default SingleCreature;