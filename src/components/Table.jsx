const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        <thead>
          <tr>
            {data.tableHeadings.map((heading, index) => (
              <th key={index} className="text-[1rem] text-dimGray-2 w-[40%]">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-purpleBlack border-t border-solid border-lightDimPurple"
            >
              {Object.values(row).map((value, valueIndex) => (
                <td
                  key={valueIndex}
                  className={`font-normal text-dimGray-2 ${
                    valueIndex === 0 ? "font-bold" : ""
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
