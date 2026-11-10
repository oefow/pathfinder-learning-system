import { EXTRA_CLASSES } from "./extra-classes.js";
// Format ng quiz questions:
//   mc("Tanong", "TAMANG SAGOT", "mali 1", "mali 2", "mali 3")  -> multiple choice (ginugulo ang pagkakasunod)
//   idq("Tanong", "sagot", "ibang tinatanggap na sagot")        -> identification (type-in)
const mc = (q, ...o) => ({ q, o });
const idq = (q, ...id) => ({ q, id });

const AIM = "The Advent message to all the world in my generation.";
const MOTTO = "The love of Christ compels us.";

const FRIEND = {
  topics: [
    { id: "t1", title: "Aim, Motto and Pledge", body: [
      "Aim: " + AIM,
      "Motto: " + MOTTO,
      "Pledge: By the grace of God, I will be pure and kind and true. I will keep the Pathfinder Law. I will be a servant of God and a friend to man.",
      "The Pathfinder slogan is \"Find a need and fill it.\" Every Pathfinder is invited to notice what people around them need and to help.",
      "Friend is the first Pathfinder class. It is for 10-year-olds, or those in Grade 5." ] },
    { id: "t2", title: "The Pathfinder Law", body: [
      "The Law is a code to shape your life. It says: I will keep the morning watch, do my honest part, care for my body, keep a level eye, be courteous and obedient, walk softly in the sanctuary, keep a song in my heart, and go on God's errand.",
      "That makes 8 points in all.",
      "Keep the morning watch: spend time with God each morning in prayer and Bible study.",
      "Do my honest part: be fair and truthful in everything you do.",
      "Care for my body: choose healthy food, rest, and exercise, and avoid harmful things.",
      "Keep a level eye: look at the world with honesty and purity, and treat others with respect.",
      "Be courteous and obedient: be polite and respect your parents, leaders, and teachers.",
      "Walk softly in the sanctuary: show reverence in church and in worship.",
      "Keep a song in my heart: stay joyful and positive, and share that joy.",
      "Go on God's errand: serve others the way Jesus did." ] },
    { id: "t3", title: "Old Testament books", body: [
      "The Old Testament has 39 books. It starts with Genesis and ends with Malachi.",
      "The books are grouped into five areas: Law (5 books, Genesis to Deuteronomy), History (12 books, Joshua to Esther), Poetry (5 books, Job to Song of Solomon), Major Prophets (5 books, Isaiah to Daniel), and Minor Prophets (12 books, Hosea to Malachi).",
      "Memorize the books in order and practice finding any book quickly in your Bible. Knowing the groups helps you remember where each book belongs." ] },
    { id: "t4", title: "Old Testament heroes", body: [
      "Joseph: his brothers sold him as a slave, yet God was with him. He became a ruler in Egypt and saved his family from famine. See Genesis 37 to 50.",
      "Jonah: God asked him to warn the city of Nineveh. He ran away and was swallowed by a great fish, then obeyed and the people repented. See the book of Jonah.",
      "Esther: a Jewish queen of Persia who bravely spoke to the king and saved her people from Haman's plot. See the book of Esther.",
      "Ruth: she left her homeland to stay loyal to her mother-in-law Naomi. She later married Boaz and became an ancestor of King David. See the book of Ruth.",
      "In each story we see Christ's loving care and deliverance for His people." ] },
    { id: "t5", title: "Being a good friend", body: [
      "The Friend class asks you to discover ten qualities of a good friend and share the two that matter most to you.",
      "Examples of these qualities: kind, honest, loyal, trustworthy, respectful, a good listener, forgiving, helpful, encouraging, and fun to be with.",
      "A good friend includes others, keeps promises, and speaks up kindly when something is wrong." ] },
    { id: "t6", title: "Serving others", body: [
      "Serving means finding a need and filling it. You can help at church, at school, at home, or in your neighborhood.",
      "Ideas: help an elderly neighbor, tidy the church after a program, share a meal, or write an encouraging note.",
      "Plan with your leader, then take action and think about how it helped the other person." ] },
    { id: "t7", title: "Hiking rules and getting lost", body: [
      "Ten sample hiking rules: hike with a buddy, tell an adult your route and return time, stay on the trail, wear sturdy shoes, bring enough water, dress for the weather, carry a whistle and first aid kit, stay with the group, leave no trash, and respect plants and animals.",
      "If you get lost: stop, stay calm, and stay where you are. Use a whistle (three blasts is a call for help), stay visible, and wait for rescuers.",
      "Always pack out your trash so the trail stays clean." ] },
    { id: "t8", title: "Camping and tool safety", body: [
      "Choose flat, dry ground to pitch your tent, clear away sharp objects, and secure the stakes. When you strike (take down) the tent, clean and dry it before storing.",
      "A camp bed keeps you off the cold ground. Use a mat or pad, and keep your sleeping gear dry.",
      "Knife safety: pass a knife handle first with the blade pointing away from you, cut away from your body, and close it when done.",
      "Axe safety: clear a safe area, keep others outside the swing area, and cover the blade when not in use." ] },
  ],
  quizzes: [
    { id: "q1", title: "Pledge, Law and club basics", questions: [
      mc("What is the Pathfinder aim?", AIM, "To win camping contests", "To collect the most badges", "To learn sports"),
      mc("What is the Pathfinder motto?", MOTTO, "Always be prepared", "Find your own way", "Strength in numbers"),
      idq("Complete the pledge: \"By the grace of God, I will be pure and kind and ___.\"", "true"),
      mc("How many points are in the Pathfinder Law?", "8", "5", "10", "12"),
      idq("Complete the Law: \"Keep the morning ___.\"", "watch"),
      idq("Complete the Law: \"Do my honest ___.\"", "part"),
      mc("Which Law point is about health?", "Care for my body", "Keep a level eye", "Do my honest part", "Walk softly in the sanctuary"),
      idq("Complete the Law: \"Keep a level ___.\"", "eye"),
      mc("Friend is the class for which age?", "10 years old (Grade 5)", "11 years old (Grade 6)", "13 years old (Grade 8)", "15 years old (Grade 10)"),
      idq("Complete the pledge: \"I will be a servant of God and a friend to ___.\"", "man", "mankind"),
    ] },
    { id: "q2", title: "Old Testament books and heroes", questions: [
      mc("How many books are in the Old Testament?", "39", "27", "66", "12"),
      mc("Into how many groups are the Old Testament books divided?", "5", "3", "4", "7"),
      idq("What is the first book of the Old Testament?", "Genesis"),
      idq("What is the last book of the Old Testament?", "Malachi"),
      mc("Which group includes Genesis to Deuteronomy?", "Law", "History", "Poetry", "Minor Prophets"),
      mc("Which hero was sold by his brothers and later ruled in Egypt?", "Joseph", "Jonah", "Esther", "Ruth"),
      idq("Which prophet was swallowed by a great fish?", "Jonah"),
      idq("Which woman stayed loyal to her mother-in-law Naomi?", "Ruth"),
      mc("Queen Esther saved her people from whose plot?", "Haman", "Pharaoh", "Goliath", "Nebuchadnezzar"),
      idq("How many books are in the Minor Prophets group?", "12", "twelve"),
    ] },
    { id: "q3", title: "Friendship, service and outdoors", questions: [
      mc("Which is a quality of a good friend?", "Being loyal and honest", "Always winning", "Keeping others out", "Ignoring people in need"),
      idq("When hiking, you should always go with a ___ (a partner).", "buddy"),
      mc("If you are lost on a hike, what should you do?", "Stay where you are and signal for help", "Run in a random direction", "Split up from the group", "Keep walking until dark"),
      idq("What should you pack out instead of leaving behind on a trail?", "trash", "garbage", "litter", "rubbish"),
      mc("How do you safely pass a knife?", "Handle first, blade pointing away", "Blade first", "Toss it gently", "Hold it by the blade tip"),
      mc("When using an axe, where should other people stand?", "Outside the swing area", "Right beside you", "Directly behind you", "Anywhere nearby"),
      idq("What do you pitch and strike when camping?", "tent"),
      mc("Which is an example of serving others?", "Helping a neighbor carry groceries", "Playing a game alone", "Sleeping in on Sabbath", "Keeping a secret to tease someone"),
      idq("The book \"The ___ Path\" explains the Pledge and Law.", "Happy"),
      idq("A ___ bed keeps you off the cold ground when camping. (one word before 'bed')", "camp"),
    ] },
  ],
};

const base = [
  ["friend", "Friend", 10, 5, "#E8A400"],
  ["companion", "Companion", 11, 6, "#2E8B57"],
  ["explorer", "Explorer", 12, 7, "#C8102E"],
  ["ranger", "Ranger", 13, 8, "#1F5FBF"],
  ["voyager", "Voyager", 14, 9, "#7A3FA0"],
  ["guide", "Guide", 15, 10, "#B3121F"],
];

export const CLASSES = base.map(([id, name, age, grade, color]) => ({
  id, name, age, grade, color, ...(id === "friend" ? FRIEND : EXTRA_CLASSES[id]),
}));
