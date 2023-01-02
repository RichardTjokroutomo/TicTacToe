import React from "react";
import "./Tile.css"

class Tile extends React.Component{
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    static defaultProps = {buttonState: ""}  // either X, O, or empty

    clickHandler(){
        this.props.playerClick();
    }

    render(){
        return(
          
                <td className= "Tile"onClick={this.clickHandler}>{this.props.buttonState}</td>
        );
    }
}

export default Tile;