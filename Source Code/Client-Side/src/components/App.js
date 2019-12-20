import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter 
} from 'react-router-dom';
import { Container, Row } from 'react-bootstrap'

// Components
import Record from './Record/Record';
import ViewPrint from './ViewPrint/ViewPrint';
import Header from './Header';
import NotFound from './NotFound';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recordComponent: true,
      viewPrintComponent: false
    }
  }

  changeActive = (page) => {
    if (page === "record") {
      this.setState(() => {
        return {
          recordComponent: true,
          viewPrintComponent: false
        }
      })
    } else if (page === "viewPrint") {
      this.setState(() => {
        return {
          recordComponent: false,
          viewPrintComponent: true
        }
      })
    }
  }

  render() {
    return (
      <HashRouter>
        <Container>

          <Header
            recordComponent={this.state.recordComponent}
            viewPrintComponent={this.state.viewPrintComponent}
          />

          <Row>
            <Switch>
              <Route exact path="/" render={ (props) => <Record changeActive={this.changeActive}/>} />
              <Route exact path="/record" render={ (props) => <Record changeActive={this.changeActive}/>} />
              <Route path="/viewprint" render={ (props) => <ViewPrint changeActive={this.changeActive}/>} />
              <Route component={NotFound} />
              {/* <Route exact path="/" component={Record} />
              <Route exact path="/record" component={Record} />
              <Route path="/viewprint" component={ViewPrint} />
              <Route component={NotFound} /> */}
            </Switch>
          </Row>

        </Container>
      </HashRouter>
    );
  }
}

export default App;

