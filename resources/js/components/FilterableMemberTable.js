import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * MemberRow represents one single row of the members results
 */
class MemberRow extends Component {
  render() {
    const member = this.props.member;
    return (
      <tr>
      <td>{member.surname}</td>
    <td>{member.firstname}</td>
    <td>{member.gender}</td>
    <td>{member.email}</td>
    <td>{member.created_at}</td>
    </tr>
  );
  }
}

/**
 * MemberTable represents the table with all the members results
 */
class MemberTable extends Component {
  render() {
    const filteredSurname = this.props.filteredSurname;
    const filteredFirstName = this.props.filteredFirstName;
    const filteredEmail = this.props.filteredEmail;
    const rows = [];

    this.props.members.map(member => {
      if (filteredSurname && member.surname.indexOf(filteredSurname) === -1) {
        return;
      }
      if (filteredFirstName && member.firstname.indexOf(filteredFirstName) === -1) {
        return;
      }
      if (filteredEmail && member.email.indexOf(filteredEmail) === -1) {
        return;
      }

      rows.push(
        <MemberRow
          member={member}
          key={member.id}
        />
      );
    });

    return (
      <table>
        <thead>
        <tr>
          <th>Surname</th>
          <th>First Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Joined Date</th>
        </tr>
        </thead>
        <tbody>{ rows }</tbody>
      </table>
    );
  }
}

/**
 * SearchBar represents the search bar inputs
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilteredSurnameChange = this.handleFilteredSurnameChange.bind(this);
    this.handleFilteredFirstNameChange = this.handleFilteredFirstNameChange.bind(this);
    this.handleFilteredEmailChange = this.handleFilteredEmailChange.bind(this);
  }

  handleFilteredSurnameChange(e) {
    this.props.onFilteredSurnameChange(e.target.value);
  }

  handleFilteredFirstNameChange(e) {
    this.props.onFilteredFirstNameChange(e.target.value);
  }

  handleFilteredEmailChange(e) {
    this.props.onFilteredEmailChange(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Surname..."
          value={this.props.filteredSurname}
          onChange={this.handleFilteredSurnameChange}
        />
        &nbsp;
        <input
          type="text"
          placeholder="First Name..."
          value={this.props.filteredFirstName}
          onChange={this.handleFilteredFirstNameChange}
        />
        &nbsp;
        <input
          type="text"
          placeholder="E-Mail..."
          value={this.props.filteredEmail}
          onChange={this.handleFilteredEmailChange}
        />
      </form>
    );
  }
}

/**
 * FilterableMemberTable uses composition to build the whole component.
 * This is the parent component.
 */
class FilterableMemberTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSurname: '',
      filteredFirstName: '',
      filteredEmail: '',
    };

    this.handleFilteredSurnameChange = this.handleFilteredSurnameChange.bind(this);
    this.handleFilteredFirstNameChange = this.handleFilteredFirstNameChange.bind(this);
    this.handleFilteredEmailChange = this.handleFilteredEmailChange.bind(this);
  }

  handleFilteredSurnameChange(filterText) {
    this.setState({
      filteredSurname: filterText
    });
  }

  handleFilteredFirstNameChange(filterText) {
    this.setState({
      filteredFirstName: filterText
    });
  }

  handleFilteredEmailChange(filterText) {
    this.setState({
      filteredEmail: filterText
    });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <div className="float-lg-right">
            <SearchBar
              filteredSurname={this.state.filteredSurname}
              onFilteredSurnameChange={this.handleFilteredSurnameChange}
              filteredFirstName={this.state.filteredFirstName}
              onFilteredFirstNameChange={this.handleFilteredFirstNameChange}
              filteredEmail={this.state.filteredEmail}
              onFilteredEmailChange={this.handleFilteredEmailChange}
            />
          </div>
        </div>
        <MemberTable
          members={JSON.parse(this.props.members)}
          filteredSurname={this.state.filteredSurname}
          filteredFirstName={this.state.filteredFirstName}
          filteredEmail={this.state.filteredEmail}
        />
        <br />
      </div>
    );
  }
}

export default FilterableMemberTable;

if (document.getElementById('root')) {
  const members = document.getElementById('root').getAttribute('results');

  ReactDOM.render(
    <FilterableMemberTable
      members={members}
    />,
    document.getElementById('root')
  );
}
