import React from "react";
import styled from "styled-components";

const StyledComment = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 20px;
`;

const Comment = props => {
  const { comment } = props;
  return (
    <StyledComment>
      <p>{comment.text}</p>
    </StyledComment>
  );
};

export default Comment;
