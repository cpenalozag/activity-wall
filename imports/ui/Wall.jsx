import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import {StreamUsers} from "../api/streamUsers.js";
import {TweetsAgg} from "../api/tweetsAggregated.js";
import BarChart from "./BarChart.jsx";


class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    renderTweets() {
        return this.props.tweets.map((tweet) => {
            return (
                <Tweet key={tweet._id} tweet={tweet}/>
            )
        });
    }

    renderBarChart() {
        return (<BarChart data={this.props.users}/>)
    }

    render() {
        console.log(this.props);
        return (
            <div className="wall-background" style={{"backgroundColor": this.props.background}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" id = "activeUsers">
                            <h1 style={{"color": this.props.title}}> Top 5 Active Users </h1>
                            {this.renderBarChart()}
                        </div>
                        <div className="col-md-8 ">
                            <div className="row">

                                {this.renderTweets()}

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

//export default Wall;
export default withTracker((props) => {
    const hashtag = props.location.state.hashtag;
    const background = props.location.state.background;
    const title = props.location.state.title;
    const body = props.location.state.body;
    Meteor.subscribe('Tweets', hashtag);
    Meteor.subscribe('StreamUser', hashtag);
    Meteor.subscribe('MostRts', hashtag);
    return {
        tweets: Tweets.find({}, {sort: {date: -1}, limit: 30}).fetch(),
        users: StreamUsers.find({},{sort:{count:-1}, limit:5}).fetch(),
        rts: TweetsAgg.find({}).fetch(),
        background: background,
        title: title,
        body: body
    };
})(Wall);

class Tweet extends Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="tweet">
                    <div className="tweet--user">
                        <img className="tweet--user-avatar" src={this.props.tweet.avatar}
                             alt={`${this.props.screenname} profile picture`}/>
                        <div
                            className="tweet--user-name">{this.props.tweet.author}<span>{`@${this.props.tweet.screenname}`}</span>
                        </div>
                    </div>
                    <p className="tweet--body">{this.props.tweet.body}</p>
                    <div className="tweet--time">{this.props.tweet.date}</div>
                </div>
            </div>
        );
    }
}