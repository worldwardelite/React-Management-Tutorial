import React, { Component } from 'react';
import logo from './logo.svg';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit *3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
  id: '1',
  img: 'https://placeimg.com/64/64/man',
  name: '홍길동',
  birthday: '961222',
  gender: 'Man',
  job: 'Student'
},
{
  id: '2',
  img: 'https://placeimg.com/64/64/woman',
  name: '리현일',
  birthday: '961222',
  gender: 'Man',
  job: 'designer'
},
{
  id: '3',
  img: 'https://placeimg.com/64/64/girl',
  name: '리순신',
  birthday: '961222',
  gender: 'Man',
  job: 'programmer'
}
];

class  App extends Component {
  render(){
    const { classes } = this.props;
    return(
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
            </TableRow>
          </TableHead>
          <TableBody>
        {
         customers.map( customer => { return (<Customer key = {customer.id} id={customer.id} img={customer.img} name={customer.name} birthday={customer.birthday} gender={customer.gender} job = {customer.job} />);})
        }
        </TableBody>
        </Table>
      </Paper>
  
    )
   

  }
 
  
}

export default withStyles(styles)(App);
