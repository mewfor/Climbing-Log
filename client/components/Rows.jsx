import React from 'react';

export default function Rows(props) {
  console.log('rows component called');
  console.log(props);
  return (
    <tr>
      <th scope="row">{props.date_created}</th>
      <td>{props.attempted ? 'true' : 'false'}</td>
      <td>{props.completed ? 'true' : 'false'}</td>
      <td>
        <button type="button" className="btn btn-warning">
          E
        </button>
        <button type="button" className="btn btn-danger">
          D
        </button>
      </td>
    </tr>
  );
}
