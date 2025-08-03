import Title from "../../../components/Title";

const FAQs = () => {
  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <Title size={2.4} bold={true}>
          Frequently Asked Questions
        </Title>
      </div>
      <div className="w-full sm:w-[60%] mx-auto">
        <Accordion />
      </div>
    </div>
  );
};

export default FAQs;

{
  /*------- Sub components --------*/
}
const Accordion = () => {
  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-arrow join-item bg-[#1a212f]">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-md text-dimGray-2 font-medium">
          How do I cancel my plan?
        </div>
        <div className="collapse-content">
          <p>Please go to the pricing page to cancel your plan</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-md text-dimGray-2 font-medium">
          Do you have a refund policy?
        </div>
        <div className="collapse-content">
          <p>Unfortunately, we do not offer refunds for our product.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-md text-dimGray-2 font-medium">
          Will my unused credits carry over?
        </div>
        <div className="collapse-content">
          <p>Credits don’t carry over from month to month</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-md text-dimGray-2 font-medium">
          What if I want more credits?
        </div>
        <div className="collapse-content">
          <p>You can top up your credits</p>
        </div>
      </div>
    </div>
  );
};
