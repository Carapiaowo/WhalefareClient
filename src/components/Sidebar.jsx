import React, { useState, useContext } from "react";
import { AuthContext } from '../Auth/AuthContext';

//All the svg files

import Home from "../images/padlock.png";
import Team from "../images/credit-card.png";
import Calender from "../images/bloc-de-notas.png";
import PowerOff from "../images/power-off-solid.svg";
import Profilee from  "../images/blue-whale.png";
import styled from "styled-components";

import { NavLink, Link } from "react-router-dom";



const Container = styled.div`
  position: fixed;
  .active {
    border-right: 4px solid var(--white);
    z-index:10000;
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color:#7ea7c8;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: "";
    background-color: white;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color:#4682B4;
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index:10000;
`;

const Logo = styled.div`
  width: 2rem;
  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: #f4f6fb;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #4682B4;
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
  z-index: 1000;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "3rem")};
  height: 3rem;
  padding: 0.8rem 1rem;
  /* border: 2px solid var(--white); */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9rem" : "0")};
  background-color:#6c96b9;
  color: white ;
  transition: all 0.3s ease;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    display: inline-block;
  }
  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(20%) saturate(657%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [modalLogout, setLogout] = useState(false)
  const setModalLogout = () => {
    setLogout(!modalLogout)
}

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);
  const { setIsLogged, isLogged } = useContext(AuthContext);
  return (
    
    <Container>
      {
         isLogged.isAuth !== true ?
         <div>
         <Button clicked={click} onClick={() => handleClick()}>
        
        </Button>
        <SidebarContainer>
          <Logo>
       
          </Logo>
          <SlickBar clicked={click}>
            <Item
              onClick={() => setClick(false)}
              exact
              activeClassName="active"
              to="/home"
            >
           <img src={Home} alt="Home" />
              <Text clicked={click}>Contraseñas</Text>
            </Item>
            <Item
              onClick={() => setClick(false)}
              activeClassName="active"
              to="/homet"
            >
              <img src={Team} alt="Team" />
              <Text clicked={click}>Tarjetas</Text>
            </Item>
            <Item
              onClick={() => setClick(false)}
              activeClassName="active"
              to="/homen"
            >
              <img src={Calender} alt="Calender" />
              <Text clicked={click}>Notas</Text>
            </Item>
            
          </SlickBar>
  
          <Profile clicked={profileClick}>
            <img
              onClick={() => handleProfileClick()}
              src={Profilee}
              alt="Profile"
            />
            <Details clicked={profileClick}>
              <Name>
                <h4>Usuario&nbsp;</h4>
                <a href="/profile">Ver&nbsp;perfil</a>
              </Name>
  
              <Logout >
                <button  onClick={() => { setModalLogout() }}>
                <img src={PowerOff} alt="logout" />
                </button>
              </Logout>
            </Details>
          </Profile>
        </SidebarContainer>
            </div>

            
         :
         <div>
         <Button clicked={click} onClick={() => handleClick()}>
        
        </Button>
        <SidebarContainer>
          <Logo>
       
          </Logo>
          <SlickBar clicked={click}>
            <Item
              onClick={() => setClick(false)}
              exact
              activeClassName="active"
              to="/"
            >
             <Link to='/homet'> <img src={Home} alt="Home" /></Link>
              <Text clicked={click}>Contraseñas</Text>
            </Item>
            <Item
              onClick={() => setClick(false)}
              activeClassName="active"
              to="/homet"
            >
              <img src={Team} alt="Team" />
              <Text clicked={click}>Tarjetas</Text>
            </Item>
            <Item
              onClick={() => setClick(false)}
              activeClassName="active"
              to="/homen"
            >
              <img src={Calender} alt="Calender" />
              <Text clicked={click}>Notas</Text>
            </Item>
            
          </SlickBar>
  
          <Profile clicked={profileClick}>
            <img
              onClick={() => handleProfileClick()}
              src={Profilee}
              alt="Profile"
            />
            <Details clicked={profileClick}>
              <Name>
                <h4>Usuario&nbsp;</h4>
                <a href="/profile">Ver&nbsp;perfil</a>
              </Name>
  
              <Logout >
                <img src={PowerOff} alt="logout" />
              </Logout>
            </Details>
          </Profile>
        </SidebarContainer>
            </div>
      }
      
    </Container>
  );
};

export default Sidebar;
