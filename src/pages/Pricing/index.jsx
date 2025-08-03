import Container from "../../components/Container";
import FAQs from "./components/FAQs";
import Subscriptions from "./components/Subscriptions";
import VideoPlan from "./components/VideoPlan";
import CostBreakdown from "./components/CostBreakdown";
import Credits from "./components/Credits";

const Pricing = () => {
  return (
    <Container>
      <Subscriptions />
      <FAQs />
      <VideoPlan />
      <Credits />
      <CostBreakdown />
    </Container>
  );
};

export default Pricing;
