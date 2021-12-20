import React from "react";

const title = 'React'

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

const Search = () => {
    const [searchTerm, updatedSearchTerm] = React.useState("");
    
    const handleChange = event =>
        updatedSearchTerm(event.target.value)
        
    return (
            <div>
                <label htmlFor="search">Search: </label>
                <input id="search" type="text" onChange={handleChange}/>
                
                <p>Searching: <strong>{searchTerm}</strong></p>
            </div>
            );
}

const App = () => {
    const greeting = {
        greeting : "Hey",
        title : "React"
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
    
    return (
            <div>
            <h1>{greeting.greeting} {title}</h1>
            
            <Search />
            
            <hr />
            
            <List list={stories}/>
            
            </div>
            );
}

export default App;
