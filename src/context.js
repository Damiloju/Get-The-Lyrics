import React, { Component } from 'react';
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) =>{
    switch(action.type) {
        case 'SEARCH_TRACKS':
            return{
                ...state,
                track_list: action.payload,
                heading: 'Search Result'
            };
            default:
                 return state;
    }
}


export class Provider extends Component {

    state = {
        track_list: [], 
        heading: 'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    };

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=ng&f_has_lyrics=1&apikey=f5ea45c1c8fb098deb912574e46f2c10`)
        .then(res => {
            this.setState({track_list: res.data.message.body.track_list})
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Context.Provider value = {this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;