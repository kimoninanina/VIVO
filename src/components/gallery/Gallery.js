import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { convertNumbers } from "../../utils/numConverter";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LinearProgress from "@material-ui/core/LinearProgress";
import Moment from "react-moment";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        overflow: "scroll"
    },
    card : {
        width: 260,
        height: 230,
        marginTop: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 2,
        "&:hover": {
            cursor: "pointer"
        }
    },
    progress: {
        marginTop: theme.spacing.unit * 0.5
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
    },
    videoTitle: {
        paddingTop: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 0.5, 
        paddingBottom: 0,
        height: theme.spacing.unit * 3,
    },
    title: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap", 
        overflow:"hidden",
        fontWeight: 500,
        fontSize: "1rem"
    },
    channelInfo: {
        marginTop: 0,
        paddingTop: theme.spacing.unit * 0.5,
        paddingLeft: theme.spacing.unit * 0.5,
    },
    channelTitle: {
        fontWeight: 400,
        color: "grey"
    },
    dot: {
        height: "3px",
        width: "3px",
        backgroundColor: "grey",
        borderRadius: "50%",
        display: "inline-block",
        marginLeft: theme.spacing.unit * 0.3,
        marginRight: theme.spacing.unit * 0.3,
        marginBottom: theme.spacing.unit * 0.3
    }
});

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };
    render() {
        const { classes } = this.props;
        const { videos } = this.props;
        const { videoClick } = this.props;
        const { scroll } = this.props;
        const { ref } = this.props;
        if (!videos) {
            return (
                <LinearProgress className={ classes.progress } color="secondary"/>
            )
        } else if (videos) {
            return (
                <div className={ classes.root } id="Gallery" onScroll={ scroll } style={{height: "720px"}}>
                    {videos.map((video, index) => {
                        const { url } = video.snippet.thumbnails.medium;
                        const { title } = video.snippet;
                        const { channelTitle } = video.snippet;
                        const  viewCount  = convertNumbers(video.statistics.viewCount);
                        const { publishedAt } = video.snippet;
                        const { id } = video;
                        return(
                            <Card 
                                className={ classes.card } 
                                key={ index }
                                id={ id } 
                                onClick={ videoClick }>
                                <CardMedia 
                                    className={ classes.media }
                                    image={ url } 
                                    title={ title }/>
                                <CardContent className={ classes.videoTitle }>
                                    <Typography component="h3" className={ classes.title } id={ id }> 
                                        { title }
                                    </Typography>
                                </CardContent>
                                <CardContent className={ classes.channelInfo } >
                                    <Typography component="h4" className={ classes.channelTitle }> 
                                        { channelTitle } <br/>
                                        { viewCount } views 
                                        <span classes="dot" className={ classes.dot }></span> 
                                        <Moment fromNow>{ publishedAt }</Moment>
                                    </Typography>
                                </CardContent>
                            </Card> 
                        )      
                    })}
                </div>
                
            )
        }
    };
};

export default withStyles(styles)(Gallery);