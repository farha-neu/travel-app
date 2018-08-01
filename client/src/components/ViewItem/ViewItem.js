import React from "react";
import "./ViewItem.css";
import axios from "axios";
import RequestButton from "./RequestButton";
import {Link} from "react-router-dom";

class ViewItem extends React.Component{

    state = {
        item: {},
        category:{},
        user:{}
    };
    
    componentDidMount() {
        axios.get(`/item/${this.props.match.params.id}`).then((response) => {
          this.setState({
            item: response.data,
            category:response.data.category,
            user:response.data.user
          });
          console.log(this.state.item.requestedBy);
        });
    }

    requestItem(){

    }

    render(){
        return(
            <div>
             <center>
                <h1 className="viewItem">ViEW <span className="an">AN </span>iTEM</h1>
                
                <img src={this.state.item.img} alt="name"/>
                Item Id: {this.state.item._id}<br/>
                Name: {this.state.item.name}<br/>
                Description: {this.state.item.description}<br/>
                Condition: {this.state.item.condition}<br/>
                Note: {this.state.item.note}<br/>
                Category: {this.state.category.name}<br/>
                Date Posted: {this.state.item.dateCreated}<br/>
                
                {/* if session id matches item creator id..dont show request button */}
                {this.props.user._id === this.state.user._id?"":
                this.state.item.status==="Nil" || this.state.item.status==="Declined"?
                 <RequestButton item={this.state.item} user={this.props.user}/>:
                <button className="disabled">Not Available</button>
                }
                <br/>

                 Contact Details:<br/>
                
                
               {this.state.user._id === this.props.user._id?
                <Link to= {`/profile/${this.state.user._id}`}>My Profile</Link>:
                <Link to ={`/profile/${this.state.user._id}`}>View Doner Profile</Link>}
            

                <footer id="footer">
                        <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
                </footer>
             </center>
           </div>
        )
    }
}
   


export default ViewItem;