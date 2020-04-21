import React, { Component } from 'react';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Rob'
    }

    postDataHandler = () => {

        const data = {
            title: this.state.title, 
            body: this.state.content, 
            author: this.state.author
        };
        
        //I added the example of passing configurations
        axios.post('/posts', data, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                //this can take several seconds to display
                console.log(response);
            });
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Petre">Petre</option>
                    <option value="Joe">Joe</option>
                    <option value="Michele">Michele</option>
                    <option value="Rob">Rob</option>
                    <option value="Terry">Terry</option>
                </select>
                <button onClick={this.postDataHandler}> Add Post</button>
            </div>
        );
    }
}

export default NewPost;