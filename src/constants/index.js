import brain from "../assets/tab-icons/brain.svg";
import fakeText from "../assets/tab-icons/faketext.svg";
import aiVideo from "../assets/tab-icons/aivideo.svg";
import split from "../assets/tab-icons/split.svg";
import play from "../assets/tab-icons/play.svg";
import quiz from "../assets/tab-icons/quiz.svg";
import reddit from "../assets/tab-icons/reddit.svg";
import wyr from "../assets/tab-icons/wyr.svg";
import storyBook from "../assets/tab-icons/story.svg";
//templates images for brain teasers
import dontSay from "../assets/templates/brain/dont-say-2.webp";
// templates images for ai videos
import cinematic from "../assets/templates/ai-videos/cinematic.jpg";
import cartoon3D from "../assets/templates/ai-videos/3d.jpg";
import cinematicDark from "../assets/templates/ai-videos/cinematic-dark.jpg";
import animeDark from "../assets/templates/ai-videos/anime-dark.jpg";
import comic from "../assets/templates/ai-videos/comic.webp";
import cartoon2D from "../assets/templates/ai-videos/cartoon.jpg";
import punk from "../assets/templates/ai-videos/punk.jpg";
import psy from "../assets/templates/ai-videos/psy.jpg";
import anime from "../assets/templates/ai-videos/anime.jpg";
// templates images for quiz
import quizStandard from "../assets/templates/quiz/standard.webp";
import multiLevels from "../assets/templates/quiz/multi-levels.webp";
// templates images for wyr
import wyrStandard from "../assets/templates/wyr/wyr.webp";
import trumpQuestionImage from "../assets/images/trumpQuestionImage.png";
import trumpAnswerImage from "../assets/images/trumpAnswerImage.png"
import bidenQuestionImage from "../assets/images/bidenQuestionImage.png"
import bidenAnswerImage from "../assets/images/bidenAnswerImage.png"
import harrisQuestionImage from "../assets/images/harrisQuestionImage.png"
import harrisAnswerImage from "../assets/images/harrisAnswerImage.png"
import trump1 from "../assets/images/trump/trump (1).png"
import trump2 from "../assets/images/trump/trump (2).png"
import trump3 from "../assets/images/trump/trump (3).png"
import trump4 from "../assets/images/trump/trump (4).png"
import trump5 from "../assets/images/trump/trump (5).png"
import trump6 from "../assets/images/trump/trump (6).png"
import trump7 from "../assets/images/trump/trump (7).png"
import trump8 from "../assets/images/trump/trump (8).png"
import trump9 from "../assets/images/trump/trump (9).png"
import trump10 from "../assets/images/trump/trump (10).png"

import biden1 from "../assets/images/biden/biden (1).png"
import biden2 from "../assets/images/biden/biden (2).png"
import biden3 from "../assets/images/biden/biden (3).png"
import biden4 from "../assets/images/biden/biden (4).png"
import biden5 from "../assets/images/biden/biden (5).png"
import biden6 from "../assets/images/biden/biden (6).png"

import harris1 from "../assets/images/harris/harris (1).png"
import harris2 from "../assets/images/harris/harris (2).png"
import harris3 from "../assets/images/harris/harris (3).png"
import harris4 from "../assets/images/harris/harris (4).png"
import harris5 from "../assets/images/harris/harris (5).png"

//carousel items
import sv1 from "../assets/carousel-items/s-v1.mp4"
import sv2 from "../assets/carousel-items/s-v2.mp4"
import sv3 from "../assets/carousel-items/s-v3.mp4"
import sv6 from "../assets/carousel-items/s-v6.mp4"
import sv7 from "../assets/carousel-items/s-v7.mp4"
import sv8 from "../assets/carousel-items/s-v8.mp4"

export const carouselItems = [
    {
        text: 'Fake Text Messages',
        link: sv1,
    },
    {
        text: 'Reddit Story',
        link: sv2,
    },
    {
        text: 'Would you rather',
        link: sv3,
    },
    {
        text: 'AI video - cinematic',
        link: sv3,
    },
    {
        text: 'Quiz - standard',
        link: sv6,
    },
    {
        text: 'Quiz - multilevels',
        link: sv7,
    },
    {
        text: 'Fake text messages',
        link: sv8,
    }
]

export const brainTeaserTemplates = [
    {
        text: "Don't say the same thing as me",
        link: dontSay,
    },
]

export const aiVideoTemplates = [
    {
        text: "Cinematic",
        link: cinematic,
    },
    {
        text: "Cartoon 3D",
        link: cartoon3D,
    },
    {
        text: "Cinematic (dark)",
        link: cinematicDark,
    },
    {
        text: "Anime (dark)",
        link: animeDark,
    },
    {
        text: "Comic",
        link: comic,
    },
    {
        text: "Cartoon 2D",
        link: cartoon2D,
    },
    {
        text: "Solarpunk",
        link: punk,
    },
    {
        text: "Psychedelic art",
        link: psy,
    },
    {
        text: "Anime",
        link: anime,
    },
];

export const quizTemplates = [
    {
        text: "Standard",
        link: quizStandard,
    },
    {
        text: "Multi levels",
        link: multiLevels
    },
]

export const wyrTemplates = [
    {
        text: "Standard",
        link: wyrStandard,
    },
]

export const videoPlanData = {
    tableHeadings: ['Video Type', 'Starter Plan', 'Pro Plan', 'Premium Plan'],
    rows: [
        {
            'Video Type': 'Video captioning',
            'Starter Plan': 70,
            'Pro Plan': 140,
            'Premium Plan': 350,
        },
        {
            'Video Type': 'Reddit stories',
            'Starter Plan': 70,
            'Pro Plan': 140,
            'Premium Plan': 350,
        },
        {
            'Video Type': 'Would you rather video (with Elevenlabs voice)',
            'Starter Plan': 30,
            'Pro Plan': 60,
            'Premium Plan': 150,
        },
        {
            'Video Type': 'AI video (with OpenAI voice)',
            'Starter Plan': 25,
            'Pro Plan': 50,
            'Premium Plan': 125,
        },
        {
            'Video Type': 'Fake text video (with Elevenlabs voice)',
            'Starter Plan': 30,
            'Pro Plan': 60,
            'Premium Plan': 150,
        },
        {
            'Video Type': 'Quiz video (with Elevenlabs voice)',
            'Starter Plan': 30,
            'Pro Plan': 60,
            'Premium Plan': 150,
        },
    ],
};


export const costTableData = {
    tableHeadings: ['Service', 'Unit Description', 'Cost per unit'],
    rows: [
        {
            'Service': 'Video rendering',
            'Unit Description': 'Per 1 min video',
            'Cost per unit': '15 credits',
        },
        {
            'Service': 'AWS speech to text',
            'Unit Description': 'Per 1 min audio',
            'Cost per unit': '50 credits',
        },
        {
            'Service': 'Stable Diffusion AI images Basic (Use for "Would you rather video")',
            'Unit Description': 'Per 20 Images (Approx. 1 min video)',
            'Cost per unit': '50 credits',
        },
        {
            'Service': 'Stable Diffusion AI images (Use for AI videos)',
            'Unit Description': 'Per 20 Images (Approx. 1 min video)',
            'Cost per unit': '130 credits',
        },
        {
            'Service': 'OpenAI text to speech',
            'Unit Description': 'Per 1000 characters (Approx. 1 min audio)',
            'Cost per unit': '50 credits',
        },
        {
            'Service': 'AWS text to speech',
            'Unit Description': 'Per 1000 characters (Approx. 1 min audio)',
            'Cost per unit': '50 credits',
        },
        {
            'Service': 'Elevenlabs text to speech',
            'Unit Description': 'Per 1000 characters (Approx. 1 min audio)',
            'Cost per unit': '150 credits',
        },
    ],
};


export const categoryCardInformation = [
    {
        heading: "Brain Teasers",
        title: "brain",
        newNiche: true,
        bestNiche: false,
        subHeading: "Brain teasers video",
        image: brain,
    },
    {
        heading: "Fake Text",
        title: "fake-texts",
        newNiche: false,
        bestNiche: true,
        subHeading: "Fake text message story",
        image: fakeText
    },
    {
        heading: "AI Video",
        title: "ai-videos",
        newNiche: false,
        bestNiche: false,
        subHeading: "Generate AI video",
        image: aiVideo
    },
    {
        heading: "Quiz",
        title: "quiz",
        newNiche: false,
        bestNiche: false,
        subHeading: "Quiz questions video",
        image: quiz
    },
    {
        heading: "Split Screen",
        title: "split",
        newNiche: false,
        bestNiche: false,
        subHeading: "Split screen video",
        image: split
    },
    {
        heading: "Story",
        title: "story",
        newNiche: false,
        bestNiche: false,
        subHeading: "Story video",
        image: storyBook
    },
    {
        heading: "Reddit",
        title: "reddit",
        newNiche: false,
        bestNiche: false,
        subHeading: "Convert Reddit post to video",
        image: reddit
    },
    {
        heading: "Add Captions",
        title: "captions",
        newNiche: false,
        bestNiche: false,
        subHeading: "Add captions video",
        image: play
    },
    {
        heading: "Would You Rather",
        title: "wyr",
        newNiche: false,
        bestNiche: false,
        subHeading: "Would you rather video",
        image: wyr
    },
];

export const languages = [
    'English',
    'Japanese',
    'Chinese',
    'German',
    'Hindi',
    'French',
    'Korean',
    'Portuguese',
    'Italian',
    'Spanish',
    'Indonesian',
    'Dutch',
    'Turkish',
    'Filipino',
    'Polish',
    'Swedish',
    'Bulgarian',
    'Romanian',
    'Arabic',
    'Czech',
    'Greek',
    'Finnish',
    'Croatian',
    'Malay',
    'Slovak',
    'Danish',
    'Tamil',
    'Ukrainian'
];

export const charactersAndShows = [
    "South Park",
    "Politicians",
    "The Simpsons",
    "Family Guy",
    "Dragon Ball",
    "Rick & Morty",
    "Influencer / Celebrity",
    "SpongeBob SquarePants",
    "Gojo",
    "Shrek"
];

export const voiceProviders = ["OpenAI"];

export const elevenLabVoices = [
    {
        name: "Natasha - Valley Girl",
        chips: ["american", "sassy", "social_media"]
    },
    {
        name: "Alex - Expressive Narrator",
        chips: ["american", "intense", "narrative_story"]
    },
    {
        name: "Jasper",
        chips: ["american", "intense", "characters_animation"]
    },
    {
        name: "Rachel",
        chips: ["american", "calm", "narration"]
    },
    {
        name: "Drew",
        chips: ["american", "well-rounded", "news"]
    },
    {
        name: "Clyde",
        chips: ["american", "war veteran", "video games"]
    },
    {
        name: "Paul",
        chips: ["american", "ground reporter", "news"]
    },
    {
        name: "Domi",
        chips: ["american", "strong", "narration"]
    },
    {
        name: "Dave",
        chips: ["british-essex", "conversational", "video games"]
    },
    {
        name: "Fin",
        chips: ["irish", "sailor", "video games"]
    },
    {
        name: "Sarah",
        chips: ["american", "soft", "news"]
    },
    {
        name: "Antoni",
        chips: ["american", "well-rounded", "narration"]
    },
    {
        name: "Thomas",
        chips: ["american", "calm", "medication"]
    },
    {
        name: "Charlie",
        chips: ["australian", "casual", "conversational"]
    },
    {
        name: "George",
        chips: ["british", "raspy", "narration"]
    },
    {
        name: "Emily",
        chips: ["american", "calm", "medication"]
    },
    {
        name: "Elli",
        chips: ["american", "emotional", "narration"]
    },
    {
        name: "Callum",
        chips: ["american", "hoarse", "video games"]
    },
    {
        name: "Patrick",
        chips: ["american", "shouty", "video games"]
    },
    {
        name: "Harry",
        chips: ["american", "anxious", "video games"]
    },
    {
        name: "Liam",
        chips: ["american", "", "narration"]
    },
    {
        name: "Dorothy",
        chips: ["british", "pleasent", "children's stories"]
    },
    {
        name: "Josh",
        chips: ["american", "deep", "narration"]
    },
    {
        name: "Arnold",
        chips: ["american", "crisp", "narration"]
    },
    {
        name: "Charlotte",
        chips: ["english-swedish", "seductive", "video games"]
    },
    {
        name: "Matilida",
        chips: ["american", "warm", "audiobook"]
    },
    {
        name: "Mathew",
        chips: ["british", "", "audiobook"]
    },
    {
        name: "James",
        chips: ["australian", "calm", "news"]
    },
    {
        name: "Joseph",
        chips: ["british", "", "news"]
    },
    {
        name: "Jeremy",
        chips: ["american-irish", "excited", "narration"]
    },
    {
        name: "Michael",
        chips: ["american", "", "audiobook"]
    },
    {
        name: "Ethan",
        chips: ["american", "", "ASMR"]
    },
    {
        name: "Gigi",
        chips: ["american", "childish", "animation"]
    },
    {
        name: "Freya",
        chips: ["american", "", ""]
    },
    {
        name: "Santa Claus",
        chips: ["", "", "christmas"]
    },
    {
        name: "Grace",
        chips: ["american-southern", "", "audiobook"]
    },
    {
        name: "Daniel",
        chips: ["british", "deep", "news presenter"]
    },
    {
        name: "Lilly",
        chips: ["british", "raspy", "narration"]
    },
    {
        name: "Serena",
        chips: ["american", "pleasent", "interactive"]
    },
    {
        name: "Adam",
        chips: ["american", "deep", "narration"]
    },
    {
        name: "Nicole",
        chips: ["american", "whisper", "audiobook"]
    },
    {
        name: "Bill",
        chips: ["american", "strong", "documentary"]
    },
    {
        name: "Jessie",
        chips: ["american", "raspy", "video games"]
    },
    {
        name: "Sam",
        chips: ["american", "raspy", "narration"]
    },
    {
        name: "Glinda",
        chips: ["american", "witch", "video games"]
    },
    {
        name: "Giovanni",
        chips: ["english-italian", "foreigner", "audiobook"]
    },
    {
        name: "Mimi",
        chips: ["english-swedish", "childish", "animation"]
    },
    {
        name: "Patrick Star",
        chips: ["", "", "", "cartoon: SpongbobSquarepants"]
    },
    {
        name: "Gojo",
        chips: ["", "", "", "cartoon: Goo"]
    },
    {
        name: "Joe Biden",
        chips: ["", "", "", "cartoon: Politician"]
    },
    {
        name: "Stewie Griffin",
        chips: ["", "", "", "cartoon: Family Guy"]
    },
    {
        name: "Goku",
        chips: ["", "", "", "cartoon: DragonBall"]
    },
    {
        name: "Mr Beast",
        chips: ["", "", "", "cartoon: Influencer"]
    },
    {
        name: "Plankton",
        chips: ["", "", "", "cartoon: Sponge Bob"]
    },
    {
        name: "Homer Simpson",
        chips: ["", "", "", "cartoon: The Simpsons"]
    },
    {
        name: "Donald Trump",
        chips: ["", "", "", "cartoon: Politician"]
    },
    {
        name: "Squidward Tentacles",
        chips: ["", "", "", "cartoon: SpongbobSquarepants"]
    },
    {
        name: "Spongbob Squarepants",
        chips: ["", "", "", "cartoon: SpongbobSquarepants"]
    },
    {
        name: "ishowspeed",
        chips: ["", "", "", "cartoon: Influencer"]
    },
    {
        name: "Kai Cenat",
        chips: ["", "", "", "cartoon: Influencer"]
    },
    {
        name: "Eric Cartman",
        chips: ["", "", "", "cartoon: Eric Cartman"]
    },
    {
        name: "Rick",
        chips: ["", "", "", "cartoon: Rick & Morty"]
    },
    {
        name: "Peter Griffin",
        chips: ["", "", "", "cartoon: Family Guy"]
    },
    {
        name: "Shrek",
        chips: ["", "", "", "cartoon: Shrek"]
    }
];

export const openAiVoices = [
    "Alloy",
    "Echo",
    "Fable",
    "Onyx",
    "Nova",
    "Shimmer"
]

export const storyTypes = [
    "📜 Historical Stories",
    "🎲 Random Facts",
    "🎞️ Reddit Stories",
    "💪🏻 Motivation",
    "👹 Creepypasta",
    "🔪 Crime",
    "📝 Documentary",
    "🏰 Historic Facts",
    "🌎 Geography Facts",
    "🌌 Space",
    "✈️ Travel",
    "❤️‍🩹 Heal",
    "🎾 Sports",
    "🏛️ Stoicism",
    "✨ Celebrity",
]

export const videoSizes = [
    "Potrait (9:16)",
    "Landscape (16:9)",
]

export const chatSampleData = [
    { type: "Right", content: { type: "Text", message: "Dad! I want to marry 😍" }, emphasize: false },
    { type: "Left", content: { type: "Text", message: "Say sorry!" }, emphasize: false },
    { type: "Right", content: { type: "Image", url: "https://cdn.pixabay.com/photo/2023/08/02/18/21/yoga-8165759_1280.jpg" }, emphasize: false },
    { type: "Left", content: { type: "Text", message: "Say sorry!" }, emphasize: false },
    { type: "Right", content: { type: "Text", message: "But for what?" }, emphasize: false },
    { type: "Left", content: { type: "Text", message: "You first say sorry! 😅" }, emphasize: true },
    { type: "Right", content: { type: "Text", message: "But what's my fault?" }, emphasize: false },
    { type: "Left", content: { type: "Text", message: "You first say sorry!" }, emphasize: false },
    { type: "Left", content: { type: "Text", message: "First say sorry!" }, emphasize: false },
    { type: "Right", content: { type: "Text", message: "Ok Dad I'm sorry 😢" }, emphasize: false },
    { type: "Left", content: { type: "Text", message: "Now you're ready for marriage my son!!! Your training is complete. You have learned to say sorry without any reason!!!" }, emphasize: false },
];

export const quizPresetPrompts = [
    'Bible times,pyramids,Egypt,pharaoh',
    'earth planet',
    'hidden world',
    'fantasy world',
    'galaxy',
    'natural world',
    'fantasy world, bright light, colorful'
];

export const editorFonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Verdana",
    "Tahoma",
    "Impact",
    "Comic Sans MS",
    "Trebuchet MS",
    "Palatino Linotype",
    "Garamond",
    "Brush Script MT",
    "Open Sans",
    "Roboto",
    "Lato",
    "Montserrat",
    "Poppins",
    "Merriweather",
    "Oswald",
    "Orbitron",
];

export const trumpQAImages = [{
    questionImage: trumpQuestionImage,
    answerImage: trumpAnswerImage,
}]
export const bidenQAImages = [{
    questionImage: bidenQuestionImage,
    answerImage: bidenAnswerImage,
}]
export const harrisQAImages = [{
    questionImage: harrisQuestionImage,
    answerImage: harrisAnswerImage,
}]

export const trumpImages = [
    trump1, trump2, trump3, trump4, trump5, trump6, trump7, trump8, trump9, trump10
];
export const bidenImages = [
    biden1, biden2, biden3, biden4, biden5, biden6
];
export const harrisImages = [
    harris1, harris2, harris3, harris4, harris5
];

//subtitle templates
export const subtitleTemplates = [
    {
        title: "Cracked",
        font: "caveat",
        textSize: 120,
        fontSize: "1.5rem",
        fontWeight: "bold",
        templateFont: "font-caveat",
        textTransform: "Uppercase",
        textShadow: "13px 13px 13px #000000",
        sampleText: "The Quick",
    },
    {
        title: "Girl",
        font: "montserrat",
        textSize: 80,
        fontSize: "1.5rem",
        fontWeight: "bold",
        templateFont: "font-montserrat",
        color: "#000000",
        textShadow: `
            0px 0px 5px #ffffff, 
            0px 0px 10px #ff99cc, 
            0px 0px 20px #ff99cc, 
            0px 0px 30px #ff99cc
          `,
        sampleText: "The quick brown fox",
    },
    {
        title: "Umi",
        font: "montserrat",
        textSize: 80,
        fontSize: "1.5rem",
        color: "#EBEE00",
        templateFont: "font-montserrat",
        textShadow: "1px 3px 3px #EBEE00",
        sampleText: "The quick brown",
    },
    {
        title: "Reddit",
        font: "montserrat",
        textSize: 80,
        fontSize: "1.5rem",
        fontWeight: "bolder",
        templateFont: "font-montserrat",
        color: "#EBEE00",
        textBorder: "2px 2px 0px #000000",
        textTransform: "uppercase",
        sampleText: "The quick",
    },
    {
        title: "Hormozi 3",
        font: "montserrat",
        textSize: 80,
        fontSize: "1.5rem",
        fontWeight: "bold",
        templateFont: "font-montserrat",
        color: "#000000",
        textTransform: "uppercase",
        backgroundColor: "#FFBD03",
        borderRadius: "10px",
        padding: "5px",
        width: "fit-content",
        sampleText: "The quick brown fox",
    },
    {
        title: "Brain Teaser",
        font: "caveat",
        textSize: 120,
        fontSize: "1.5rem",
        fontWeight: "bolder",
        templateFont: "font-caveat",
        color: "#F4E908",
        textShadow: "1px 8px 3px #000000",
        textTransform: "uppercase",
        sampleText: "The",
    },
    {
        title: "Devin",
        font: "montserrat",
        textSize: 80,
        fontSize: "1.5rem",
        fontWeight: "bolder",
        templateFont: "font-montserrat",
        color: "#F4E908",
        textShadow: "1px 8px 3px #000000",
        textTransform: "uppercase",
        transform: "rotate(10deg)",
        sampleText: "The Quick Brown",
    }
]

