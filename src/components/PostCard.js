import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const StyledCard = styled.div`
  width: 32.3333%;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid black;
  margin-right: 1%;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  div {
    h1 {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    p {
      margin-bottom: 20px;
    }
  }
  button {
    padding: 10px;
    font-family: "Open Sans", sans-serif;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
  }
  form {
    legend {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 15px;
    }
    div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      label {
        width: 30%;
        font-family: "Open Sans", sans-serif;
        min-width: auto;
      }
      input {
        flex-grow: 1;
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px 10px;
        font-family: "Open Sans", sans-serif;
      }
    }
    & > input[type="submit"],
    & > button {
      padding: 10px;
      font-family: "Open Sans", sans-serif;
      margin-right: 5px;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }
  }
`;

class PostCard extends React.Component {
  // const { post, removePost, editPost } = props;
  state = {
    redirect: false,
    post: this.props.post,
    isEditing: false,
    newData: {
      title: "",
      contents: ""
    }
  };
  componentDidMount() {
    this.setState({
      newData: this.state.post
    });
  }
  componentDidUpdate(prevState, prevProps) {
    if (
      prevProps.post.title !== this.props.post.title ||
      prevProps.post.contents !== this.props.post.contents
    ) {
      this.setState({
        post: this.props.post,
        isEditing: false
      });
    }
  }
  deleteHandler = e => {
    e.preventDefault();
    this.props.removePost(this.state.post.id);
  };
  inputHandler = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      newData: {
        ...this.state.newData,
        [name]: value
      }
    });
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.editPost(this.state.post.id, this.state.newData);
  };
  openHandler = e => {
    e.preventDefault();
    this.setState({
      redirect: true
    });
  };
  toggleEditing = e => {
    e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  };
  render() {
    return (
      <StyledCard>
        {this.state.redirect && (
          <Redirect to={`/posts/${this.state.post.id}`} />
        )}
        {this.state.isEditing ? (
          <>
            <form onSubmit={this.submitHandler}>
              <legend>Edit Post:</legend>
              <div>
                <label>Title:&nbsp;</label>
                <input
                  type="text"
                  name="title"
                  value={this.state.newData.title}
                  onChange={this.inputHandler}
                />
              </div>
              <div>
                <label>Contents:&nbsp;</label>
                <input
                  type="text"
                  name="contents"
                  value={this.state.newData.contents}
                  onChange={this.inputHandler}
                />
              </div>
              <input type="submit" value="Update" />
              <button onClick={this.toggleEditing}>Cancel</button>
            </form>
          </>
        ) : (
          <>
            <div>
              <h1>{this.state.post.title}</h1>
              <p>{this.state.post.contents}</p>
            </div>
            <p>
              <button onClick={this.deleteHandler}>Delete Post</button>
              <button onClick={this.toggleEditing}>Edit Post</button>
              <button onClick={this.openHandler}>Open Thread</button>
            </p>
          </>
        )}
      </StyledCard>
    );
  }
}

export default PostCard;
