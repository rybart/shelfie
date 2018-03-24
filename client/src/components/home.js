import React, {Component} from 'react';
import Header from './header';
import {Link} from 'react-router-dom';

class Home extends Component{
    render(){
        const shelfArr = ['A', 'B', 'C', 'D'];
        const shelves = shelfArr.map((shelf, i)=>{
            return (
                <div key={i}>
                <Link  to={`/bins/${shelf}`}>
                    <div className="shelfButton" >
                        {`Shelf ${shelf}`}
                    </div>
                </Link>
                </div>
            )
        })
        return(
            <div>
            <Header/>
                {shelves}
            </div>
        )
    }
}
export default Home;