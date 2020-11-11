import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";

const styles = theme => ({
    root: {
        marginTop: "5px"
    },
    card: {
        boxShadow: "none",
        marginBottom: "5px",
        marginLeft: "5px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: "100px",
        "&:hover": {
            cursor: "pointer",
            boxShadow: "1px 2px 3px #ddd"
        }
    },
    image: {
        height: "100px",
        width: "180px"
    },
    main: {
        paddingLeft: theme.spacing.unit * 0.5,
        paddingTop: 0,
        paddingBottom: 0,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    info:{
        paddingLeft: theme.spacing.unit * 0.5,
        paddingTop: 0,
        paddingBottom: 0,
    },
    title: {
        width: "200px",
        height: "auto",
        whiteSpace: "normal",
        fontWeight: 500,
        fontSize: "14px",
    },
    channelTitle:{
        fontSize: "13px",
        color: "#757575",
        letterSpacing: "0.5px"
    },
    viewCount:{
        fontSize: "13px",
        color: "#757575"
    }
});

class VideoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoList: ""
        }
    };
    componentWillMount(){
      this.setState({
        videoList: this.props.videoList
      });
    };
    render(){
        const { videoList } = this.props;
        const { classes } = this.props;
        const { videoClick } = this.props;
        if(!videoList) {
            return(
                   <div>
                       <Typography>
                            No Video in this category are available.
                        </Typography>
                   </div>
            )
        }
        else {
            return(
                <div className={ classes.root }>
                    {videoList.map((video, index) => {
                        const { title } = video.snippet;
                        const { publishedAt } = video.snippet;
                        const { channelTitle } = video.snippet; 
                        const { url } = video.snippet.thumbnails.medium;
                        const { videoId } = video.id;
                        return(
                            <Card 
                                key={ index } 
                                className={ classes.card } 
                                id={ videoId }
                                onClick={ videoClick }>
                                <CardMedia
                                    className={ classes.image }
                                    image={ url }/>
                                <div>
                                    <CardContent className={ classes.main } >
                                        <Typography className={ classes.title }>
                                            { title }
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.main }>
                                        <Typography className={ classes.channelTitle }>
                                            { channelTitle }
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.main }>
                                        <Typography className={ classes.viewCount }>
                                            <Moment fromNow>{ publishedAt }</Moment>
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
};

export default withStyles(styles)(VideoList);