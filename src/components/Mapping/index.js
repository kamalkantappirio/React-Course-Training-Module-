/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

class Mapping extends Component {

  state={
    loading: false
  }

  render() {
    return (
      <div >
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Field</th>
              <th>Mapping</th>
            </tr>
          </thead>
          <tbody />
        </Table>

        <Button color="primary" type="submit" >
            Submit
          </Button>
      </div>
    );
  }
}

export default Mapping;
