import React, { Component } from "react";
import { convertNumbers } from "../../utils/numConverter";
import { formatNumbers } from "../../utils/numConverter";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    commentCount: {
        fontSize: "18px",
        marginLeft: theme.spacing.unit * 2.2,
        marginTop: theme.spacing.unit * 2.5,
        marginBottom: theme.spacing.unit * 1.5
    }, 
    card: {
        height: "auto",
        boxShadow: "none",
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        paddingBottom: 0
    },
    authorImage: {
        borderRadius: "50%",
        height: "45px",
        width: "45px",
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2.2
    },
    authorName: {
        fontWeight: 500,
        marginRight: theme.spacing.unit * 1.5,
        display: "inline-blcok",
        float: "left",
        fontSize: "13px"
    },
    publishedAt: {
        color:"#9E9E9E",
        display: "inline-block",
        float: "left",
        fontSize: "13px"
    },
    commentBox: {
        paddingTop: "6px",
        paddingBottom: "6px",
        height: "auto"
    },
    commentText: {
        fontSize: "15px",
        overflow:"hidden",
        textOverflow: "ellipsis",
        lineHeight: 1.5
    },
    commentStat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    likeStyle: {
        fontSize:"16px",
        color: "#9E9E9E",
        "&:hover": {
            color: "#757575"
        },
        marginRight: theme.spacing.unit * 1
    },
    likeCount: {
        fontSize: "13px",
        color: "#9E9E9E",
        marginRight: theme.spacing.unit * 2,
    }
});

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
        };
    };

    componentWillMount(){
        this.setState({
            comments: this.props.comments
        });
    };

    render(){
        const { classes } = this.props;
        const { comments } = this.props;
        const { commentCount } = this.props;
        if(!comments) {
            return(
                <div>
                    <Typography>
                        Comments Are Disabled.
                    </Typography>
                </div>
            )
        } 
        else {
            return (
                <div className={ classes.root }>
                    <div>
                        <Typography className={ classes.commentCount }>
                            { formatNumbers(commentCount) } Comments
                        </Typography>
                    </div>
                   <div>
                      {comments.map((comment, index) => {
                          const authorName = comment.snippet.topLevelComment.snippet.authorDisplayName;
                          const authorImage = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
                          const { publishedAt } = comment.snippet.topLevelComment.snippet;
                          const { likeCount } = comment.snippet.topLevelComment.snippet;
                          const { textDisplay } = comment.snippet.topLevelComment.snippet;

                          return(
                              <Card key={ index } className={ classes.card }>
                                <div>
                                    <CardMedia
                                        className={ classes.authorImage }
                                        image={ authorImage } />
                                </div>
                                <div>
                                    <CardContent>
                                        <Typography className={ classes.authorName }>
                                            { authorName } 
                                        </Typography>
                                        <Typography className={ classes.publishedAt }>
                                            <Moment fromNow>{ publishedAt }</Moment>
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.commentBox}> 
                                        <Typography className={ classes.commentText }>
                                            { textDisplay }
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.commentStat }>
                                        <ThumbUp className={ classes.likeStyle }></ThumbUp> 
                                        <Typography className={ classes.likeCount }>
                                            { convertNumbers(likeCount) }
                                        </Typography>
                                        <ThumbDown className={ classes.likeStyle }></ThumbDown>
                                    </CardContent>
                                </div>
                              </Card>
                          )
                      })}
                   </div>
                </div>
            )
        }
    };
};

export default withStyles(styles)(Comment);
