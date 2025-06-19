const questionsData = {
  general: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      answer: "Paris",
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      question: "Which language is primarily spoken in Brazil?",
      options: ["Spanish", "Portuguese", "English", "French"],
      answer: "Portuguese",
    },
    {
      question: "What currency is used in Japan?",
      options: ["Won", "Yuan", "Yen", "Dollar"],
      answer: "Yen",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
  ],
  science: [
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: "Carbon Dioxide",
    },
    {
      question: "What is H₂O?",
      options: ["Oxygen", "Water", "Hydrogen", "Salt"],
      answer: "Water",
    },
    {
      question: "Which part of the cell contains DNA?",
      options: ["Nucleus", "Membrane", "Cytoplasm", "Ribosome"],
      answer: "Nucleus",
    },
    {
      question: "What force pulls objects toward Earth?",
      options: ["Magnetism", "Inertia", "Gravity", "Friction"],
      answer: "Gravity",
    },
    {
      question: "How many legs does an insect have?",
      options: ["4", "6", "8", "10"],
      answer: "6",
    },
  ],
  logic: [
    {
      question: "What comes next: 2, 4, 8, 16, ?",
      options: ["18", "24", "32", "20"],
      answer: "32",
    },
    {
      question: "If you have 3 apples and take away 2, how many do you have?",
      options: ["1", "2", "3", "0"],
      answer: "2",
    },
    {
      question: "Which number is the odd one out: 3, 5, 7, 9, 11?",
      options: ["5", "9", "7", "11"],
      answer: "9",
    },
    {
      question: "Tom is taller than Jerry, and Jerry is taller than Max. Who is the shortest?",
      options: ["Tom", "Jerry", "Max", "None"],
      answer: "Max",
    },
    {
      question: "What is half of 100?",
      options: ["10", "20", "25", "50"],
      answer: "50",
    },
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      options: ["Lincoln", "Jefferson", "Washington", "Roosevelt"],
      answer: "Washington",
    },
    {
      question: "In which year did World War II end?",
      options: ["1942", "1945", "1939", "1950"],
      answer: "1945",
    },
    {
      question: "The Great Wall of China was built to protect against?",
      options: ["Mongols", "Romans", "Vikings", "Indians"],
      answer: "Mongols",
    },
    {
      question: "Which ancient civilization built the pyramids?",
      options: ["Romans", "Mayans", "Egyptians", "Greeks"],
      answer: "Egyptians",
    },
    {
      question: "Who discovered America in 1492?",
      options: ["Columbus", "Magellan", "Cook", "Marco Polo"],
      answer: "Columbus",
    },
  ],
  space: [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Mars"],
      answer: "Jupiter",
    },
    {
      question: "What galaxy do we live in?",
      options: ["Andromeda", "Milky Way", "Whirlpool", "Centaurus A"],
      answer: "Milky Way",
    },
    {
      question: "Which planet has the most moons?",
      options: ["Saturn", "Jupiter", "Mars", "Neptune"],
      answer: "Saturn",
    },
    {
      question: "Which celestial body orbits a planet?",
      options: ["Star", "Comet", "Moon", "Sun"],
      answer: "Moon",
    },
    {
      question: "Which tool is used to observe stars?",
      options: ["Binoculars", "Telescope", "Radar", "Microscope"],
      answer: "Telescope",
    },
  ],
  math: [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "What is the square root of 16?",
      options: ["2", "3", "4", "5"],
      answer: "4",
    },
    {
      question: "What is 5 * 6?",
      options: ["30", "32", "28", "26"],
      answer: "30",
    },
    {
      question: "What is 10 / 2?",
      options: ["3", "4", "5", "6"],
      answer: "5",
    },
    {
      question: "What is the value of pi?",
      options: ["3.14", "2.71", "1.41", "1.61"],
      answer: "3.14",
    },
  ],
  sports: [
    {
      question: "How many players are there on a soccer team?",
      options: ["9", "10", "11", "12"],
      answer: "11",
    },
    {
      question: "Which sport is known as the 'king of sports'?",
      options: ["Basketball", "Soccer", "Cricket", "Tennis"],
      answer: "Soccer",
    },
    {
      question: "In which sport can you score a 'hole in one'?",
      options: ["Golf", "Tennis", "Soccer", "Basketball"],
      answer: "Golf",
    },
    {
      question: "What is the national sport of Japan?",
      options: ["Sumo Wrestling", "Baseball", "Soccer", "Martial Arts"],
      answer: "Sumo Wrestling",
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Germany", "Brazil", "France", "Argentina"],
      answer: "France",
    },
  ],
  movies: [
    {
      question: "Who directed 'Inception'?",
      options: ["Christopher Nolan", "Steven Spielberg", "Martin Scorsese", "Quentin Tarantino"],
      answer: "Christopher Nolan",
    },
    {
      question: "What is the highest-grossing film of all time?",
      options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"],
      answer: "Avatar",
    },
    {
      question: "Which movie features the quote 'I'll be back'?",
      options: ["Terminator", "Predator", "Die Hard", "RoboCop"],
      answer: "Terminator",
    },
    {
      question: "Who played Jack Dawson in 'Titanic'?",
      options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Tom Cruise"],
      answer: "Leonardo DiCaprio",
    },
    {
      question: "What is the name of the wizarding school in Harry Potter?",
      options: ["Hogwarts", "Beauxbatons", "Durmstrang", "Ilvermorny"],
      answer: "Hogwarts",
    },
  ],
  games: [
    {
      question: "What is the best-selling video game of all time?",
      options: ["Minecraft", "Tetris", "Wii Sports", "Grand Theft Auto V"],
      answer: "Minecraft",
    },
    {
      question: "In which year was the original 'Super Mario Bros.' released?",
      options: ["1983", "1985", "1987", "1990"],
      answer: "1985",
    },
    {
      question: "What does 'FPS' stand for in gaming?",
      options: ["First Person Shooter", "Frames Per Second", "Fast Paced Strategy", "Final Player Standing"],
      answer: "First Person Shooter",
    },
    {
      question: "Which company developed the 'Halo' series?",
      options: ["Bungie", "343 Industries", "Epic Games", "Activision"],
      answer: "Bungie",
    },
    {
      question: "What is the name of the fictional continent in 'The Witcher' series?",
      options: ["Tamriel", "Thedas", "Westeros", "Nilfgaard"],
      answer: "Nilfgaard",
    },
  ],
  music: [
    {
      question: "Who is known as the 'King of Pop'?",
      options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
      answer: "Michael Jackson",
    },
    {
      question: "What is the highest-selling album of all time?",
      options: ["Thriller", "Back in Black", "The Dark Side of the Moon", "The Beatles"],
      answer: "Thriller",
    },
    {
      question: "Which band released 'Bohemian Rhapsody'?",
      options: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
      answer: "Queen",
    },
    {
      question: "What genre is Taylor Swift primarily known for?",
      options: ["Pop", "Rock", "Country", "Hip Hop"],
      answer: "Pop",
    },
    {
      question: "Who is the lead singer of U2?",
      options: ["Bono", "Edge", "Adam Clayton", "Larry Mullen Jr."],
      answer: "Bono",
    },
  ],
  art: [
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      answer: "Leonardo da Vinci",
    },
    {
      question: "What is the primary medium used in watercolor painting?",
      options: ["Oil", "Acrylic", "Water", "Charcoal"],
      answer: "Water",
    },
    {
      question: "Which artist is known for his 'Starry Night' painting?",
      options: ["Monet", "Van Gogh", "Picasso", "Dali"],
      answer: "Van Gogh",
    },
    {
      question: "What is the term for a three-dimensional artwork?",
      options: ["Painting", "Sculpture", "Drawing", "Printmaking"],
      answer: "Sculpture",
    },
    {
      question: "Which art movement is characterized by abstract forms and bright colors?",
      options: ["Impressionism", "Cubism", "Surrealism", "Fauvism"],
      answer: "Fauvism",
    },
  ],
  geography: [
    {
      question: "What is the largest desert in the world?",
      options: ["Sahara", "Arabian", "Gobi", "Kalahari"],
      answer: "Sahara",
    },
    {
      question: "Which river is the longest in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      answer: "Nile",
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: "Canberra",
    },
    {
      question: "Which country has the most natural lakes?",
      options: ["Canada", "USA", "Russia", "India"],
      answer: "Canada",
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      answer: "Vatican City",
    },
  ],
};

export default questionsData;
