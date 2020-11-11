import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: theme.spacing.unit *  5
    },
    card: {
        height: "10vw",
        marginTop: theme.spacing.unit * 3,
        marginLeft: "20%",
        marginRight: "20%",
        display: "flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems: "flex-start",
        "&:hover": {
            cursor: "pointer",
            boxShadow: "1px 2px 3px #ddd"
        },
        boxShadow: "none"
    },
    media: {
        height: "10vw",
        width: "50%",
        padding:0,
        marginRight: theme.spacing.unit * 2
    },
    cardContent: {
        paddingTop: 3,
        paddingBottom: 1,
        paddingLeft: 3
    },
    videoTitle: {
        fontWeight: 500,
        fontSize: "1.2vw"
    },
    videoInfo:{
        fontWegith: 300,
        fontSize: "0.9vw",
        color: "grey",
        paddingTop: theme.spacing.unit * 0,
    },
    dot: {
        height: "3px",
        width: "3px",
        backgroundColor: "grey",
        borderRadius: "50%",
        display: "inline-block",
        marginLeft: theme.spacing.unit * 0.5,
        marginRight: theme.spacing.unit * 0.5,
        marginBottom: theme.spacing.unit * 0.3
    }
})

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render(){
        const { classes } = this.props;
        const { searchResult } = this.props;
        const { videoClick } = this.props;
        return(
            <div className={ classes.root }>
                {searchResult.map((video, index) => {
                    const { url } = video.snippet.thumbnails.medium;
                    const { title } = video.snippet;
                    const { channelTitle } = video.snippet;
                    const { description } = video.snippet;
                    const { publishedAt } = video.snippet;
                    const { videoId } = video.id;
                    return(
                        <Card className={ classes.card } key={ index } onClick={ videoClick } id={ videoId }>
                            <CardMedia 
                                className={ classes.media }
                                image={ url }
                                title={ title }
                                />
                            <div>
                                <CardContent className={ classes.cardContent }>
                                    <Typography 
                                        className={ classes.videoTitle } 
                                        component="h1">
                                        { title }
                                    </Typography>
                                    <Typography className={ classes.videoInfo } component="h1" style={{ marginBottom: 2}}>
                                        {channelTitle} 
                                        <span classes="dot" className={ classes.dot }></span> 
                                        <Moment fromNow>{ publishedAt }</Moment>
                                    </Typography>
                                </CardContent>
                                <CardContent className={ classes.cardContent }>
                                    <Typography className={ classes.videoInfo } component="p">
                                        { description }
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    )
                })}
            </div>
        )
    }
};

export default withStyles(styles)(Search);
