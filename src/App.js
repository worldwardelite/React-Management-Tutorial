import React from 'react';
import logo from './logo.svg';
import Customer from './components/Customer'
import './App.css';

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

const customer = {
  id: '3',
  img: 'https://placeimg.com/64/64/any',
  name: '리순신',
  birthday: '961222',
  gender: 'Man',
  job: 'programmer'
};

function App() {
  return(
    <div> 
      {
       customers.map( customer => {
        return (
          <Customer
            key = {customer.id}
            id={customer.id}
            img={customer.img}
            name={customer.name}
            birthday={customer.birthday}
            gender={customer.gender}
            job = {customer.job}
            />
          );

        })
      }

    </div>

  )
 
  
}

export default App;
