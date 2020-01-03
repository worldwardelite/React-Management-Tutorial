import React, { Component } from 'react';
import logo from './logo.svg';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import TextField from'@material-ui/core/TextField';
import { fade, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080,
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  
  progress:{
    marign: theme.spacing(2)
  },

  tableHead:{
    fontSize: '1.0rem'
  },
  menu:{
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }

})


class  App extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyWord: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyWord: ''
    });

    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));

  }
  
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({
      completed: completed >= 100? 0 : completed+1
    });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(e.target.name +"=" + e.target.value);
  }

  render(){
    const filteredComponents = (data) =>{
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyWord) > -1;
      });
      return data.map((customer) => {
        return <Customer stateRefresh = {this.stateRefresh} key = {customer.id} id={customer.id} image={customer.image} name={customer.name} birthday={customer.birthday} gender={customer.gender} job = {customer.job}/>
      })
    }

    const { classes } = this.props;
    const cellList = ["번호","프로필이미지","이름","생년월일","성별","직업","설정"];
    return(
      <div  className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" >
             <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
           고객관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput,}}
              name = "searchKeyWord" value = {this.state.searchKeyWord} onChange ={this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh = {this.stateRefresh}/>
      </div>
      <Paper className={classes.paper}> 
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                cellList.map( c=> {
                  return  <TableCell className={classes.tableHead}>{c}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
        {
         this.state.customers?  
          filteredComponents(this.state.customers) : 
          // this.state.customers.map((customer) => {
          //   return <Customer stateRefresh = {this.stateRefresh} key = {customer.id} id={customer.id} image={customer.image} name={customer.name} birthday={customer.birthday} gender={customer.gender} job = {customer.job}/>
          // })
          // :
         <TableRow>
           <TableCell colSpan ="6" align = "center">
             <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
           </TableCell>
         </TableRow>
        }
        </TableBody>
        </Table>
      </Paper>
     
      </div>
    )
  }
}

export default withStyles(styles)(App);
