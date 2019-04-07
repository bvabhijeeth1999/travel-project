import React, { Component } from "react";
import { Table, Button, Row, Col, NavLink } from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuses } from '../actions/userActions';
import Booktick from './BookT';

class BusList extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Table hover dark>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bus ID</th>
                  <th>Amenities</th>
                  <th>Availability</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>B05</td>
                  <td>Wifi,AC</td>
                  <td>Available : 18</td>
                  <td>
                    <Button color="primary">
                      <NavLink
                        href="https://easygo-t22.herokuapp.com/book_tickets/seats_booking/"
                        style={{ color: "white" }}
                      >
                        Select
                      </NavLink>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>B08</td>
                  <td>Wifi,AC,TV</td>
                  <td>Not Available</td>
                  <td>
                    <Button color="primary">
                      <NavLink
                        href="https://easygo-t22.herokuapp.com/book_tickets/seats_booking/"
                        style={{ color: "white" }}
                      >
                        Select
                      </NavLink>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>B10</td>
                  <td>AC</td>
                  <td>Available : 22</td>
                  <td>
                    <Button color="primary">
                      <NavLink
                        href="https://easygo-t22.herokuapp.com/book_tickets/seats_booking/"
                        style={{ color: "white" }}
                      >
                        Select
                      </NavLink>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bus : state.bus
});

export default connect(mapStateToProps, {getBuses})(BusList);
