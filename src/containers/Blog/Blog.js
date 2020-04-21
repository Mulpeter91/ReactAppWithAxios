import React, { Component } from 'react';
import axios from 'axios'; //OR for our custom axios object '../../axios.js';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

//You have 2 options for sending AJAX requests
//1) With javaScript you have the XMLHttpRequest Object
//   With that you can make your own HTTP requests to a target URL and handle the response
//   But it's cumbersome

//2) OR just use a 3rd party library. The teacher recommends Axios 
//   It can be added to any javascript project: https://github.com/axios/axios

class Blog extends Component {

    state = {
        posts: [], 
        selectedPostId: null, 
        error: false
    }

    //componentDidMoust is an appropriate lifecycle hook to wrap the data request in. 
    //this is because fetching new data doesn't change logic it may cause a side effect on your application
    componentDidMount() {
        //see axios github page for parameters
        axios.get('/posts') //<-change the url to trigger the error catch
            .then(  response => {
                const posts = response.data.slice(0, 4); //only storing 4 of the 100 fetched
                //adding an author field to the returned data
                const updatedPosts = posts.map(post => {
                    return {
                        ...post, 
                        author: 'Rob'
                    }
                });
                this.setState({posts: updatedPosts})
                //server array
                console.log(response);
                //updated array
                console.log(updatedPosts);
            })
            .catch(error => {
                this.setState({error: true});
                console.log(error);
            });
        //axios uses 'promises'. A default js object introduced in ES6
        //and axios.get returns a promise in the get method. This passed function will execute once the promise is resolved.
        //putting the setState outside the axios call won't work because it won't wait for the data to load before executing setState
    }

    postSelectedHandlder = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                key={post.id} 
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandlder(post.id)} />;
            });
        }

        return (
            <div>
                <section className="Posts">
                  {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;