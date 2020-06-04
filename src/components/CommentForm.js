import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  legend {
    font-weight: 600;
    margin-bottom: 10px;
  }
  input {
    font-family: "Open Sans", sans-serif;
  }
  input[type="text"] {
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  input[type="submit"] {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background: #ddd;
    }
  }
`;

class CommentForm extends React.Component {
  state = {
    newComment: {
      text: ""
    }
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      newComment: {
        text: e.target.value
      }
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.addComment(this.props.postId, this.state.newComment);
    this.setState({
      newComment: {
        text: ""
      }
    });
  };

  render() {
    return (
      <StyledForm onSubmit={this.submitHandler}>
        <legend>New Comment:</legend>
        <input
          type="text"
          name="text"
          placeholder="Enter a comment..."
          value={this.state.newComment.text}
          onChange={this.changeHandler}
        />
        <br />
        <input type="submit" value="Submit" />
      </StyledForm>
    );
  }
}
export default CommentForm;
