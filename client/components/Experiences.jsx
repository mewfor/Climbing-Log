import React from 'react';

export default function Experiences(props) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Attempted</th>
            <th scope="col">Completed</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.rows}
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <button type="button" class="btn btn-warning">E</button>
              <button type="button" class="btn btn-danger">D</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>
              <button type="button" class="btn btn-warning">E</button>
              <button type="button" class="btn btn-danger">D</button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>
              <button type="button" class="btn btn-warning">E</button>
              <button type="button" class="btn btn-danger">D</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
