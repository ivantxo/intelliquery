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
    const filterText = this.props.filterText;
    const rows = [];

    this.props.members.map(member => {
      if (member.surname.indexOf(filterText) === -1) {
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
  }

  handleFilteredSurnameChange(e) {
    this.props.onFilteredSurnameChange(e.target.value);
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
    };

    this.handleFilteredSurnameChange = this.handleFilteredSurnameChange.bind(this);
  }

  handleFilteredSurnameChange(filterText) {
    this.setState({
      filteredSurname: filterText
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
            />
          </div>
        </div>
        <MemberTable
          members={JSON.parse(this.props.members)}
          filterText={this.state.filteredSurname}
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
