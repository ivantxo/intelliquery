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
    const currentPage = this.props.currentPage;
    const resultsPerPage = this.props.resultsPerPage;
    const filteredSurname = this.props.filteredSurname.toLowerCase();
    const filteredFirstName = this.props.filteredFirstName.toLowerCase();
    const filteredEmail = this.props.filteredEmail;
    const rows = [];

    // Calculations to get the results for the requested page of results
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = this.props.members.slice(indexOfFirstResult, indexOfLastResult);

    currentResults.map(member => {
      if (filteredSurname && member.surname.toLowerCase().indexOf(filteredSurname) === -1) {
        return;
      }
      if (filteredFirstName && member.firstname.toLowerCase().indexOf(filteredFirstName) === -1) {
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
      <table className="table table-striped table-bordered table-sm">
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
      currentPage: 1,
      resultsPerPage: 20,
    };

    this.handleFilteredSurnameChange = this.handleFilteredSurnameChange.bind(this);
    this.handleFilteredFirstNameChange = this.handleFilteredFirstNameChange.bind(this);
    this.handleFilteredEmailChange = this.handleFilteredEmailChange.bind(this);
    this.handleClickPagination = this.handleClickPagination.bind(this);
    this.handleChangeEntries = this.handleChangeEntries.bind(this);
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

  handleClickPagination(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }

  handleChangeEntries(e) {
    this.setState({
      resultsPerPage: Number(e.target.value)
    });
  }

  render() {
    const pageNumbersStyle = {
      listStyle: 'none',
      display: 'flex',
      listStylePosition: 'outside',
    };

    return (
      <div>
        <div className="form-group">
          <div className="float-lg-left">
            <Entries
              onChangeEntries={this.handleChangeEntries}
            />
          </div>
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
          currentPage={this.state.currentPage}
          resultsPerPage={this.state.resultsPerPage}
        />
        <br />
        <ul style={pageNumbersStyle}>
          <PageNumbers
            totalMembers={JSON.parse(this.props.members).length}
            resultsPerPage={this.state.resultsPerPage}
            onClickPagination={this.handleClickPagination}
          />
        </ul>
      </div>
    );
  }
}

/**
 * Represents the select box for the number of entries of pagination
 */
class Entries extends Component {
  constructor(props) {
    super(props);
    this.handleChangeEntries = this.handleChangeEntries.bind(this);
  }

  handleChangeEntries(e) {
    this.props.onChangeEntries(e);
  }

  renderEntries() {
    const entries = [20, 30, 40, 50, 1000];
    return entries.map(entry => {
      return(
        <option key={entry}>{entry}</option>
      );
    });
  }

  render() {
    return (
      <div className="border-left form-group">
        Show
        <select
          className="custom-select-sm"
          onChange={this.handleChangeEntries}
        >
          {this.renderEntries()}
        </select> Entries
      </div>
    );
  }
}

/**
 * Represents the page numbers at the bottom of the member's list
 */
class PageNumbers extends Component {
  constructor(props) {
    super(props);
    this.handleClickPagination = this.handleClickPagination.bind(this);
  }

  handleClickPagination(e) {
    this.props.onClickPagination(e);
  }

  render() {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.totalMembers / this.props.resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    const pageNumbersLiStyle = {
      marginRight: '0.5em',
      color: 'blue',
      userSelect: 'none',
      cursor: 'pointer',
      fontSize: '0.9em',
    };

    return pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          style={pageNumbersLiStyle}
          onClick={this.handleClickPagination}
        >
          {number}
        </li>
      );
    });
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
