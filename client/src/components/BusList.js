import React, { Component } from "react";
import { Table, Button, Row, Col, NavLink } from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuses,addBooking,getNoOfSeats,getBalance,updateBalance } from '../actions/userActions';
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
  Label,
Modal,
ModalHeader,
ModalBody,
ModalFooter} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

class BusList extends Component {

    state = {
        nos : '1',
        modal1: false,
        modal2: false,
        cost : '0',
        balance : '0',
        seats : '0'
    }
  
      componentDidMount(){
        console.log(this.props);
        this.props.getBalance(this.props.match.params.username);
        this.state.balance = this.props.user.balance;
      }

      toggle1 =() =>{
        this.setState(prevState => ({
          modal1: !prevState.modal1
        }));
      }

      toggle2 =() =>{
        this.setState(prevState => ({
          modal2: !prevState.modal2
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

       this.state.cost = cost;

       console.log('printing this.state.cost');

       console.log(this.state.cost);

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

       //this.state.balance = this.props.user.balance;
       
       console.log('printinggggg');
       console.log(this.state.balance);
       const new_balance = this.state.balance - totalcost;


       if(totalcost <= this.state.balance){
         console.log(`balance : ${this.state.balance}`);
         console.log(`balance is sufficient ${this.state.balance}`);
         this.setState(prevState => ({
          modal1: !prevState.modal1
        }));
        console.log(this.state.seats);
        console.log(this.state.nos);
        if(this.state.seats >= this.state.nos){
          this.props.updateBalance(username,new_balance)
          this.props.addBooking(bookingInfo);
        }
        else{
          console.log('no of seats requested are not available');
          //front end team need to convert this into pop up.
        }

       }
       else{
        console.log(`balance : ${this.state.balance}`);
         console.log(`your wallet is starving ...plz add money ${this.state.balance}`);
         this.setState(prevState => ({
          modal2: !prevState.modal2
        }));         
       }

      //  this.props.getNoOfSeats(id,doj);
      //  console.log('get no of tickets is called');
      //  this.state.seats = this.props.tkt.seats;
      //  console.log('printing the props');
      //  console.log(this.props);
      //  console.log('printing the filled seats');
      //  console.log(this.state.seats);

     
    }

          

    onBookClick1 = (username,source,destination,bus_id,doj) => {

       this.props.getNoOfSeats(username,source,destination,bus_id,doj);
       this.state.seats = 30-(this.props.tkt.seats);
      this.props.history.push(`/book_tickets/bus_list/${username}/${source}/${destination}/${doj}/${bus_id}`);
    }

    onBookClick3 = () => {

      //this.props.getNoOfSeats(bus_id,doj);
      this.props.history.push(`/book_tickets/mywallet/${this.props.match.params.username}`);
   }

    



    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    onBookClick2 = () => {

      console.log('inside book click 2');
      console.log(this.props.match.params.username);
      this.props.history.push(`/book_tickets/${this.props.match.params.username}`);
    }
      
      render() {
        const {buses} = this.props.bus;
       // const seats = this.props.seats;
        this.state.balance = this.props.user.balance;
        this.state.seats = 30-(this.props.tkt.seats);
        console.log('hello');
        console.log(`printing the balance from buslist page ${this.state.balance}`);
        return (

                         
          <Container>
                      <Button
                                 className="book-btn"
                                 color = "success"
                                 size = "sm"
                                 onClick = {this.onBookClick2.bind(this)}
                                 >Go Back</Button>


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
                            <FormGroup>
                      <Label for="exampleName">Seats Available :</Label>
                      <Input
                        type="text"
                        name = "seats_available"
                        id="exampleName"
                        placeholder="Available seats"
                        value = {(this.state.seats)}
                      />
                    </FormGroup>

                          </Form>
                          {buses.map( ({ bus_id , source , destination , travelagency , price , time}) => (
                      <CSSTransition key={bus_id} timeout={500} classNames="fade">
                          <ListGroupItem>
                         <b>Agency:</b> {travelagency} <br/>
                          <b>Source:</b> {source} <br/>
                          <b>Destination:</b>{destination} <br/>
                          <b> Departure:</b> {time} <br/>
                          <b>Cost per head:</b> {price}
                         
                  
                            
                            
                            <Button
                                 className="book-btn"
                                 color = "success"
                                 size = "sm"
                                 onClick = {this.onBookClick1.bind(this,this.props.match.params.username,source,destination,bus_id,this.props.match.params.doj)}
                                 >Check Availability</Button>


             
                            <Button
                                 className="book-btn"
                                 color = "success"
                                 size = "sm"
                                 onClick = {this.onBookClick.bind(this,bus_id,this.props.match.params.username,this.props.match.params.doj,this.state.nos,price,this.props.match.params.source,this.props.match.params.destination,time)}
                                 >Book Now</Button>

          <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
            <ModalHeader toggle={this.toggle1}>balance is sufficient</ModalHeader>
              <ModalBody>
                To Pay : {this.state.cost*this.state.nos}<br/> 
                          
                  <h5>Payment Successful!</h5>
              </ModalBody>
            <ModalFooter>
            {/* <Button color="secondary" onClick={this.onBookClick2.bind(this)}>Book Again</Button> */}
            <Button href="/" color="secondary" onClick={this.toggle1}>LogOut</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
            <ModalHeader toggle={this.toggle2}>Booking Failed</ModalHeader>
              <ModalBody>
                To Pay : {this.state.cost*this.state.nos}<br/> 
                          
                  <h5>Insufficient balance!</h5>
              </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={this.onBookClick3.bind(this)}>Add Money</Button>
            <Button href="/" color="secondary" onClick={this.toggle2}>LogOut</Button>
            </ModalFooter>
          </Modal>
                         
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
  bus : state.bus,
  book : state.book,
  user : state.user,
  tkt : state.tkt
});

export default connect(mapStateToProps, {getBuses,addBooking,getNoOfSeats,getBalance,updateBalance})(BusList);
