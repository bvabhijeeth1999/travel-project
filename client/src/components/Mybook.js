import React, { Component } from "react";
import { Table, Button, Row, Col, NavLink } from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBookings , deleteBooking, updateBalance,getBalance} from '../actions/userActions';
import Booktick from './BookT';
import {
  Collapse,
  Container,
  Navbar,
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

class Mybook extends Component {
  state = {
    refund : '0',
    balance : '0'
  };

  componentDidMount(){
    console.log('printing');
    console.log(this.props);
    this.props.getBalance(this.props.match.params.username);
    this.state.balance = this.props.user.balance;
  }

  onDeleteClick = (booking_id,id,doj,cost) => {
    console.log(id);
   console.log(doj);
   console.log('printing the booking_id inside the component');
   console.log(booking_id);
    this.props.deleteBooking(this.props.match.params.username,booking_id);
    this.props.history.push(`/book_tickets/mybook/${this.props.match.params.username}/${booking_id}`);
    
   // console.log(`calling the update balance method with ${this.props.username} and ${cost}`);
   const newmoney = parseInt(this.state.balance)+parseInt(cost);
   this.props.updateBalance(this.props.match.params.username,newmoney);
  }

  onClick1 = (username) => {
    
    this.props.history.push(`/book_tickets/${username}`);

  }


  render() {
    const {bookings} = this.props.tkt;
    return (
      
        <Container>
  
                          <Button
                                 className="book-btn"
                                 color = "success"
                                 size = "sm"
                                 onClick = {this.onClick1.bind(this,this.props.match.params.username)}
                                 >Go Back</Button>

        <ListGroup>
                          

            <TransitionGroup className = "Mybook">
                {bookings.map( ({ _id, bus_id ,source , destination, doj , nos , cost }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                        <ListGroupItem>
                        <b>BUS_ID : </b> {bus_id} <br />
                        <b>SOURCE : </b> {source} <br />
                        <b>DESTINATION : </b> {destination} <br />
                        <b>DATE OF JOURNEY : </b> {doj} <br />
                        <b>NO OF SEATS : </b>{nos} <br />
                        <b>TOTAL COST : </b>{cost} 

                        <Button
                                 className="book-btn"
                                 color = "success"
                                 size = "sm"
                                 onClick = {this.onDeleteClick.bind(this,_id,bus_id,doj,cost)}
                                 >Cancel</Button>

                        </ListGroupItem>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
    tkt : state.tkt,
    user : state.user
});
  
export default connect(mapStateToProps, {getBookings,deleteBooking,updateBalance,getBalance})(Mybook);
