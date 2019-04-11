import React, { Component } from "react";
import { Table, Button, Row, Col, NavLink } from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuses,addBooking } from '../actions/userActions';
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
  DropdownItem,
Modal,
ModalHeader,
ModalBody,
ModalFooter} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

class BusList extends Component {

    state = {
        nos : '',
        modal: false
    }
  
      componentDidMount(){
        console.log(this.props);
      }

      toggle =() =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

      // onBookClick1 = (username) => {
        
      
      //   const bookuser = {
      //     username : username
      //   }

      //   this.toggle();
        
      //   this.props.history.push(`/mybook/${username}`);
      //  // this.props.getBookings(username);
      
      // }
      

    onBookClick = (id,username,doj,nos,cost,source,destination,time) => {
      this.toggle();
       console.log('inside bus list component');
       console.log(id);
       console.log(username);
       console.log(doj);
       console.log(nos);
       console.log(cost);
       console.log(`total cost : ${nos*cost}`);
       console.log(source);
       console.log(destination);

       const totalcost = nos*cost;

       const bookingInfo = {
         id : id,
         username : username,
         doj : doj,
         nos : nos,
         cost : totalcost,
         source : source,
         destination : destination,
         time : time
       }

       this.props.addBooking(bookingInfo);
    }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
      
      render() {
        const {buses} = this.props.bus;
        console.log('hello');
        return (
          <Container>
          <ListGroup>
              <TransitionGroup className = "BusList">
              Number of seats:
              <Form>
                            <FormGroup className="noos">
                            <Input type="select" 
                                  name="nos" 
                                  id="exampleSelect" 
                                  placeholder = "select source"
                                  onChange = {this.onChange}
                                  value = {this.state.nos}>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                            </Input>
                            </FormGroup>
                          </Form>
                  {buses.map( ({ _id, bus_id , source , destination , travel_agency , cost , time}) => (
                      <CSSTransition key={_id} timeout={500} classNames="fade">
                          <ListGroupItem>
                         <b>Agency:</b> {travel_agency} <br/>
                          <b>Source:</b> {source} <br/>
                          <b>Destination:</b>{destination} <br/>
                          <b> Departure:</b> {time} <br/>
                          <b>Cost per head:</b> {cost}
                          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Booking Confirmed</ModalHeader>
          <ModalBody>
            Paid using <b>EasyGO</b> Wallet<br/> 
            <h5>Payment Successful!</h5>
          </ModalBody>
          <ModalFooter>
            <Button href="/" color="secondary" onClick={this.toggle}>LogOut</Button>
          </ModalFooter>
        </Modal>
                  
                          <Button
                                 className="book-btn"
                                 color = "success"
                                 size = "sm"
                                 onClick = {this.onBookClick.bind(this,bus_id,this.props.match.params.username,this.props.match.params.doj,this.state.nos,cost,this.props.match.params.source,this.props.match.params.destination,time)}
                                 >Book Now</Button>
                         
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
  bus : state.bus
});

export default connect(mapStateToProps, {getBuses,addBooking})(BusList);
