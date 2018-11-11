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
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
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
      filterText: '',
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <div className="float-lg-right">
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
          </div>
        </div>
        <MemberTable
          members={JSON.parse(this.props.members)}
          filterText={this.state.filterText}
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
