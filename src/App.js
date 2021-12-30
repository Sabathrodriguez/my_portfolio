import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import React from "react";
import { gsap } from "gsap";
import './App.scss';
import About from "./About"

const title = 'React'

const { useRef, useState, useEffect, createRef } = React

//menu component
const Menu = ({items}) => {
  const $root = useRef()
  const $indicator1 = useRef()
  const $indicator2 = useRef()
  const $items = useRef(items.map(createRef))
  const [ active, setActive ] = useState(0)
  
  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect()
    const activeItem = $items.current[active].current
    const { width, height, top, left } = activeItem.getBoundingClientRect()
    
    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: 'elastic.out(.7, .7)',
      duration: .8
    }
    
    gsap.to($indicator1.current, {
      ...settings,
    })
    
    gsap.to($indicator2.current, {
      ...settings,
      duration: 1
    })
  }
  
  useEffect(() => {
    animate()
    window.addEventListener('resize', animate)
    
    return (() => {
      window.removeEventListener('resize', animate)
    })
  }, [active])
  
  return (
    <Router>
          <div
            ref={$root}
            className="menu"
          >
              <ul>
                  {items.map((item, index) => (
                    <li id="items">
                      <Link 
                        to={item.href}
                        key={item.name}
                        ref={$items.current[index]}
                        className={`item ${active === index ? 'active' : ''}`}
                        onMouseEnter={() => {
                          setActive(index)
                        }}>{item.name}</Link>
                        {/* <a
                          key={item.name}
                          ref={$items.current[index]}
                          className={`item ${active === index ? 'active' : ''}`}
                          onMouseEnter={() => {
                            setActive(index)
                          }}
                          href={item.href}
                        >
                          {item.name}
                        </a> */}
                    </li>
                  ))}
              </ul>
              <div
                ref={$indicator1}
                className="indicator"
              />
              <div
                ref={$indicator2}
                className="indicator"
              />
          </div>
    </Router>
  )
}

//Display items in list component
const List = props =>
     props.list.map(item =>
         (
            <div key={item.objectID}>
                <span>
                <a href={item.url}>{item.title}<span>&#44;</span></a>
                </span>
                <span>{item.author}<span>&#44;</span></span>
                <span>{item.num_comments}<span>&#44;</span></span>
                <span>{item.points}</span>
            </div>
            ));

const items = [  {
    name: "Projects",
    color: "#f44336",
    href: "/projects"
    },
    {
    name: "About",
    color: "#e91e63",
    href: "/about"
    },
    {
    name: "Github",
    color: "#9c27b0",
    href: "/github"
    },
    {
    name: "LinkedIn",
    color: "#7FFFD4",
    href: "/linked_in"
    },
    {
      name: "Contact",
      color: "#03AE60",
      href: "/contact"
      }
];

//Search component
const Search = props => {
    
    const handleChange = event => {
        props.onSearch(event);
    }
        
    return (
            <div>
                <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={props.onSearch} value={props.search}/>
            </div>
            );
}

//Main App component
const App = () => {
    const header = {
        title : "Sabaths Portfolio"
    }
    
    const stories = [{
        title : "react",
        url : "https://reactjs.org/",
        author : "Jordan Walke",
        num_comments : 3,
        points : 4,
        objectID : 0
    }, {
        title : "redux",
        url : "https://redux.js.org/",
        author : "Dan Abramov, Andrew Clark",
        num_comments : 2,
        points : 5,
        objectID : 1
    }];
    
    const [searchTerm, updatedSearchTerm] = React.useState("");
    
    const searchStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleSearch = event =>
        updatedSearchTerm(event.target.value)
    
    return (
            <div className="App">
                <h1>{header.title}</h1>
                <Menu items={items}/>
                
                <Search search={searchTerm} onSearch={handleSearch}/>
                
                <hr />

                <About />
                
                {/* <List list={searchStories}/>  */}
            
            </div>
            );
}

export default App;
