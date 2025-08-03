import Title from "../../../components/Title";
import Table from "../../../components/Table";
import { videoPlanData } from "../../../constants";

const VideoPlan = () => {
  return (
    <div className="py-10">
      <div className="text-center">
        <Title size={2.4} bold={true}>
          How many videos can I create with each plan?
        </Title>
      </div>

      <div className="mt-10 bg-lightDimPurple rounded-2xl p-6">
        <p className="text-lg text-dimGray-2 text-center w-full sm:w-[60%] mx-auto mb-5">
          The number of videos you can create depends on the video type and the
          AI voice option. Here is the estimation{" "}
          <span className="font-semibold">
            (assuming each video is 1 minute in length)
          </span>
        </p>
        <Table data={videoPlanData} />
      </div>
    </div>
  );
};

export default VideoPlan;


