const getAll = () => courses.map(c => ({
  courseNumber: c.courseNumber,
  name: c.name,
  startTime: c.startTime,
  professor: c.professor,
  credits: c.credits,
}));

const getOne = (id) => courses.find(c => c.courseNumber === id);

const courses = [
  {
    courseNumber: "RUN105",
    name: "Ancient Runes",
    startTime: new Date(0,0,0,13),
    professor: "Bathsheba Babbling",
    credits: 3,
  }, {
    courseNumber: "AR205",
    name: "Arithmancy",
    startTime:  new Date(0,0,0,9),
    professor: "Septima Vector",
    credits: 3,
  }, {
    courseNumber: "AST101",
    name: "Astronomy",
    startTime: new Date(0,0,0,11),
    professor: "Aurora Sinistra",
    credits: 3,
    description: "During the first year of studies at Hogwarts, students must study the night skies through their telescopes every Wednesday at midnight and learn the different names of the stars and the movements of the planets.",
    equipment: ["telescopes", "hourglass"],
  }, {
    courseNumber: "MC101",
    name: "Care of Magical Creatures",
    startTime: new Date(0,0,0,14),
    professor: "Rubeus Hagrid",
    credits: 2,
  }, {
    courseNumber: "CH105",
    name: "Charms",
    startTime: new Date(0,0,0,11),
    professor: "Filius Flitwick",
    credits: 3,
    description: "Spells you will learn: Levitation Charm, Wand-Lighting Charm, Lumos Solem, Fire-Making Spell, Softening Charm, Severing Charm, Unlocking Charm, Locking Spell, Mending Charm",
    books: ["The Standard Book of Spells", "Quintessence: A Quest"],
  }, {
    courseNumber: "DDA302-13",
    name: "Defence Against the Dark Arts",
    startTime: new Date(0,0,0,13),
    professor: "Gilderoy Lockhart",
    credits: 4,
    description: "Students learn how to magically defend themselves against Dark Creatures, Dark Arts and against the other Charms.",
    books: [
      "The Dark Forces: A Guide to Self-Protection", "Break with a Banshee", "Gadding with Ghouls", "Holidays with Hags", "Travels with Trolls", "Voyages with Vampires", "Wanderings with Werewolves", "Year with a Yeti", "Defensive Magical Theory", "Dark Arts Defence: Basics for Beginners", "Confronting the Faceless", "The Standard Book of Spells" ],
    equipment: [ "Wand", "Parchment", "Quill" ],
  }, {
    courseNumber: "DIV201-13",
    name: "Divination",
    startTime: new Date(0,0,0,13),
    professor: "Sibyll Trelawney",
    credits: 3,
  }, {
    courseNumber: "FLY101",
    name: "Flying",
    startTime: new Date(0,0,0,9),
    professor: "Madam Hooch",
    credits: 2,
    description: "students learn how to fly broomsticks",
    books: ["Quidditch Through the Ages"],
    equipment: [ "Broomstick", "Wand" ],
  }, {
    courseNumber: "HERB201",
    name: "Herbology",
    startTime: new Date(0,0,0,14),
    professor: "Pomona Sprout",
    credits: 4,
    description: "Students learn to care for and utilize plants, and learn about their magical properties, and what they are used for. Many plants provide ingredients for potions and medicine, while others have magical effects of their own right.",
    books: [ "One Thousand Magical Herbs and Fungi", "Flesh-Eating Trees of the World" ],
    equipment: [ "Dragon-hide gloves", "Earmuffs", "Dragon dung compost", "Mooncalf dung", "Wand" ],
  }, {
    courseNumber: "HM101",
    name: "History of Magic",
    startTime: new Date(0,0,0,11),
    professor: "Cuthbert Binns",
    credits: 3,
    description: "The course is a study of magical history.",
    books: [ "A History of Magic" ],
    equipment: [],
  }, {
    courseNumber: "MUG101",
    name: "Muggle Studies",
    startTime: new Date(0,0,0,9),
    professor: "Alecto Carrow",
    credits: 2,
  }, {
    courseNumber: "POT108",
    name: "Potions",
    startTime: new Date(0,0,0,15),
    professor: "Severus Snape",
    credits: 4,
    description: "Students learn the correct way to brew potions, following specific recipes and using various magical ingredients to create the potions, starting with simple ones first and moving to more advanced ones as they progress in knowledge.",
    books: ["Magical Drafts and Potions", "Advanced Potion Making"],
    equipment: ["Cauldron", "Brass scales", "Phials", "Various ingredients"],
  }, {
    courseNumber: "TRN205",
    name: "Transfiguration",
    startTime: new Date(0,0,0,13),
    professor: "Minerva McGonagall",
    credits: 4,
    description: "Students are taught the art of changing of the form and appearance of an object. There are limits to Transfiguration, which are governed by Gamp's Law of Elemental Transfiguration.",
    books: [ "A Beginner's Guide to Transfiguration by Emeric Switch", "Intermediate Transfiguration", "A Guide to Advanced Transfiguration" ],
    equipment: ["Wand"],
  },
];

module.exports = {
  getAll: getAll,
  getOne: getOne,
  routes: [
    {
      method: 'GET',
      path: '/courses',
      handler:(request, reply) => reply(getAll()),
    },
    {
      method: 'GET',
      path: '/courses/{id}',
      handler: (request, reply) => reply(getOne(request.params.id)),
    },
  ],
};

