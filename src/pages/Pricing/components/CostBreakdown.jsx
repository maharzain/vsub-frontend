
import Table from "../../../components/Table";
import Title from "../../../components/Title";

import { costTableData } from "../../../constants";

const CostBreakdown = () => {
  return (
    <div className="py-10">
      <div className="text-center">
        <Title size={2.4} bold={true}>
          How many videos can I create with each plan?
        </Title>
      </div>

      <div className="mt-10 bg-lightDimPurple rounded-2xl p-6">
        <Table data={costTableData} />
      </div>
    </div>
  )
}

export default CostBreakdown