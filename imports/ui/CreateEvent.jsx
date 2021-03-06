import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import ColorPicker from "./ColorPicker";

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            socialNetwork: "T",
            arrowEnabled: true
        };
        this.handleSNChange = this.handleSNChange.bind(this);
    }

    handleSNChange(e) {
        const val = e.target.value;
        this.setState({
            socialNetwork: val
        })
    }

    next() {
        this.setState({currentTab: this.state.currentTab + 1});
        //setTimeout(this.setState({arrowEnabled: true}), 500);
    }

    prev() {
        this.setState({currentTab: this.state.currentTab - 1});
    }

    handleChangeCompleteBackground = (color) => {
        this.props.colorBackground = color.hex;
    };

    handleChangeCompleteTitle = (color) => {
        this.props.colorTitle= color.hex;
    };

    handleChangeCompleteBody = (color) => {
        this.props.colorBody = color.hex;
    };

    render() {
        if (this.props.redirect) {
            return <Redirect to={{
                pathname: `/${this.props.hashtag}/tweets`
            }}/>;
        }
        return (

            <div className="create-event container-fluid">
                <div className="overlay">
                    <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <h1 className="title-home light-blue"><strong>Activity Wall</strong></h1>
                                    <p className="p-home">
                                        Follow what people are saying about your event in social media!
                                    </p>
                                    <div className="row side-pad">
                                        <div className="col-md-4 col-xs-6">
                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa fa-edit"/>
                                                </div>
                                                <div>
                                                    <p className="home-list"><strong
                                                        className="light-blue">1.</strong> Customize your wall
                                                    </p>
                                                    <p className="description">Pick your colors, logo and background
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-xs-6">
                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa fa-search"/>
                                                </div>
                                                <div>
                                                    <p className="home-list"><strong
                                                        className="light-blue">2.</strong> Define your search
                                                    </p>
                                                    <p className="description">Tell us which hashtag to look for and the
                                                        type of visualization you prefer
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-xs-6">
                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa fa-bar-chart"/>
                                                </div>
                                                <div>
                                                    <p className="home-list"><strong
                                                        className="light-blue">3.</strong> Start using your wall
                                                    </p>
                                                    <p className="description">See your users' interactions and analyse
                                                        them through diagrams and statistics!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="p-home">
                                            Get started by clicking the arrow on the right!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <h1 className="title-home">Choose your colors</h1>
                                <div className="color-pickers">
                                    <div className="row row-pickers">
                                        <div className="col-md-4">
                                            <p className="p-home">Background</p>
                                            <ColorPicker color={this.props.colorBackground}
                                                         onChangeComplete={this.handleChangeCompleteBackground.bind(this)}/>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="p-home">Body</p>
                                            <ColorPicker color={this.props.colorBody}
                                                         onChangeComplete={this.handleChangeCompleteBody.bind(this)}/>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="p-home">Titles</p>
                                            <ColorPicker color={this.props.colorTitle}
                                                         onChangeComplete={this.handleChangeCompleteTitle.bind(this)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <h1 className="title-home">Define your search</h1>
                                <div>
                                    <div className="container">
                                        <div className="row side-pad">
                                            <div className="row-pickers">
                                                <form className="form-inline" onSubmit={()=>this.props.handleOnClick(this.refs.hashtag.value)}>
                                                    <label className="hashtag" htmlFor="inlineFormInputName2"># </label>
                                                    <input type="text" className="form-control mb-2 mr-sm-2" required="required"
                                                           id="inlineFormInputName2" placeholder="BadBunnyBeibe"
                                                           ref="hashtag"/>
                                                    <button type="submit" className="btn btn-primary mb-2">Search <i
                                                        className="fa fa-search"/></button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        {this.state.currentTab !== 0 ?
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                               onClick={this.prev.bind(this)}
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a> :
                            ""}
                        {this.state.currentTab !== 2 ?
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                               onClick={this.next.bind(this)}
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a> :
                            ""}
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default CreateEvent;