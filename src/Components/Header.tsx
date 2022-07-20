import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useState } from "react";

const Nav = styled(motion.nav)`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  padding: 60px;
  box-sizing: border-box;
  color: white;
  background-color: black;
`;
const Col = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  width: 80px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 4px;
    stroke: white;
  }
`;
const Items = styled.ul<{ searchOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: ${(props) =>
    props.searchOpen ? "translateX(-220px)" : "translateX(0px)"};
`;
const Item = styled.li`
  position: relative;
  margin: 0 10px;
  font-size: 24px;
  color: lightgray;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
    cursor: pointer;
  }
`;
const Underbar = styled.span`
  width: 70px;
  height: 10px;
  border-radius: 5px;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
`;

const Search = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  color: white;
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 10px;
  padding-left: 40px;
  z-index: 1;
  border: 1px solid ${(props) => props.theme.white.lighter};
  color: white;
  background-color: transparent;
  font-size: 16px;
`;

const logoVariants = {
  normal: {
    fillOpacity: 0.5,
  },
  active: {
    fillOpacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const aboutMatch = useMatch("/about");
  const projectMatch = useMatch("/project");
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  return (
    <Nav>
      <Col>
        <Logo
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <motion.path d="M512 165.4c0 127.9-70.05 235.3-175.3 270.1c-20.04 7.938-41.83 12.46-64.69 12.46c-64.9 0-125.2-36.51-155.7-94.47c-54.13 49.93-68.71 107-68.96 108.1C44.72 472.6 34.87 480 24.02 480c-1.844 0-3.727-.2187-5.602-.6562c-12.89-3.098-20.84-16.08-17.75-28.96c9.598-39.5 90.47-226.4 335.3-226.4C344.8 224 352 216.8 352 208S344.8 192 336 192C228.6 192 151 226.6 96.29 267.6c.1934-10.82 1.242-21.84 3.535-33.05c13.47-65.81 66.04-119 131.4-134.2c28.33-6.562 55.68-6.013 80.93-.0054c56 13.32 118.2-7.412 149.3-61.24c5.664-9.828 20.02-9.516 24.66 .8282C502.7 76.76 512 121.9 512 165.4z" />
        </Logo>
      </Col>
      <Col>
        <Items searchOpen={searchOpen}>
          <Item>
            <Link to="/about">About Me</Link>
            {aboutMatch && <Underbar />}
          </Item>
          <Item>
            <Link to="/project">Projects</Link>
            {projectMatch && <Underbar />}
          </Item>
        </Items>
        <Search>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -210 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            width={"30px"}
            height={"50px"}
            color="#f5f5f7"
            style={{ zIndex: "2" }}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Write a search word..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
