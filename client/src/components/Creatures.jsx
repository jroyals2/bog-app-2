import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import NewForm from './NewForm'

class Creatures extends Component {
    state = {
        creatures: [],
        toggleNew: false
    }

    componentWillMount(){
        this.getCreatures()
    }

    getCreatures = async () => {
        const res = await axios.get('/api/creatures')
        this.setState({creatures: res.data})
    }
    handleToggle = () => {
        this.setState({toggleNew: !this.state.toggleNew})
    }

    render() {
        return (
            <div>
                {this.state.creatures.map((creature) => {
                    return (
                        <div>
                        <Link to={`/${creature._id}`}>{creature.name}</Link>
                        </div>
                    )
                })}
                {this.state.toggleNew ? <NewForm 
                getCreatures={this.getCreatures}/> : '' }
                {this.state.toggleNew ? <button onClick={this.handleToggle}>Close Form</button>  : <button onClick={this.handleToggle}>Add New</button> }
            </div>
        );
    }
}

export default Creatures;