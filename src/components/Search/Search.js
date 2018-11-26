import React, {Component} from 'react';
import axios from 'axios';
import './Search.css';

export default class Search extends Component {
    constructor(){
        super();
        this.state={
            items: [],
            input: '',
            showInput: false
        }
    }

    componentDidMount(){
        axios.get('/api/items').then(res=>{
            this.setState({
                items: res.data
            })
        })
    }
    getInput(val){
        console.log(val.length)
        val.length >= 1 ?
        this.setState({
            input: val,
            showInput: true
        })
        :
        this.setState({
            showInput: false
        })
    }

    render(){
        console.log('search state',this.state.items)
        const filtered = this.state.items.filter(item=> item.title.toLowerCase().match(this.state.input.toLowerCase()))
        const showResults = filtered.map(item=>{
        return <div>{item.title}</div>});
        return(
            <div>
                <input onChange={e=> this.getInput(e.target.value)} className='searchbar' placeholder='search items' />
                <div className='searchresults'>
                {this.state.showInput && showResults}
                </div>
            </div>
        )
    }
}
