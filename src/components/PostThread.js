import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { axios } from "../utils";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const StyledThread = styled.div`
  padding: 0px 10% 30px;
  font-family: "Open Sans", sans-serif;
  & > h2 {
    font-size: 2rem;
    margin-bottom: 15px;
    width: 100%;
  }
  & > p {
    margin-bottom: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
  }
  & > div {
    padding: 20px;
  }
`;

const PostThread = props => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  // componentDidMount() {
  //   axios().get(`/api/posts/${this.props.match.params.id}`);
  // }
  useEffect(() => {
    setPost(props.posts.filter(x => x.id == id)[0]);
    axios()
      .get(`/api/posts/${id}/comments`)
      .then(res => {
        console.log(res);
        setComments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const addComment = (id, comment) => {
    axios()
      .post(`/api/posts/${id}/comments`, comment)
      .then(res => {
        console.log(res);
        setComments([...comments, res.data[0]]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <StyledThread>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
          <h3>Comments:</h3>
          <div>
            {comments.map(x => {
              return <Comment key={x.id} comment={x} />;
            })}
          </div>
          <CommentForm addComment={addComment} postId={post.id} />
        </>
      )}
    </StyledThread>
  );
};

export default PostThread;
