import React from 'react';
import swal from 'sweetalert';
import { Button, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { userRemoveItMethod } from '../../../api/user/UserCollection.methods';

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  // Handles the state of the modal (close or open)
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  // On successful deletion, delete data.
  delete() {
    userRemoveItMethod.call(this.props.userID, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'User deleted successfully', 'success').then(() => {
          this.handleModalClose();
        });
      }
    });
  }

  // Render delete modal.
  render() {
    return (
        <Modal size='mini'
               dimmer
               closeIcon
               open={this.state.modalOpen}
               onClose={this.handleModalClose}
               onOpen={this.handleModalOpen}
               trigger={<Icon style={{ cursor: 'pointer' }} name='trash alternate outline'/>}
        >
          <Modal.Header>Delete User</Modal.Header>
          <Modal.Content>Are you sure you want to delete the user?</Modal.Content>
          <Modal.Actions>
            <Button icon
                    size='tiny'
                    negative
                    labelPosition='right'
                    onClick={() => this.delete()}>
              Delete
              <Icon name='trash alternate outline'/>
            </Button>
            <Button icon
                    size='tiny'
                    labelPosition='right'
                    onClick={this.handleModalClose}>
              Cancel
              <Icon name='x'/>
            </Button>
          </Modal.Actions>
        </Modal>
    );
  }
}

DeleteUser.propTypes = {
  userID: PropTypes.string,
};

export default DeleteUser;
