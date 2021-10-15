import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class EventItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.event.name}</Table.Cell>
          <Table.Cell>{this.props.event.quantity}</Table.Cell>
          <Table.Cell>{this.props.event.condition}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EventItem);
