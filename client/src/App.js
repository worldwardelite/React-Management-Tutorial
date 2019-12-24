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
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit *3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress:{
    marign: theme.spacing.unit *2
  }

})


class  App extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
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
  render(){
    const { classes } = this.props;
    return(
      <div>
      <Paper className={classes.root}> 
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {
         this.state.customers? this.state.customers.map( customer => { 
           return (<Customer stateRefresh = {this.stateRefresh} key = {customer.id} id={customer.id} image={customer.image} name={customer.name} birthday={customer.birthday} gender={customer.gender} job = {customer.job} />);}) 
         : 
         <TableRow>
           <TableCell colSpan ="6" align = "center">
             <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
           </TableCell>
         </TableRow>
        }
        </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh = {this.stateRefresh}/>
      </div>
    )
   

  }
 
  
}

export default withStyles(styles)(App);
