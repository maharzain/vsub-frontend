import { animate, useMotionValue, motion } from "framer-motion";
import CarouselCard from "./CarouselCard";
import useMeasure from "react-use-measure";
import { useEffect } from "react";

const InfiniteCarousel = ({ items, image }) => {
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let currentCards = Math.floor(width / 200);
    let extraCards = (items.length - currentCards)*2;
    let finalPosition = -(width) - (200*(extraCards-(Math.floor(extraCards/2)))) - ((Math.floor(extraCards/2))*3*12);

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 25,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  return (
    <motion.div className="flex gap-3" ref={ref} style={{ x: xTranslation }}>
      {[...items, ...items].map((item, index) => (
        <CarouselCard key={index} image={image} text={item.text} link={item.link} />
      ))}
    </motion.div>
  );
};

export default InfiniteCarousel;
