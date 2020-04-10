import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            lastUpdate
            backgroundColor
            borderColor
            borderThickness
            borderRadius
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderThickness: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderThickness: $borderThickness,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderThickness, borderRadius, padding, margin, logo, submit;
        return (
            <div className="container">
                <div className="row">
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="col">
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link className="btn btn-primary" to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value,
                                                    color: color.value,
                                                    fontSize: parseInt(fontSize.value),
                                                    backgroundColor: backgroundColor.value,
                                                    borderColor: borderColor.value,
                                                    borderThickness: parseInt(borderThickness.value),
                                                    borderRadius: parseInt(borderRadius.value),
                                                    padding: parseInt(padding.value),
                                                    margin: parseInt(margin.value) } });
                                                    text.value = "";
                                                    color.value = "";
                                                    fontSize.value = "";
                                            }}>
                                                <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input onChange = {
                                            () => {
                                                logo.childNodes[0].innerHTML = text.value;
                                                if (text.value === "") {
                                                    submit.disabled = true;
                                                } else {
                                                    submit.disable = false;
                                                }
                                            }
                                        } type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" defaultValue={data.logo.text} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input onChange = {
                                            () => {logo.childNodes[0].style.color = color.value;}
                                        } type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" defaultValue={data.logo.color} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input onChange = {
                                            () => {logo.style.fontSize = fontSize.value + "px";
                                            if (fontSize.value === "") {
                                                submit.disabled = true;
                                            } else {
                                                submit.disable = false;
                                            }}
                                        } type="number" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" defaultValue = {data.logo.fontSize} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input onChange = {
                                            () => {logo.style.backgroundColor = backgroundColor.value;}
                                        } type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" defaultValue = {data.logo.backgroundColor} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input onChange = {
                                            () => {logo.style.borderColor = borderColor.value; if (text.value === "") {
                                                submit.disabled = true;
                                            } else {
                                                submit.disable = false;
                                            }}
                                        }type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" defaultValue = {data.logo.borderColor} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderThickness">Border Thickness:</label>
                                        <input onChange = {
                                            () => {logo.style.borderWidth = borderThickness.value + "px";}
                                        }type="number" className="form-control" name="borderThickness" ref={node => {
                                            borderThickness = node;
                                        }} placeholder="Border Thickness" defaultValue = {data.logo.borderThickness}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input onChange = {
                                            () => {logo.style.borderRadius = borderRadius.value + "%";}
                                        } type="number" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" defaultValue = {data.logo.borderRadius} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input onChange = {
                                            () => {logo.style.padding = padding.value + "px";}
                                        } type="number" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" defaultValue = {data.logo.padding} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input onChange = {
                                            () => {logo.style.margin = margin.value + "px";}
                                        } type="number" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" defaultValue = {data.logo.margin} />
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
                        </div>
                    );

                }}
            </Query>
            
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return ( 
                        <div className="col" style={{overflow: 'auto'}}>
                            <div ref={node => {
                            logo = node;
                        }} style= {
                                {
                                    fontSize: data.logo.fontSize,
                                    backgroundColor: data.logo.backgroundColor,
                                    borderColor: data.logo.borderColor,
                                    borderRadius: data.logo.borderRadius + "%",
                                    borderWidth: data.logo.borderThickness + "px",
                                    padding: data.logo.padding + "px",
                                    margin: data.logo.margin + "px",
                                    borderStyle: "solid",
                                    width: "max-content",
                                    height: "max-content"
                                }
                            }>
                                <pre style = {{color: data.logo.color}} id ="pretext" >{data.logo.text}</pre>
                            
                            </div>
                        </div>
                    )
                }}
            </Query>
            </div>
            </div>
        );
    }
}

export default EditLogoScreen;