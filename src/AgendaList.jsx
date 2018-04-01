import React from 'react';
import 'isomorphic-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import FaTrash from 'react-icons/lib/fa/trash';

import AgendaFilter from './AgendaFilter.jsx';
import Toast from './Toast.jsx';

const AgendaRow = (props) => {
  function onDeleteClick() {
    props.deleteAgenda(props.agenda._id);
  }

  return (
    <tr>
      <td><Link to={`/agendas/${props.agenda._id}`}>{props.agenda._id.substr(-4)}</Link></td>
      <td>{props.agenda.status}</td>
      <td>{props.agenda.owner}</td>
      <td>{props.agenda.created.toDateString()}</td>
      <td>{props.agenda.effort}</td>
      <td>{props.agenda.completionDate ? props.agenda.completionDate.toDateString() : ''}</td>
      <td>{props.agenda.title}</td>
      <td>
        <Button bsSize="xsmall" onClick={onDeleteClick}><FaTrash /></Button>
      </td>
    </tr>
  );
};

AgendaRow.propTypes = {
  agenda: React.PropTypes.object.isRequired,
  deleteAgenda: React.PropTypes.func.isRequired,
};

function AgendaTable(props) {
  const agendaRows = props.agendas.map(agenda =>
    <AgendaRow key={agenda._id} agenda={agenda} deleteAgenda={props.deleteAgenda} />
  );
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{agendaRows}</tbody>
    </Table>
  );
}

AgendaTable.propTypes = {
  agendas: React.PropTypes.array.isRequired,
  deleteAgenda: React.PropTypes.func.isRequired,
};

export default class AgendaList extends React.Component {
  static dataFetcher({ urlBase, location }) {
    return fetch(`${urlBase || ''}/api/agendas${location.search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ AgendaList: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    const agendas = context.initialState.AgendaList ? context.initialState.AgendaList.records : [];
    agendas.forEach(agenda => {
      agenda.created = new Date(agenda.created);
      if (agenda.completionDate) {
        agenda.completionDate = new Date(agenda.completionDate);
      }
    });
    this.state = {
      agendas,
      toastVisible: false, toastMessage: '', toastType: 'success',
    };

    this.setFilter = this.setFilter.bind(this);
    this.deleteAgenda = this.deleteAgenda.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
    console.log("location " + this.state.location);
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status
        && oldQuery.effort_gte === newQuery.effort_gte
        && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }

  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  loadData() {

    AgendaList.dataFetcher({ location: this.props.location })
    .then(data => {
      const agendas = data.AgendaList.records;
      agendas.forEach(agenda => {
        agenda.created = new Date(agenda.created);
        if (agenda.completionDate) {
          agenda.completionDate = new Date(agenda.completionDate);
        }
      });
      this.setState({ agendas });
    }).catch(err => {
      this.showError(`Error in fetching data from server: ${err}`);
    });
  }

  deleteAgenda(id) {
    fetch(`/api/agendas/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) this.showError('Failed to delete agenda');
      else this.loadData();
    });
  }

  render() {
    return (
      <div>
        <Panel collapsible header="Filter">
          <AgendaFilter setFilter={this.setFilter} initFilter={this.props.location.query} />
        </Panel>
        <AgendaTable agendas={this.state.agendas} deleteAgenda={this.deleteAgenda} />
        <Toast
          showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType}
        />
      </div>
    );
  }
}

AgendaList.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};

AgendaList.contextTypes = {
  initialState: React.PropTypes.object,
};
