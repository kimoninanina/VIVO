import React, { Component, Fragment } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { YOUTUBE_API_KEY } from "./config/secret";
import { fetchYoutube, getMostPopularVideos, getVideoInfo, fetchVideoComment, getRelatedVideo} from "./utils/ytUtil";
import Navbar from "./components/navbar/Navbar";
import Gallery from "./components/gallery/Gallery";
import Search from "./components/search/search";
import VideoPlayer from "./components/videoplayer/VideoPlayer";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff6f60",
      main: "#e53935",
      dark: "#ab000d",
      contrastText: "#fafafa",
    },
    secondary: {
      light: "#ffffff",
      main: "#fbe9e7",
      dark: "#c8b7b5",
      contrastText: "#fafafa",
    }
  },
  typography: {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
  }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: "",
            commentNextPage: "",
            galleryNextPage: "",
            searhResult: "",
            searchClick: null,
            searchInput:"",
            videoClick: null,
            videoId: "",
            video: "",
            videos: "",
            videoList: "",
        }; 
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
        this.handleGalleryScroll = this.handleGalleryScroll.bind(this);
        this.handlePlayerScroll = this.handlePlayerScroll.bind(this);
    };
    componentWillMount(){
        getMostPopularVideos().then(res => {
            this.setState({
                videos: res.items,
                galleryNextPage: res.nextPageToken
            })
        });
    };  
    handleSearchInput(event){
        this.setState({
            searchInput: event.target.value
        })
    };
    handleSearchClick(event){
        const keyword = this.state.searchInput;
        fetchYoutube(keyword).then(res => {
            this.setState({
                searchResult: res.items,
                searchClick: true,
                videoClick: false
            })
        });
    };
    handleVideoClick(event){
        const videoId = event.currentTarget.id;
        getVideoInfo(videoId).then(res => {
            this.setState({
                video: res.items,
                videoClick: true,
                searchClick: false,
                videoId: videoId
            })
        });
        fetchVideoComment(videoId).then(res => {
            this.setState({
                comments: res.items
            })
        });
        getRelatedVideo(videoId).then(res => {
            this.setState({
                videoList: res.items
            })  
        });
    };
    handleGalleryScroll(event){
        event.preventDefault();
        const pageToken = this.state.galleryNextPage;
        const currentVideos = this.state.videos;
        const galleryClientHeight = window.document.getElementById("Gallery").clientHeight;
        const galleryScrollTop = window.document.getElementById("Gallery").scrollTop;
        const galleryScrollHeight = window.document.getElementById("Gallery").scrollHeight;
        if (galleryClientHeight + galleryScrollTop === galleryScrollHeight) {
            getMostPopularVideos(pageToken).then(res => {
                this.setState({
                    videos: currentVideos.concat(res.items),
                    galleryNextPage: res.nextPageToken
                })
            });
        }
    };
    handlePlayerScroll(event){
        event.preventDefault();
        const pageToken = this.state.commentNextPage;
        const currentComments = this.state.comments;
        const { videoId } = this.state;
        const playerClientHeight = window.document.getElementById("VideoPlayer").clientHeight;
        const playerScrollHeight = window.document.getElementById("VideoPlayer").scrollHeight;
        const playerScrollTop = window.document.getElementById("VideoPlayer").scrollTop;
        if (playerClientHeight + playerScrollTop === playerScrollHeight) {
            fetchVideoComment(videoId, pageToken).then(res => {
                this.setState({
                    comments: currentComments.concat(res.items),
                    commentNextPage: res.nextPageToken
                })
            });
        }
    };
    render() {
        const { comments } = this.state;
        const { searchResult } = this.state;
        const { searchClick } = this.state;
        const { searchInput } = this.state;
        const { videos } = this.state;
        const { videoClick } = this.state;
        const { videoId } = this.state;
        const { video } = this.state;
        const { videoList } = this.state;
        return(
            <Fragment >
                <MuiThemeProvider theme={ theme }>
                    <Navbar searchClick={ this.handleSearchClick } searchInput={ this.handleSearchInput }/>
                    { searchClick ? <Search searchResult={ searchResult } videoClick={ this.handleVideoClick }/> 
                                  : (videoClick ? <VideoPlayer 
                                                    videoId={ videoId } 
                                                    video={ video } 
                                                    comments={ comments }
                                                    videoList={ videoList }
                                                    videoClick={ this.handleVideoClick }
                                                    scroll={ this.handlePlayerScroll }/> 
                                                 : <Gallery 
                                                    videos={ videos } 
                                                    videoClick = { this.handleVideoClick } 
                                                    scroll={ this.handleGalleryScroll }/>)}
                </MuiThemeProvider>
            </Fragment>
        )
    }
};

export default App;