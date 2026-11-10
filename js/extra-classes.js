// Class-specific study notes and quizzes, adapted from GC Youth Ministries achievement class requirements.
// Additional explanatory lesson sentences are original educational summaries.
const mc = (q,...o) => ({q,o});
const idq = (q,...id) => ({q,id});
export const EXTRA_CLASSES = {
  companion: {
    topics: [
      {
        "id": "t1",
        "title": "Class basics and New Testament",
        "body": [
          "Companion is intended for age 11 or Grade 6.",
          "The New Testament contains 27 books.",
          "The four New Testament divisions are Gospels, History, Letters and Prophecy.",
          "Matthew, Mark, Luke and John are the four Gospels.",
          "Acts records the early Christian church and is the History division.",
          "The first New Testament book is Matthew.",
          "The final New Testament book is Revelation.",
          "The New Testament History book is Acts.",
          "Paul wrote letters to Christian churches and individuals.",
          "Companion students study the Gospels of Matthew and Mark."
        ]
      },
      {
        "id": "t2",
        "title": "Faith, service and health",
        "body": [
          "Companion class reviews the meaning of the Pathfinder Pledge.",
          "Companion students study a parable or miracle of Christ, the Sermon on the Mount, or the Second Advent sermon.",
          "Companion service includes at least two hours showing companionship to someone.",
          "Companion includes learning the harmful effects of smoking.",
          "Companion includes memorizing and explaining 1 Corinthians 9:24–27.",
          "Companion emphasizes respect for people of different cultures and gender.",
          "Companion requires planning and leading a devotional service.",
          "Companion discusses regular exercise for healthful living.",
          "Companion asks for a community or church project lasting at least half a day.",
          "The class includes the Advanced Beginner’s Swimming Honor."
        ]
      },
      {
        "id": "t3",
        "title": "Nature, navigation and camp skills",
        "body": [
          "The eight compass directions are N, NE, E, SE, S, SW, W and NW.",
          "Companion includes a two-night campout.",
          "A sheet bend is useful for joining two ropes, including different thicknesses.",
          "A taut-line hitch is adjustable and can tension a tent guyline.",
          "Companion nature honors include Trees, Birds, Reptiles and Shells.",
          "North is opposite south.",
          "East is opposite west.",
          "The sheepshank knot is traditionally used to shorten a rope temporarily.",
          "The timber hitch is used to attach rope around a log or timber.",
          "Companion requires a first-aid test at its own level."
        ]
      }
    ],
    quizzes: [
      { id: "q1", title: "Class basics and New Testament", questions: [
        mc("What is the usual Companion age?","11","10","12","14"),
        mc("How many books are in the New Testament?","27","39","66","12"),
        mc("How many main New Testament divisions are there?","4","3","5","6"),
        mc("Which is a Gospel?","Mark","Genesis","Psalms","Revelation"),
        mc("Which book records the early church?","Acts","Exodus","Job","Malachi"),
        idq("What is the first New Testament book?","Matthew"),
        idq("What is the last New Testament book?","Revelation"),
        idq("Which New Testament book is in the History division?","Acts"),
        idq("Who wrote many New Testament letters?","Paul"),
        idq("Name one Gospel specifically studied in Companion besides Matthew.","Mark"),
      ] },
      { id: "q2", title: "Faith, service and health", questions: [
        mc("Which commitment does Companion review?","Pathfinder Pledge","Scout Oath","National Anthem","Campfire Code"),
        mc("Which is an approved Companion spiritual study topic?","Sermon on the Mount","Roman mythology","Greek legends","Astronomy only"),
        mc("How long is the companionship service requirement?","2 hours","10 minutes","1 week","24 hours"),
        mc("Which habit is discussed as harmful to health?","Smoking","Reading","Walking","Swimming"),
        mc("Which passage is used for physical fitness?","1 Corinthians 9:24–27","Genesis 1:1","Psalm 150:6","Revelation 22:21"),
        idq("What attitude is taught toward different cultures?","Respect"),
        idq("What type of service should a Companion plan and lead?","Devotional"),
        idq("What regular activity supports physical fitness?","Exercise"),
        idq("What portion of a day is required for the service project?","Half day","Half a day"),
        idq("Which swimming honor is part of Companion?","Advanced Beginners Swimming","Advanced Beginner Swimming"),
      ] },
      { id: "q3", title: "Nature, navigation and camp skills", questions: [
        mc("How many general compass directions are there?","8","4","6","12"),
        mc("How many nights is the Companion campout?","2","1","3","5"),
        mc("Which knot joins ropes of different sizes?","Sheet bend","Overhand","Bowline","Clove hitch"),
        mc("Which hitch can adjust a tent guyline?","Taut-line hitch","Square knot","Fishermans knot","Granny knot"),
        mc("Which is an eligible Companion nature honor?","Trees","Car engines","Computer repair","Wood welding"),
        idq("Which direction is opposite south?","North"),
        idq("Which direction is opposite west?","East"),
        idq("Which knot shortens a rope temporarily?","Sheepshank"),
        idq("Which hitch is used around a log?","Timber hitch"),
        idq("What safety subject is tested in Companion?","First aid","First-aid"),
      ] },
    ],
  },
  explorer: {
    topics: [
      {
        "id": "t1",
        "title": "Scripture and class foundations",
        "body": [
          "Explorer is usually for age 12 or Grade 7.",
          "A Bible concordance is an alphabetical index to Bible words and their references.",
          "Explorer studies the Gospels of Luke and John.",
          "John 13:12–17 highlights Jesus’ example of humility and service.",
          "John 14:1–3 contains Jesus’ promise to come again.",
          "In John 3, Jesus speaks with Nicodemus.",
          "In John 4, Jesus meets a woman at a well.",
          "Luke 15 includes the parable of the Prodigal Son.",
          "Luke 10 includes the parable of the Good Samaritan.",
          "Luke 19 describes Jesus meeting Zacchaeus."
        ]
      },
      {
        "id": "t2",
        "title": "Leadership, choices and service",
        "body": [
          "Explorer includes helping a community service organization.",
          "Explorer asks for participation in at least three church programs.",
          "Explorer discusses peer pressure and how it influences decisions.",
          "Explorer leadership includes leading opening exercises or a Sabbath School program.",
          "Explorer health lessons discuss alcohol and its physical effects.",
          "The Explorer class emphasizes making thoughtful decisions under peer pressure.",
          "The Great Commission appears in Matthew 28:18–20.",
          "Explorer advanced mission study includes J. N. Andrews.",
          "Explorer plans an outreach activity for people in need.",
          "An Explorer may tour municipal offices and learn ways to cooperate with officials."
        ]
      },
      {
        "id": "t3",
        "title": "Stars, maps and camping",
        "body": [
          "Explorer participates in a two-night campout.",
          "A topographic map shows terrain features and elevation using contour lines.",
          "Contour lines join points of equal elevation.",
          "Explorer nature study includes Orion.",
          "Explorer includes planning and cooking two meals during camp.",
          "The Northern Hemisphere night sky can be navigated using the North Star.",
          "Explorer nature study can include the Pleiades star cluster.",
          "Explorer first aid is part of outdoor life.",
          "A campsite should be on stable ground away from flood-prone areas.",
          "Explorer camp cooking involves preparing two meals."
        ]
      }
    ],
    quizzes: [
      { id: "q1", title: "Scripture and class foundations", questions: [
        mc("What is the Explorer age?","12","10","11","15"),
        mc("What helps locate Bible verses by keyword?","Concordance","Compass","Calendar","Dictionary of plants"),
        mc("Which pair of Gospels is studied?","Luke and John","Genesis and Exodus","Matthew and Psalms","Acts and Romans"),
        mc("Which quality does Jesus teach in John 13?","Humility","Pride","Greed","Anger"),
        mc("Which passage speaks of Jesus returning?","John 14:1–3","Genesis 6:1","Psalm 1:1","Exodus 20:1"),
        idq("Who speaks with Jesus in John 3?","Nicodemus"),
        idq("Where does Jesus meet the Samaritan woman?","Well","A well"),
        idq("Which son returns home in Luke 15?","Prodigal son"),
        idq("Who helps the injured traveler in Luke 10?","Good Samaritan","Samaritan"),
        idq("Who climbs a tree to see Jesus?","Zacchaeus","Zaccheus"),
      ] },
      { id: "q2", title: "Leadership, choices and service", questions: [
        mc("Who should Explorers assist in their community?","A community service organization","Only themselves","Only sports teams","Nobody"),
        mc("How many church programs are required?","3","1","2","8"),
        mc("What social influence is examined?","Peer pressure","Gravity","Weather","Tides"),
        mc("Which is an Explorer leadership activity?","Lead opening exercises","Skip every meeting","Avoid responsibilities","Ignore instructions"),
        mc("Which substance is discussed in Explorer health?","Alcohol","Water","Oxygen","Milk"),
        idq("What skill helps resist harmful peer pressure?","Decision making","Decision-making"),
        idq("Which Gospel contains the Great Commission?","Matthew"),
        idq("Name the Adventist missionary studied in Explorer advanced work.","J N Andrews","John Nevins Andrews"),
        idq("What is the term for service that reaches the community?","Outreach"),
        idq("What kind of offices may Explorers tour?","Municipal","Municipal offices"),
      ] },
      { id: "q3", title: "Stars, maps and camping", questions: [
        mc("How many nights is an Explorer campout?","2","1","4","7"),
        mc("What kind of map shows elevation and contours?","Topographic map","Political map only","Road sign","Star chart"),
        mc("What do contour lines connect?","Equal elevation","Equal rainfall","Equal temperature","Equal population"),
        mc("Which constellation is studied in Explorer?","Orion","Pegasus only","Leo only","Draco only"),
        mc("How many meals are planned and cooked?","2","1","5","8"),
        idq("What star indicates north in the Northern Hemisphere?","North Star","Polaris"),
        idq("Which star cluster is studied with Orion?","Pleiades"),
        idq("What emergency skill is tested?","First aid","First-aid"),
        idq("What kind of ground is best for pitching a tent?","Stable","Level","Dry"),
        idq("What activity prepares food during camp?","Cooking","Camp cooking"),
      ] },
    ],
  },
  ranger: {
    topics: [
      {
        "id": "t1",
        "title": "Faith and Christian discipleship",
        "body": [
          "Ranger is for age 13 or Grade 8.",
          "The Adventist Youth aim is the Advent message to all the world in my generation.",
          "The Adventist Youth motto is The love of Christ compels us.",
          "Ranger studies the marks of a true disciple of Jesus.",
          "Bible marking helps organize Bible passages on a particular subject.",
          "Ranger class requires an active Pathfinder Club member.",
          "Ranger class includes a current Memory Gem Certificate.",
          "The Ranger class asks students to explore Christianity.",
          "The Ranger advanced requirement includes Christian Citizenship Honor.",
          "The AY motto mentions the love of Christ."
        ]
      },
      {
        "id": "t2",
        "title": "Community, relationships and fitness",
        "body": [
          "Ranger outreach includes two different kinds of outreach programs.",
          "Ranger service includes at least eight hours on a project with a friend.",
          "Ranger friendship topics include self-confidence, friendship, social graces and willpower.",
          "Ranger health work includes planning a regular exercise program.",
          "Ranger outdoor life includes a two-night campout.",
          "The Good Samaritan is a model of compassionate neighborly service.",
          "Ranger students attend a church business meeting.",
          "Social graces refer to respectful and considerate behavior.",
          "Willpower helps a person stick to a wise decision.",
          "Ranger first aid is a required outdoor skill."
        ]
      },
      {
        "id": "t3",
        "title": "Nature and wilderness skills",
        "body": [
          "Ranger studies the story of Noah and the Flood.",
          "Ranger examines at least three different fossils.",
          "A reflector oven uses reflected campfire heat for cooking.",
          "A rucksack is a backpack for carrying camping gear.",
          "Ranger advanced outdoor life includes orienteering.",
          "A fossil is preserved evidence of past life.",
          "The Ranger campout requires packing personal gear and food.",
          "Ranger nature work includes completing a Nature Honor not already earned.",
          "Orienteering commonly uses a map and compass.",
          "A reflector oven is used for camp cooking."
        ]
      }
    ],
    quizzes: [
      { id: "q1", title: "Faith and Christian discipleship", questions: [
        mc("What is the Ranger age?","13","12","14","15"),
        mc("What is the Adventist Youth aim about?","Sharing the Advent message","Winning races","Collecting badges","Selling equipment"),
        mc("What motivates service in the AY motto?","Love of Christ","Fear of exams","Winning prizes","Competition"),
        mc("What kind of person follows Jesus’ teachings?","Disciple","Spectator","Tourist","Opponent"),
        mc("What is Bible marking used for?","Studying connected Bible topics","Measuring a tent","Counting money","Mapping trails"),
        idq("What club must a Ranger actively join?","Pathfinder Club","Pathfinders"),
        idq("What certificate relates to memorized Bible verses?","Memory Gem"),
        idq("What faith is discussed in Ranger spiritual discovery?","Christianity"),
        idq("Which citizenship honor appears in Ranger advanced work?","Christian Citizenship"),
        idq("Whose love compels us according to the motto?","Christ","Jesus Christ"),
      ] },
      { id: "q2", title: "Community, relationships and fitness", questions: [
        mc("How many types of outreach are required?","2","1","3","5"),
        mc("How many hours are required for the full-day service project?","8","2","4","12"),
        mc("Which is a Ranger friendship discussion topic?","Self-confidence","Astronomy only","Coding only","Navigation only"),
        mc("Which plan supports Ranger fitness?","Regular exercise program","No sleep","Skipping meals","Avoiding water"),
        mc("How many nights is the Ranger campout?","2","1","3","4"),
        idq("Which parable models helping neighbors?","Good Samaritan","The Good Samaritan"),
        idq("What type of church meeting do Rangers attend?","Business meeting","Church business meeting"),
        idq("What phrase describes polite social behavior?","Social graces"),
        idq("What ability helps resist unhealthy impulses?","Willpower","Will power"),
        idq("What emergency-care skill does Ranger test?","First aid","First-aid"),
      ] },
      { id: "q3", title: "Nature and wilderness skills", questions: [
        mc("Which Bible event is linked to Ranger fossil study?","Flood","Exodus","Pentecost","Creation of stars"),
        mc("How many fossils are studied?","3","1","2","10"),
        mc("What cooking device reflects fire heat?","Reflector oven","Microwave","Refrigerator","Water filter"),
        mc("What carries personal equipment during a campout?","Rucksack","Notebook","Bucket","Plate"),
        mc("Which skill involves navigating terrain with map and compass?","Orienteering","Knitting","Painting","Singing"),
        idq("What is preserved evidence of ancient organisms called?","Fossil"),
        idq("What must a Ranger pack besides personal gear?","Food"),
        idq("What type of honor is required for nature study?","Nature Honor","Nature"),
        idq("Which instrument indicates direction?","Compass"),
        idq("What activity is a reflector oven used for?","Cooking"),
      ] },
    ],
  },
  voyager: {
    topics: [
      {
        "id": "t1",
        "title": "Faith and spiritual growth",
        "body": [
          "Voyager is intended for age 14 or Grade 9.",
          "Voyager explores the work of the Holy Spirit in spiritual growth.",
          "Voyager studies the Second Advent, the return of Jesus Christ.",
          "Voyager explores the Bible meaning of Sabbath keeping.",
          "Voyager asks members to explain the Adventist Youth Pledge.",
          "The seventh day is the biblical Sabbath in Adventist teaching.",
          "The Second Advent refers to the return of Jesus.",
          "Voyager advanced Bible reading may include the book of Habakkuk.",
          "The Holy Spirit is studied in relation to spiritual growth.",
          "Voyager includes a current Memory Gem Certificate."
        ]
      },
      {
        "id": "t2",
        "title": "Relationships, service and church",
        "body": [
          "Voyager invites a friend to a church or conference youth fellowship activity.",
          "Voyager friendship topics include self-concept, relationships, money and peer pressure.",
          "Voyager class includes organizing a service project for others.",
          "Voyager leadership includes a chart of local church organization.",
          "Voyager includes the Drilling and Marching Honor.",
          "Earning and spending money is part of Voyager friendship discussions.",
          "Voyager discusses how to handle peer pressure.",
          "The Stewardship Honor is part of Voyager leadership development.",
          "Voyager includes planning a health party.",
          "The butterfly life cycle is compared with the story of Nicodemus."
        ]
      },
      {
        "id": "t3",
        "title": "Wilderness, health and nature",
        "body": [
          "Voyager wilderness hike is 25 kilometers.",
          "The Voyager wilderness hike includes at least four people and an experienced adult counselor.",
          "Voyager wilderness hiking includes one night outdoors or in tents.",
          "Voyager nature study may use the butterfly life cycle.",
          "Voyager outdoor life includes a first-aid test.",
          "Voyager wilderness study observes terrain, flora and fauna.",
          "What word means animals of an area? Fauna.",
          "The Voyager hike is conducted in a rural wilderness area.",
          "Voyager advanced camping includes designing camp furniture.",
          "Voyager includes completing a recreational honor not previously earned."
        ]
      }
    ],
    quizzes: [
      { id: "q1", title: "Faith and spiritual growth", questions: [
        mc("What is the Voyager age?","14","12","13","15"),
        mc("Who helps believers grow spiritually in Voyager study?","Holy Spirit","King Saul","Moses alone","Roman emperor"),
        mc("What event is the Second Advent?","Return of Jesus","Creation week","Exodus","Baptism of John"),
        mc("Which day is central to Voyager Sabbath study?","Sabbath","Monday","Tuesday","Thursday"),
        mc("Which pledge is studied in Voyager?","Adventist Youth Pledge","Olympic oath","Scout motto only","National pledge only"),
        idq("Which numbered day is the Sabbath?","Seventh","7th"),
        idq("Who returns at the Second Advent?","Jesus","Jesus Christ"),
        idq("Name the minor prophet book included in Voyager advanced reading.","Habakkuk"),
        idq("What kind of growth is emphasized in this study?","Spiritual"),
        idq("What certificate recognizes Bible verse memory work?","Memory Gem"),
      ] },
      { id: "q2", title: "Relationships, service and church", questions: [
        mc("Who is invited to youth fellowship?","A friend","Only a pastor","Only a teacher","Nobody"),
        mc("Which is a Voyager friendship topic?","Self-concept","Rocket design","Volcano mapping","Aircraft repair"),
        mc("Which project is required?","Service project","Private shopping","Video gaming","Competition only"),
        mc("What diagram shows church departments and their relationships?","Flow chart","Pie recipe","Road map","Star map"),
        mc("Which honor teaches coordinated formations and marching?","Drilling and Marching","Painting","Basketry","Swimming"),
        idq("What resource is considered in earning and spending?","Money"),
        idq("What influence from friends is discussed?","Peer pressure"),
        idq("Which honor addresses responsible management of resources?","Stewardship"),
        idq("What type of party promotes health principles?","Health party"),
        idq("Which person is linked to the butterfly illustration?","Nicodemus"),
      ] },
      { id: "q3", title: "Wilderness, health and nature", questions: [
        mc("What is the Voyager wilderness hike distance in kilometers?","25","8","10","15"),
        mc("What is the minimum group size for the wilderness hike?","4","2","3","8"),
        mc("How many nights are included in the hike?","1","2","3","0"),
        mc("Which insect is studied as a life-cycle illustration?","Butterfly","Ant","Beetle","Dragonfly"),
        mc("Which emergency skill is assessed?","First aid","Photography","Wood carving","Astronomy"),
        idq("What word means plants of an area?","Flora"),
        idq("What word means animals of an area?","Fauna"),
        idq("What kind of area is used for the Voyager hike?","Wilderness","Rural wilderness"),
        idq("What type of furniture is designed for camp?","Camp furniture"),
        idq("Which category of honor is required in outdoor living?","Recreational","Recreation"),
      ] },
    ],
  },
  guide: {
    topics: [
      {
        "id": "t1",
        "title": "Spiritual growth and Adventist history",
        "body": [
          "Guide is intended for age 15 or Grade 10.",
          "Guide studies the AY Legion of Honor.",
          "Galatians 5:22–23 describes the fruit of the Spirit.",
          "Guide studies how the Old Testament sanctuary points to Jesus and the cross.",
          "Guide class includes reading and outlining three Adventist pioneer stories.",
          "The first fruit of the Spirit named in Galatians 5:22 is love.",
          "The Guide class studies the gifts or fruit of the Spirit in Christian life.",
          "Guide advanced study includes the book Steps to Christ.",
          "Guide class studies the history of Adventist pioneers.",
          "The sanctuary study points to the ministry of Jesus."
        ]
      },
      {
        "id": "t2",
        "title": "Outreach, leadership and health",
        "body": [
          "Guide outreach can include visiting a shut-in person.",
          "Guide leadership includes attending Basic Pathfinder Staff Training.",
          "Guide teaches at least two requirements of a Pathfinder Honor to younger Pathfinders.",
          "Guide studies choosing a career and moral behavior.",
          "Guide health work includes presenting good-health principles to elementary students.",
          "Guide leadership involves teaching Junior Pathfinders.",
          "Guide health work can include a Fun Run.",
          "Guide studies moral behavior and life decisions.",
          "Guide can help a person or family in need.",
          "Guide prepares a denominational organization flow chart."
        ]
      },
      {
        "id": "t3",
        "title": "Nature, camping and advanced skills",
        "body": [
          "Guide outdoor living includes a two-night pack camp.",
          "Guide plans a three-course meal cooked over an open fire.",
          "Guide nature study includes Ecology or Environmental Conservation honors.",
          "Guide outdoor living includes a project using lashings or rope work.",
          "Guide studies nature lessons drawn from Jesus’ childhood as described in The Desire of Ages.",
          "A lashing is a method of fastening poles with rope.",
          "Ecology studies relationships between organisms and their environment.",
          "Guide nature study also offers Environmental Conservation Honor.",
          "Guide camp cooking includes preparing a meal over an open fire.",
          "Guide advanced outdoor work includes the Wilderness Master."
        ]
      }
    ],
    quizzes: [
      { id: "q1", title: "Spiritual growth and Adventist history", questions: [
        mc("What is the Guide age?","15","12","13","14"),
        mc("Which AY commitment is studied in Guide?","AY Legion of Honor","Scout promise","National anthem","Camp motto"),
        mc("Which Bible book lists the fruit of the Spirit?","Galatians","Exodus","Jonah","Esther"),
        mc("What Old Testament service points toward Christ?","Sanctuary service","Harvest festival","Royal coronation","Census"),
        mc("How many pioneer stories are required?","3","1","2","5"),
        idq("What fruit of the Spirit is named first?","Love"),
        idq("Who produces spiritual fruit in believers?","Holy Spirit","Spirit"),
        idq("Which Ellen White book is read for advanced Guide work?","Steps to Christ"),
        idq("What term describes early Adventist leaders?","Pioneers","Adventist pioneers"),
        idq("Whose ministry is highlighted by the sanctuary?","Jesus","Jesus Christ"),
      ] },
      { id: "q2", title: "Outreach, leadership and health", questions: [
        mc("Which is an approved Guide outreach activity?","Visiting a shut-in person","Ignoring neighbors","Skipping service","Only watching television"),
        mc("Which training course does Guide attend?","Basic Pathfinder Staff Training","Driver training","Advanced diving","Aircraft maintenance"),
        mc("How many honor requirements should a Guide teach?","2","1","3","6"),
        mc("Which topic is in Guide friendship development?","Choosing a career","Rocket fuel","Volcanoes","Tides"),
        mc("Who receives a Guide health presentation?","Elementary students","Only senior citizens","Only teachers","Only adults"),
        idq("Who are the younger members taught by Guides?","Junior Pathfinders"),
        idq("What running event can Guide organize?","Fun Run"),
        idq("What adjective describes behavior guided by right and wrong?","Moral"),
        idq("Who may be adopted for a service project?","Family","A family"),
        idq("What diagram illustrates denominational organization?","Flow chart","Flowchart"),
      ] },
      { id: "q3", title: "Nature, camping and advanced skills", questions: [
        mc("How many nights is the Guide pack camp?","2","1","3","4"),
        mc("How many courses are in the Guide camp meal?","3","1","2","5"),
        mc("Which is a Guide nature honor?","Ecology","Car racing","Sewing only","Music only"),
        mc("Which skill joins poles using rope?","Lashing","Typing","Swimming","Painting"),
        mc("Which book is used for Guide nature lessons?","The Desire of Ages","Acts","The Happy Path","Revelation"),
        idq("What is the rope fastening method for poles called?","Lashing"),
        idq("What is the study of organisms and their environment called?","Ecology"),
        idq("Which honor focuses on protecting the environment?","Environmental Conservation"),
        idq("What heat source is used for the Guide three-course meal?","Open fire","Fire"),
        idq("Which master award is named in advanced Guide outdoor living?","Wilderness Master"),
      ] },
    ],
  },
};