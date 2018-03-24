import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png'

class Header extends Component{
    render(){
        if(this.props.bin){
            return(
                <div className="FullHeader">
                    <Link className="Home" to={`/`}>
                        <img src={logo} alt=""/>
                    </Link>
                    <Link className="Shelf" to={`/bins/${this.props.bin.params.shelf}`}>
                    <div >
                        {`Shelf ${this.props.bin.params.shelf.toUpperCase()}`}
                    </div>
                    </Link>
                    <div className="bin">
                        {this.props.isAdd ? `Bin ${this.props.bin.params.bin}`: `Add to Bin ${this.props.bin.params.bin}` }
                    </div>
                </div>
            )
        }
        else if(this.props.shelf){
            return(
                <div className="Header">
                    <Link to="/">
                        <img src={logo} alt=""/>
                    </Link>
                    <div>
                        {`Shelf ${this.props.shelf}`}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="HeaderHome">
                    <div className="image-container">
                     <img src={logo} alt=""/>
                     <p>SHELFIE</p>
                    </div>
                </div>
            )  
        }
    }
}
export default Header;