import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    //This is the correct lifecycle method because we want to receive new data whenever the props change, in this case it's ID
    componentDidUpdate () {
        if(this.props.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){ //this conditions stops the infinite loop
                axios.get('/posts/' + this.props.id)
                .then(response => {
                    //having set state in componentDidUpdate with no conditions will cause an infinite loop
                    this.setState({loadedPost: response.data});
                    console.log(response);
                });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response)
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost){ //this check is to stop the page rendering BEFORE axios has returned the data
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
  
        return post;
    }
}

export default FullPost;