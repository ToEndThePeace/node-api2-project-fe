import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const StyledForm = styled.form`
  padding: 20px 10%;
  max-width: 50%;
  font-family: "Open Sans", sans-serif;
  legend {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 15px;
  }
  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    label {
      width: 30%;
    }
    input:not([type="submit"]),
    textarea {
      flex-grow: 1;
      border: 1px solid black;
      padding: 5px 10px;
      border-radius: 5px;
    }
    input[type="submit"] {
      padding: 10px;
      cursor: pointer;
      font-family: "Open Sans", sans-serif;
      &:hover {
        background-color: #ddd;
      }
    }
  }
`;

class PostForm extends React.Component {
  state = {
    redirect: false,
    data: {
      title: "",
      contents: ""
    }
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.addPost(this.state.data);
    this.setState({
      redirect: true
    });
  };
  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };
  render() {
    return this.state.redirect ? (
      <Redirect to="/posts" />
    ) : (
      <StyledForm onSubmit={this.submitHandler}>
        <legend>New Post:</legend>
        <div>
          <label>Title:&nbsp;</label>
          <input
            type="text"
            name="title"
            value={this.state.data.title}
            onChange={this.inputHandler}
          />
        </div>
        <div>
          <label>Content:&nbsp;</label>
          <textarea
            name="contents"
            value={this.state.data.contents}
            onChange={this.inputHandler}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </StyledForm>
    );
  }
}

export default PostForm;
