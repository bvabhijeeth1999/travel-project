import React, { Component } from "react";
import { Table, Button, Row, Col, NavLink } from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse,
  Container,
  Navbar,
  Label,
  Form,
  FormGroup,
  Input,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {getBalance,updateBalance} from '../actions/userActions';

class MyWallet extends Component {
  state = {
      addMoney : '',
      balance : '0'
  };

  componentDidMount(){
    console.log('printing');
    this.props.getBalance(this.props.match.params.username);
    this.state.balance = this.props.user.balance;

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onBookClick = (username) => {
        this.props.getBalance(username);
        this.state.balance = this.props.user.balance;
        console.log("printing the username from on book click inside my wallet");
        console.log(username);
       // console.log(this.props.user);
    }

    onBookClick1 = (username,newmoney,prevbalance) => {
        const newbalance = parseInt(newmoney) + parseInt(prevbalance);
        this.props.updateBalance(username,newbalance);
        this.props.history.push(`${username}/${newbalance}`);
        console.log(`${newmoney} is added to the wallet`);
        this.props.history.push(`/book_tickets/${username}`);
    }

    onBookClick2 = (username) => {
        this.props.history.push(`/book_tickets/${username}`);
    }

  render() {
    const balance = this.props.user.balance;
    // balance is being printed here..making that balance into the web window is the duty of the front end team
    return (
        <div className="MyWallet">
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Form>
              <Button
              onClick = {this.onBookClick.bind(this,this.props.match.params.username)} className="MyWallet" color="secondary"
              >
              GET BALANCE</Button>
              <FormGroup>
                      <Label for="exampleName">Balance</Label>
                      <Input
                        type="text"
                        name = "balance"
                        id="exampleName"
                        placeholder="Current balance"
                        value = {this.state.balance}
                      />
                    </FormGroup>
              <FormGroup>
                      <Label for="exampleName">Add money</Label>
                      <Input
                        type="text"
                        name = "addMoney"
                        id="exampleName"
                        placeholder="Enter the amount need to be added"
                        onChange = {this.onChange}
                        value = {this.state.addMoney}
                      />
                    </FormGroup>
              <Button
                onClick = {this.onBookClick1.bind(this,this.props.match.params.username,this.state.addMoney,balance)} className="MyWallet" color="secondary" 
              >
              ADD MONEY</Button>

              <Button
                 onClick = {this.onBookClick2.bind(this,this.props.match.params.username)} className="MyWallet" color="secondary" 
                 >
                 GO BACK</Button>
                
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    user : state.user
});
  
export default connect(mapStateToProps,{getBalance,updateBalance})(MyWallet);


/* <Row>
                <Col sm={{ size: 6, offset: 3 }}>
                  <Form onSubmit = {this.onSubmit}>
                    <FormGroup>
                      <Label for="exampleName">Username</Label>
                      <Input
                        type="text"
                        name = "username"
                        id="exampleName"
                        placeholder="Username"
                        onChange = {this.onChange}
                        value = {this.state.username}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="password"
                        onChange = {this.onChange}
                        value = {this.state.password}
                      />
                    </FormGroup>
                    <Button color="success" >Submit</Button>
                  </Form>
                </Col>
              </Row> */