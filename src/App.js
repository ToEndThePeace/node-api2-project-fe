import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import PostList from "./components/PostList";
import { axios } from "./utils";
import Header from "./components/Header";
import PostForm from "./components/PostForm";
import PostThread from "./components/PostThread";

const StyledApp = styled.div``;

export default class App extends React.Component {
  state = {
    idLoading: true,
    posts: null
  };
  componentDidMount() {
    axios()
      .get("/api/posts")
      .then(res => {
        console.log(res);
        this.setState({
          posts: res.data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  removePost = id => {
    axios()
      .delete(`/api/posts/${id}`)
      .then(res => {
        if (res !== 0) {
          this.setState({
            posts: this.state.posts.filter(x => x.id !== id)
          });
        } else {
          // Post wasn't deleted
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  editPost = (id, changes) => {
    axios()
      .put(`/api/posts/${id}`, changes)
      .then(res => {
        console.log(res);
        this.setState({
          posts: [...this.state.posts.filter(x => x.id !== id), res.data[0]]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  addPost = post => {
    axios()
      .post("/api/posts", post)
      .then(res => {
        console.log(res);
        this.setState({
          posts: [...this.state.posts, res.data[0]]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <StyledApp className="App">
        <Header />
        {this.state.isLoading || !this.state.posts ? (
          <h2>Loading posts...</h2>
        ) : (
          <Switch>
            <Route
              exact
              path="/posts"
              render={() => {
                return (
                  <PostList
                    posts={this.state.posts}
                    removePost={this.removePost}
                    editPost={this.editPost}
                  />
                );
              }}
            />
            <Route
              path="/posts/new"
              render={() => {
                return <PostForm addPost={this.addPost} />;
              }}
            />
            <Route
              path="/posts/:id"
              render={props => {
                return <PostThread posts={this.state.posts} />;
              }}
            />
          </Switch>
        )}
      </StyledApp>
    );
  }
}
