import React from 'react';
import PropTypes from 'prop-types';

export default class UserList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const li_user = this.props.users.map(user => {
      return <li key={user._id}>{user.username}</li>;
    });

    return (
      <ul>
        {li_user}
      </ul>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array,
};
