import React, { Component } from "react";
import VideoList from "../videolist/VideoList";
import Comment from "../comment/Comment";
import { convertNumbers } from "../../utils/numConverter";
import { formatNumbers } from "../../utils/numConverter";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

const styles = theme => ({
    root: {
        overflow: "scroll",
    },
    progress: {
        marginTop: theme.spacing.unit * 0.8
    },
    media: {
        width: "100%",
        height: " 40vw",
    },
    videoInfo: {
        marginTop: "-16px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    videoTitle: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        fontWeight: 500,
        fontSize: "20px"
    },
    viewStyle: {
        fontSize: "16px",
        color: "grey",
    },
    videoStats: {
        marginRight: theme.spacing.unit * 6,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    statBar: {
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 1.5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconStyle:{
        fontSize: "17px",
        color:"#9E9E9E",
        display: "inline-block",
        marginRight: theme.spacing.unit * 1.2,
        "&:hover": {
            color: "#757575"
        }
    },
    likeStyle: {
        color: "#9E9E9E",
        fontSize: "14px"
    }
});

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            video: "",
        }
    };

    componentWillMount(){
        this.setState({
            video: this.props.video
        })
    };

    render(){
        const { classes } = this.props;
        const { videoClick } = this.props;
        const { scroll } = this.props;
        if(!this.state.video) {
            return(
                <LinearProgress className={ classes.progress } color="secondary"/>
            )
        } 
        else if(this.state.video) {
            const { id } = this.props.video[0];
            const url = "https://www.youtube.com/embed/" + this.props.videoId;
            const { title } = this.props.video[0].snippet;
            const { viewCount } = this.props.video[0].statistics;
            const { likeCount } = this.props.video[0].statistics;
            const { dislikeCount } = this.props.video[0].statistics;
            const { commentCount } = this.props.video[0].statistics;
            const { comments } = this.props;
            const { videoList } = this.props;
            return(
                <div className={ classes.root } id="VideoPlayer" onScroll={ scroll } style={{ height: "720px"}}>
                    <div>
                        <iframe 
                            className={ classes.media }
                            src={ url } 
                            allow="autoplay; encrypted-media" 
                            frameBorder="0"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <Grid container style={{ flexFlow: "wrap-reverse"}}>
                        <Grid item xs={ 12 } sm={ 8 }>
                            <Typography className={ classes.videoTitle }>
                                { title }
                             </Typography>
                             <div className={ classes.videoInfo }>
                                <CardContent>
                                    <Typography className={ classes.viewStyle }>
                                        { formatNumbers(viewCount) } views
                                    </Typography>
                                 </CardContent>
                                <CardContent className={ classes.videoStats }>
                                    <div className={ classes.statBar }>
                                        <ThumbUp className={ classes.iconStyle }/>
                                        <Typography className={ classes.likeStyle }>
                                             { convertNumbers(likeCount) }
                                        </Typography>
                                    </div>
                                    <div className={ classes.statBar }>
                                        <ThumbDown className={ classes.iconStyle }/>    
                                        <Typography className={ classes.likeStyle }>
                                             { convertNumbers(dislikeCount) }
                                        </Typography>
                                    </div>
                                </CardContent>
                            </div>
                            <hr color="#EEEEEE" style={{ marginLeft: 23, marginTop: -5, marginRight: 60, borderBottomWidth: 0.1 }}/>
                            <div>
                                <Comment videoId={ id } comments={ comments } commentCount={ commentCount }/>
                             </div>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 4 }>
                            <VideoList videoList={ videoList } videoClick={ videoClick }/>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
};

export default withStyles(styles)(VideoPlayer);