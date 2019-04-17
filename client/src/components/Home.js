import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  UncontrolledCollapse,
  Card,
  CardBody
} from "reactstrap";
class Home extends Component {
  state = {
    isOpen: false
  };
  render() {
    return (
      <div className="home-main">
        <div>
          <Jumbotron className="header">
            <h1 className="display-3">EasyGO</h1>
            <em className="lead" ><b> <font size="+3">Never stop exploring </font></b></em>
            <br/>
            <br/>    
            <p>"Wherever you go, go with all your heart."</p><p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-Confucius</p>        
            <div>
              <Button
                color="primary"
                id="toggler"
                style={{ marginBottom: "1rem" }}
              >
                Learn More
              </Button>
              <UncontrolledCollapse toggler="#toggler">
                <Card>
                  <CardBody className="hf">
                  Planning a journey is often tedious and requires a lot of patience. 
                  Comparison between various travel agencies based on prices,comforts is often perplexing.
                  Our Travel Management System helps in selecting the right travel agency for every user in an efficient manner.
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </div>
          </Jumbotron>          
        </div>
        <h5>Contact</h5><p>
          &ensp;
          Email: easygo@gmail.com
        </p>
        <p>
        &ensp;
          Mobile: 7675865616
        </p>
      </div>
    );
  }
}

export default Home;
