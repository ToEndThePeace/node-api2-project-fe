import React from "react";
import { axios } from "../utils";
import styled from "styled-components";

import PostCard from "./PostCard";

const StyledList = styled.div`
  font-family: "Open Sans", sans-serif;
  & > h1 {
    padding: 0 10%;
  }
  & > div {
    padding: 20px 10% 40px;
    display: flex;
    flex-flow: row wrap;
  }
`;

const PostList = props => {
  const { posts, removePost, editPost } = props;
  return (
    <StyledList>
      <h1>Posts:</h1>
      <div>
        {posts &&
          posts.map((x, index) => (
            <PostCard
              key={index}
              post={x}
              removePost={removePost}
              editPost={editPost}
            />
          ))}
      </div>
    </StyledList>
  );
};

export default PostList;
