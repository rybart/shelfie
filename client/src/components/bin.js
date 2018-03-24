import React, {Component} from 'react';
import Header from './header';
import axios from 'axios';
class Bin extends Component{
    constructor(props){
        super(props)
        this.state ={
            isEdit: false,
            name: '',
            price: 0,
            image:"",
            buttonText: '+ Add To Inventory',
        }
        this.handleChange =  this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/bin/${this.props.match.params.shelf}${this.props.match.params.bin}`)
            .then((bin)=>{
                bin.data.isEdit = bin.data.name ? true : false;
                bin.data.buttonText =  bin.data.name ? "Edit" : '+ Add To Inventory';
                bin.data.price = bin.data.price ? bin.data.price : "";
                bin.data.name = bin.data.name ? bin.data.name : "";
                this.setState(bin.data)
            })
    }

    handleDelete(){
        axios.delete(`/api/bin/${this.state.id}`)
            .then((res)=>{
                this.props.history.goBack();
            })
    }


    handleSave(){
        if(this.state.buttonText === "Edit"){
            this.setState({
                buttonText: 'Save'
            })
        }else{
            axios.put(`/api/bin/${this.state.id}`,{
                name: this.state.name,
                price: this.state.price,
            })
            .then((bin)=>{
                if(!this.state.isEdit){
                   this.props.history.goBack() 
                }else{
                    bin.data.isEdit = this.state.isEdit;
                    bin.data.buttonText = "Edit" 
                    this.setState(bin.data)
                }
            })
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        let input;
        if(this.state.isEdit){
            input = (
                <div className="binContainer">
                    <img src={this.state.image} alt=""/>
                    <div>
                        <label>Name</label>
                        <input onChange={this.handleChange} name="name" type="text" value={this.state.name}/>
                        <label>Price</label>
                        <input  onChange={this.handleChange} name="price" type="text" value={this.state.price}/>
                        <button onClick={this.handleSave}>{this.state.buttonText}</button>
                        <button onClick={this.handleDelete}>Delete</button>
                    </div>

                </div>
            )
        }else{
                input =  (
                    <div className="binContainer">
                    <div>
                        <label>Name</label>
                        <input  onChange={this.handleChange} name="name" type="text" value={this.state.name}/>
                        <label>Price</label>
                        <input  onChange={this.handleChange} name="price" type="text" value={this.state.price}/>
                        <button onClick={this.handleSave}>{this.state.buttonText}</button>
                    </div>
                   
                    
                </div>
                )
            }
        return(
            <div>
                <Header isAdd={this.state.isEdit} bin={this.props.match}/>   
                {input}
            </div>
        )
    }
}
export default Bin;