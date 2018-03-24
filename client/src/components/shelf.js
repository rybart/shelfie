import React, {Component} from 'react';
import Header from './header'
import axios from 'axios';
import {Link} from 'react-router-dom'
class Shelf extends Component{
    constructor(props){
        super(props)
        this.state ={
            bins:[],
        }
    }

    componentDidMount(){
        axios.get(`/api/bins/${this.props.match.params.shelf}`)
            .then((response)=>{
                this.setState({
                    bins: response.data
                })
            })
    }

    render(){
        const bins = this.state.bins.map((bin)=>{
            if(bin.name){
                return(
                    <Link key={bin.id} to ={`/bin/${bin.shelf}${bin.bin}`}>
                        <div className="BinButton">Bin {bin.bin}</div>
                    </Link>
                );
            }else{
                return(
                    <Link key={bin.id} to ={`/create/${bin.shelf}${bin.bin}`}>
                        <div className="BinButtonAdd">+ Add Inventory To Bin</div>
                    </Link>
                )
            }
        })
        return(
            <div>
                <Header shelf={this.props.match.params.shelf}/>
                {bins}
            </div>
        )
    }
}
export default Shelf;