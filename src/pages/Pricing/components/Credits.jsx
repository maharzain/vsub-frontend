import Title from "../../../components/Title";

const Credits = () => {
  return (
    <div className="py-10">
      <div className="mt-10 bg-lightDimPurple rounded-2xl px-6 py-14">
        <div className="text-center">
          <Title size={2.4} bold={true}>
            What are credits?
          </Title>
        </div>
        <div className="w-full sm:w-[60%] mx-auto mt-10">
            <p className="text-md text-dimGray-2">
            Creating videos requires credits, the amount of credits depends on the
            AI services that the video uses.{" "}
            </p>
            <p className="text-md text-dimGray-2 mt-3 mb-1">For instance: </p>
            <ul className="list-disc ml-5">
                <li className="text-dimGray-2 text-md list-inside"><span className="font-bold">Video captioning</span>: transcribing service</li>
                <li className="text-dimGray-2 text-md list-inside"><span className="font-bold">Reddit story</span>: AI voice</li>
                <li className="text-dimGray-2 text-md list-inside"><span className="font-bold">Would you rather video</span>: AI voice and AI images</li>
                <li className="text-dimGray-2 text-md list-inside"><span className="font-bold">AI video</span>: AI voice and AI images</li>
                <li className="text-dimGray-2 text-md list-inside"><span className="font-bold">Fake text video</span>: AI voice</li>
                <li className="text-dimGray-2 text-md list-inside"><span className="font-bold">Quiz video</span>: AI voice and AI images</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Credits;
