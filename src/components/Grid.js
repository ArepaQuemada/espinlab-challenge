import React from 'react';
import './Grid.css';

const initialState = [
  {
    name: 'Buenos Aires',
    id: '01',
    disabled: true,
  },
  {
    name: 'Cordoba',
    id: '02',
    disabled: true,
  },
  {
    name: 'Misiones',
    id: '03',
    disabled: true,
  },
];

export default function Grid() {
  const [gridState, setGridState] = React.useState(initialState);
  const [isCapicua, setIsCapicua] = React.useState(false);

  const handleChangeCapicua = (e) => {
    const { value } = e.target;
    if (value.length < 1) {
      return setIsCapicua(false)
    }
    const reverse = value.split('').reverse().join('');
    setIsCapicua(value.toLowerCase() === reverse.toLowerCase());
  };

  const handleChange = (e) => {
    setGridState((prev) =>
      prev.map((g) => {
        return g.name === e.target.name ? { ...g, name: e.target.value } : g;
      })
    );
  };

  const handleDelete = (e) => {
    setGridState((prev) =>
      prev.filter((g) => {
        return g.name !== e.target.name;
      })
    );
  };

  const handleEdit = (e) => {
    setGridState((prev) =>
      prev.map((g) => {
        return g.name === e.target.name ? { ...g, disabled: !g.disabled } : g;
      })
    );
  };

  return (
    <div>
      {gridState.map((g) => {
        return (
          <div className="Grid-Container" key={g.id}>
            <div className="flex">
              <label htmlFor={g.name}>{g.id}</label>
              <input
                type="text"
                name={g.name}
                value={g.name}
                disabled={g.disabled}
                id={g.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="danger" name={g.name} onClick={handleDelete}>
                Delete
              </button>
              <button className="primary" name={g.name} onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        );
      })}
      <div>
        <div>
          <label htmlFor="capicua">Type to check if a word it's capicua</label>
        </div>
        <input
          type="text"
          name="capicua"
          id="capicua"
          onChange={handleChangeCapicua}
        />
      </div>
      <p>{isCapicua ? "It's a capicua word" : "It's not a capicua word"}</p>
    </div>
  );
}
