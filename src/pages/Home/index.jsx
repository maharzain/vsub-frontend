import Hero from "./components/Hero";
import Container from "../../components/Container";
import VideoTypes from "./components/VideoTypes";
import Shorts from "./components/Shorts";
import AutoCaptions from "./components/AutoCaptions";
import AutomationTools from "./components/AutomationTools";

const Home = () => {
  return (
    <Container>
      <Hero />
      <VideoTypes />
      <Shorts />
      <AutoCaptions />
      <AutomationTools />
    </Container>
  );
};

export default Home;
