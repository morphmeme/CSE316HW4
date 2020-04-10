import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderThickness: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,

        ) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderThickness: $borderThickness,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderThickness, borderRadius, padding, margin, logo, submit;
        let updateLogo = () => {
            logo.childNodes[0].innerHTML = text.value;
            logo.style.backgroundColor = backgroundColor.value;
            logo.childNodes[0].style.color = color.value;
            logo.style.fontSize = fontSize.value + "px";
            logo.style.borderColor = borderColor.value;
            logo.style.borderWidth = borderThickness.value + "px";
            logo.style.borderRadius = borderRadius.value + "%";
            logo.style.padding = padding.value + "px";
            logo.style.margin = margin.value + "px";
        }
        return (
            <div className="container">
                <div className="row">
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container col">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link className="btn btn-primary" to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onChange = {
                                                () => {
                                                    updateLogo();
                                                    if (text.value === "" || fontSize.value === "" || borderThickness.value === "" || borderRadius.value === "" ||
                                                    padding.value === "" || margin.value === "") {
                                                        submit.disabled = true;
                                                    } else {
                                                        submit.disabled = false;
                                                    }
                                                }
                                            }
                                    onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: {
                                            text: text.value,
                                            color: color.value,
                                            fontSize: parseInt(fontSize.value),
                                            backgroundColor: backgroundColor.value,
                                            borderColor: borderColor.value,
                                            borderThickness: parseInt(borderThickness.value),
                                            borderRadius: parseInt(borderRadius.value),
                                            padding: parseInt(padding.value),
                                            margin: parseInt(margin.value)
                                         } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderThickness.value = "";
                                    borderRadius.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input onChange = {
                                            () => {
                                                updateLogo();
                                            }
                                        } type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        } type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color"  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        } type="range" min="2" max = "111" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size"  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        } type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        }type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color"  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderThickness">Border Thickness:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        }type="range" min="0" max = "111" className="form-control" name="borderThickness" ref={node => {
                                            borderThickness = node;
                                        }} placeholder="Border Thickness"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        } type="range" min="0" max = "50" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius"  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        } type="range" min="0" max = "111" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding"  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input onChange = {
                                            () => {updateLogo()}
                                        } type="range" min="0" max = "111" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin"  />
                                    </div>
                                    <button ref = {node => {submit = node}} type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>{error.message}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
         
                
            <div className="col" style={{overflow: 'auto'}}>
                <div ref={node => {
                logo = node;
            }} style= {
                    {
                        backgroundColor: "#000000",
                        borderColor: "#000000",
                        borderStyle: "solid",
                        width: "max-content",
                        height: "max-content"
                    }
                }>
                    <pre style = {{color: "#000000"}}id ="pretext" ></pre>
                
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default CreateLogoScreen;