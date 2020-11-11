import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import white from "@material-ui/core/colors";

const styles = theme => ({
    
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flexGrow: 1,
    },
    title: {
        marginRight: "auto",
        marginLeft: theme.spacing.unit * 2,
        color: "inherit",
        fontSize: "1.6rem",
        letterSpacing:1
    },
    form: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "40%",
        marginRight: "auto",
    },
    search: {
        fontSize: "1.5rem"
    },
    textField: {
        width: "100%",
        alignSelf: "center",
        fontSize: "5rem"
    },
    author: {
        fontSize: "2rem",
        color: "inherit"
   },
   input: {
       fontSize: "1rem",
       color: "white",
       letterSpacing:1,
       paddingLeft: 5
   },
   menuItem: {
       "&:hover": {
           backgroundColor: theme.palette.secondary.main
       }
   }
})

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose(event) {
        this.setState({ anchorEl: null })
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const { searchClick } = this.props;
        const { searchInput } = this.props;

        return (
            <div className={ classes.root }>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" className={ classes.title }>
                            <a href="/" style={{ textDecoration: "none", color:"inherit" }}>VioVo</a>
                        </Typography>
                        <form className={ classes.form }>
                            <TextField 
                                id="search-input" 
                                onChange={ searchInput }
                                placeholder="Search"
                                className={ classes.textField }
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}>
                            </TextField>
                            <IconButton>
                                <Search id="search-input" className={ classes.search } onClick={ searchClick }/>
                            </IconButton>
                        </form>
                        <IconButton 
                            className={ classes.author } 
                            aria-owns={ anchorEl ? "my-menu" : null }
                            aria-haspopup="true"
                            onClick={ this.handleClick }>
                            <AccountCircle style={{ fontSize: "2rem" }} />
                        </IconButton>
                        <Menu 
                            id="my-menu"
                            anchorEl={ anchorEl }
                            open={ Boolean(anchorEl) }
                            onClose={ this.handleClose }>
                            <MenuItem className={ classes.menuItem } onClick={ this.handleClose }>
                                <a href="https://www.linkedin.com/in/chuchusong/" style={{ textDecoration: "none", color: "inherit" }} target="_blank">LinkedIn</a>
                            </MenuItem>
                            <MenuItem className={ classes.menuItem } onClick={ this.handleClose }>
                                <a href="https://github.com/chusong327" style={{ textDecoration: "none", color: "inherit"}} target="_blank">Github</a> 
                            </MenuItem>
                        </Menu> 
                    </Toolbar>  
                </AppBar>
            </div>
        )
    }
};

export default withStyles(styles)(Navbar);