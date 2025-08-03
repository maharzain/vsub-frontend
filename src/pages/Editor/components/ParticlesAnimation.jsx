import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ParticlesAnimation = ({ particlesCount = 10 }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const particles = Array.from({ length: particlesCount }).map(() => ({
    x: Math.random() * width, // Random X position
    y: Math.random() * height, // Random Y position
    size: Math.random() * 8 + 8, // Increase size for thicker particles
  }));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {particles.map((particle, index) => {
        // Slow fade-in and fade-out using a sine wave for smoother transitions
        const opacity = interpolate(
          Math.sin(frame * 10 + index), // Slower fade speed with more gradual transitions
          [-1, 1],
          [0.1, 1], // Fade between 0.3 and 1 for a soft effect
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        // Apply spring animation to make particles move gently
        const xOffset = spring({
          frame: frame - index * 1, // Different timings for each particle
          fps,
          config: {
            damping: 0.001, // Lower damping for smoother movement
            mass: 1,
            stiffness: 0.001, // Lower stiffness for slow, gentle movement
          },
        });

        const yOffset = spring({
          frame: frame - index * 1, // Different timings for each particle
          fps,
          config: {
            damping: 0.001,
            mass: 1,
            stiffness: 0.001,
          },
        });

        // Apply gentle random movement
        const translateX = particle.x + xOffset * 5; // Larger offset for noticeable movement
        const translateY = particle.y + yOffset * 5; // Larger offset for noticeable movement

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translate(${translateX}px, ${translateY}px)`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: 'white', // White color for spark-like particles
              opacity: opacity, // Smooth fade-in and fade-out effect
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticlesAnimation;