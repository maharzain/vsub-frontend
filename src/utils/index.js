export function filterOptions(input, options, isVoice) {
  // Check if input is empty; return the entire array if true
  if (!input) {
    return options;
  }

  // Convert the input to lowercase for case-insensitive comparison
  const lowercasedInput = input.toLowerCase();

  if (isVoice) {
    // If filtering voice options, ensure each option is an object with a name property
    return options.filter((option) => {
      if (option && typeof option.name === 'string') {
        return option.name.toLowerCase().includes(lowercasedInput);
      }
      return false;
    });
  } else {
    // If filtering language options, ensure each option is a string
    return options.filter((option) =>
      typeof option === 'string' && option.toLowerCase().includes(lowercasedInput)
    );
  }
}

export const getPreviousAddress = (tabName) => {
  let prevAddress;

  switch (tabName) {
    case "Brain":
      prevAddress = "brain";
      break;
    case "FakeText":
      prevAddress = "fake-texts";
      break;
    case "Ai Videos":
      prevAddress = "ai-videos";
      break;
    case "Quiz":
      prevAddress = "quiz";
      break;
    case "Split":
      prevAddress = "split";
      break;
    case "Story":
      prevAddress = "story";
      break;
    case "Reddit":
      prevAddress = "reddit";
      break;
    case "Captions":
      prevAddress = "captions";
      break;
    case "Wyr":
      prevAddress = "wyr";
      break;
    default:
      prevAddress = null;
  }

  return prevAddress;
};