import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledHeader = styled.header`
  font-family: "Open Sans", sans-serif;
  padding: 20px 10%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 3rem;
  }
  nav {
    margin: 10px 0;
    a {
      color: black;
      text-decoration: none;
      padding: 5px 10px;
      font-size: 1.2rem;
      font-weight: 300;
      &:hover {
        text-shadow: 0 0 2px grey;
        text-decoration: underline;
      }
    }
  }
  .rule {
    border-bottom: 1px solid black;
    width: 100%;
  }
`;

const Header = props => {
  return (
    <StyledHeader>
      <h1>Social Ninja</h1>
      <nav>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/posts/new">New Post</NavLink>
      </nav>
      <span className="rule" />
    </StyledHeader>
  );
};

export default Header;
