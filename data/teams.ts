export interface PlayerSkill {
  id: string;
  name: string;
  description: string;
  attribute:
    | "shooting"
    | "mid_range"
    | "finishing"
    | "dunk"
    | "passing"
    | "ball_handle"
    | "perimeter_defense"
    | "interior_defense"
    | "block"
    | "rebound"
    | "speed"
    | "strength"
    | "clutch";
  bonus: number;
  rarity: "legendary" | "epic" | "rare";
}

export interface LegendaryPlayer {
  id: string;
  fullName: string;
  nickname: string;
  // Short, verifiable tag line for the inspiration field.
  tagline: string;
  position: string;
  skills: PlayerSkill[];
}

export interface HistoricTeam {
  id: string;
  season: string;
  teamName: string;
  teamShortName: string;
  league: "NBA";
  record: string;
  // Key fact that makes this team iconic; used for UI copy.
  note: string;
  players: LegendaryPlayer[];
}

export const HISTORIC_TEAMS: HistoricTeam[] = [
  {
    id: "95-96-bulls",
    season: "1995-96",
    teamName: "Chicago Bulls",
    teamShortName: "Bulls",
    league: "NBA",
    record: "72-10",
    note: "Won the NBA championship; set the regular-season wins record at the time.",
    players: [
      {
        id: "michael-jordan-96",
        fullName: "Michael Jordan",
        nickname: "His Airness",
        tagline: "The closer",
        position: "SG/SF",
        skills: [
          { id: "jordan-fadeaway", name: "Fadeaway Artist", description: "Unstoppable mid-range fadeaway with a contested-shot bonus.", attribute: "mid_range", bonus: 14, rarity: "legendary" },
          { id: "jordan-clutch", name: "Finals Clutch", description: "Performance boost in the final minutes of close games.", attribute: "clutch", bonus: 12, rarity: "legendary" },
        ],
      },
      {
        id: "scottie-pippen-96",
        fullName: "Scottie Pippen",
        nickname: "Pip",
        tagline: "Versatile wing defender",
        position: "SF",
        skills: [
          { id: "pippen-perimeter-d", name: "Lockdown Perimeter", description: "Elite one-through-four defensive versatility.", attribute: "perimeter_defense", bonus: 12, rarity: "legendary" },
          { id: "pippen-pass", name: "Point-Forward Vision", description: "Facilitates for others from the forward spot.", attribute: "passing", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "dennis-rodman-96",
        fullName: "Dennis Rodman",
        nickname: "The Worm",
        tagline: "Rebounding machine",
        position: "PF",
        skills: [
          { id: "rodman-rebound", name: "Board Crasher", description: "Dominates the glass on both ends.", attribute: "rebound", bonus: 14, rarity: "legendary" },
          { id: "rodman-interior-d", name: "Chaos Interior D", description: "Disrupts interior scorers with physicality and timing.", attribute: "interior_defense", bonus: 8, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "86-87-celtics",
    season: "1986-87",
    teamName: "Boston Celtics",
    teamShortName: "Celtics",
    league: "NBA",
    record: "59-23",
    note: "Larry Bird’s final MVP season; reached the NBA Finals.",
    players: [
      {
        id: "larry-bird-87",
        fullName: "Larry Bird",
        nickname: "Larry Legend",
        tagline: "Basketball IQ icon",
        position: "SF/PF",
        skills: [
          { id: "bird-shooting", name: "Carnival Shooter", description: "Elite three-point and free-throw accuracy under pressure.", attribute: "shooting", bonus: 13, rarity: "legendary" },
          { id: "bird-iq", name: "Anticipation", description: "Reads plays before they develop for steals and assists.", attribute: "clutch", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "kevin-mchale-87",
        fullName: "Kevin McHale",
        nickname: "The Black Hole",
        tagline: "Post master",
        position: "PF",
        skills: [
          { id: "mchale-post", name: "Post Footwork", description: "Refined low-post moves and counters.", attribute: "finishing", bonus: 11, rarity: "legendary" },
          { id: "mchale-block", name: "Long Arm Blocker", description: "Shot-blocking timing from the help side.", attribute: "block", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "robert-parish-87",
        fullName: "Robert Parish",
        nickname: "The Chief",
        tagline: "Steady big man",
        position: "C",
        skills: [
          { id: "parish-rebound", name: "Chief Rebound", description: "Reliable defensive rebounding and box-out control.", attribute: "rebound", bonus: 10, rarity: "epic" },
          { id: "parish-finishing", name: "Pick-and-Roll Finisher", description: "Efficient finishing around the rim.", attribute: "finishing", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "00-01-lakers",
    season: "2000-01",
    teamName: "Los Angeles Lakers",
    teamShortName: "Lakers",
    league: "NBA",
    record: "56-26",
    note: "Shaquille O’Neal and Kobe Bryant won their second straight title.",
    players: [
      {
        id: "shaquille-oneal-01",
        fullName: "Shaquille O’Neal",
        nickname: "Shaq Diesel",
        tagline: "Dominant force",
        position: "C",
        skills: [
          { id: "shaq-dunk", name: "Backboard Breaker", description: "Overwhelming power dunks and rim runs.", attribute: "dunk", bonus: 16, rarity: "legendary" },
          { id: "shaq-strength", name: "Post Power", description: "Unmovable strength in the paint.", attribute: "strength", bonus: 12, rarity: "legendary" },
        ],
      },
      {
        id: "kobe-bryant-01",
        fullName: "Kobe Bryant",
        nickname: "Black Mamba",
        tagline: "Relentless scorer",
        position: "SG",
        skills: [
          { id: "kobe-midrange", name: "Mamba Fade", description: "Tough shot-making from the mid-range and elbows.", attribute: "mid_range", bonus: 12, rarity: "legendary" },
          { id: "kobe-perimeter-d", name: "Perimeter Lock", description: "Tenacious one-on-one defense on opposing guards.", attribute: "perimeter_defense", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "derek-fisher-01",
        fullName: "Derek Fisher",
        nickname: "D-Fish",
        tagline: "Clutch floor general",
        position: "PG",
        skills: [
          { id: "fisher-clutch", name: "0.4 Clutch", description: "Raises shooting and decision-making in high-pressure moments.", attribute: "clutch", bonus: 9, rarity: "epic" },
          { id: "fisher-pass", name: "Steady Handler", description: "Reliable ball-handling and entry passes.", attribute: "ball_handle", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "13-14-spurs",
    season: "2013-14",
    teamName: "San Antonio Spurs",
    teamShortName: "Spurs",
    league: "NBA",
    record: "62-20",
    note: "Dominated the NBA Finals with team-ball execution; won the championship.",
    players: [
      {
        id: "tim-duncan-14",
        fullName: "Tim Duncan",
        nickname: "The Big Fundamental",
        tagline: "Fundamental anchor",
        position: "PF/C",
        skills: [
          { id: "duncan-interior-d", name: "Stone Wall Defense", description: "Elite positioning and contest timing in the paint.", attribute: "interior_defense", bonus: 13, rarity: "legendary" },
          { id: "duncan-rebound", name: "Bank Rebound", description: "Consistent box-out and rebound control.", attribute: "rebound", bonus: 9, rarity: "epic" },
        ],
      },
      {
        id: "tony-parker-14",
        fullName: "Tony Parker",
        nickname: "TP",
        tagline: "French speedster",
        position: "PG",
        skills: [
          { id: "parker-speed", name: "Turbo Drive", description: "Explosive speed attacking the rim in transition.", attribute: "speed", bonus: 11, rarity: "legendary" },
          { id: "parker-finishing", name: "Teardrop Finisher", description: "Crafty floaters and finishes in traffic.", attribute: "finishing", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "kawhi-leonard-14",
        fullName: "Kawhi Leonard",
        nickname: "The Klaw",
        tagline: "Two-way wing",
        position: "SF",
        skills: [
          { id: "kawhi-perimeter-d", name: "Klaw Defense", description: "Deflections, steals, and lockdown wing defense.", attribute: "perimeter_defense", bonus: 11, rarity: "legendary" },
          { id: "kawhi-shooting", name: "Corner Three", description: "Reliable three-point shooting from the wings.", attribute: "shooting", bonus: 7, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "14-15-warriors",
    season: "2014-15",
    teamName: "Golden State Warriors",
    teamShortName: "Warriors",
    league: "NBA",
    record: "67-15",
    note: "Won the franchise’s first championship in 40 years with a new pace-and-space style.",
    players: [
      {
        id: "stephen-curry-15",
        fullName: "Stephen Curry",
        nickname: "Chef Curry",
        tagline: "Range revolution",
        position: "PG",
        skills: [
          { id: "curry-shooting", name: "Deep Range", description: "Extreme three-point range with a quick release.", attribute: "shooting", bonus: 16, rarity: "legendary" },
          { id: "curry-handle", name: "Dribble Magician", description: "Elite ball-handling that creates space off the dribble.", attribute: "ball_handle", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "klay-thompson-15",
        fullName: "Klay Thompson",
        nickname: "Game 6 Klay",
        tagline: "Catch-and-fire",
        position: "SG",
        skills: [
          { id: "klay-shooting", name: "Flamethrower", description: "Rapid catch-and-shoot three-point barrages.", attribute: "shooting", bonus: 13, rarity: "legendary" },
          { id: "klay-perimeter-d", name: "Two-Way Guard", description: "Solid perimeter defense against opposing guards.", attribute: "perimeter_defense", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "draymond-green-15",
        fullName: "Draymond Green",
        nickname: "Dray",
        tagline: "Defensive engine",
        position: "PF",
        skills: [
          { id: "draymond-interior-d", name: "Switch Everything", description: "Defensive versatility across all five positions.", attribute: "interior_defense", bonus: 11, rarity: "legendary" },
          { id: "draymond-pass", name: "Short-Roll Passer", description: "Elite playmaking from the roll and elbows.", attribute: "passing", bonus: 8, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "93-94-rockets",
    season: "1993-94",
    teamName: "Houston Rockets",
    teamShortName: "Rockets",
    league: "NBA",
    record: "58-24",
    note: "Hakeem Olajuwon led the Rockets to their first NBA championship.",
    players: [
      {
        id: "hakeem-olajuwon-94",
        fullName: "Hakeem Olajuwon",
        nickname: "The Dream",
        tagline: "Two-way center",
        position: "C",
        skills: [
          { id: "hakeem-block", name: "Rim Protector", description: "Elite shot-blocking and intimidation at the rim.", attribute: "block", bonus: 14, rarity: "legendary" },
          { id: "hakeem-post", name: "Dream Shake", description: "Refined post footwork and counters.", attribute: "finishing", bonus: 11, rarity: "legendary" },
        ],
      },
      {
        id: "clyde-drexler-94",
        fullName: "Clyde Drexler",
        nickname: "Clyde the Glide",
        tagline: "High-flyer",
        position: "SG",
        skills: [
          { id: "drexler-dunk", name: "Glide Dunk", description: "Explosive transition dunks and athletic finishes.", attribute: "dunk", bonus: 12, rarity: "legendary" },
          { id: "drexler-pass", name: "Blazers Passing", description: "Creative passing in the open court.", attribute: "passing", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "otis-thorpe-94",
        fullName: "Otis Thorpe",
        nickname: "Otis",
        tagline: "Hard-nosed forward",
        position: "PF",
        skills: [
          { id: "thorpe-rebound", name: "Physical Rebound", description: "Strong box-outs and offensive rebounding.", attribute: "rebound", bonus: 9, rarity: "epic" },
          { id: "thorpe-finishing", name: "Dump-Off Finisher", description: "Efficient finishes off Hakeem’s passes.", attribute: "finishing", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "71-72-lakers",
    season: "1971-72",
    teamName: "Los Angeles Lakers",
    teamShortName: "Lakers",
    league: "NBA",
    record: "69-13",
    note: "Won the title and set a 33-game winning streak record that still stands.",
    players: [
      {
        id: "wilt-chamberlain-72",
        fullName: "Wilt Chamberlain",
        nickname: "Wilt the Stilt",
        tagline: "Statistical giant",
        position: "C",
        skills: [
          { id: "wilt-rebound", name: "Rebound King", description: "Dominant rebounding on both ends of the floor.", attribute: "rebound", bonus: 16, rarity: "legendary" },
          { id: "wilt-strength", name: "Physical Titan", description: "Overwhelming strength in the post.", attribute: "strength", bonus: 12, rarity: "legendary" },
        ],
      },
      {
        id: "jerry-west-72",
        fullName: "Jerry West",
        nickname: "Mr. Clutch",
        tagline: "Logo legend",
        position: "SG",
        skills: [
          { id: "west-clutch", name: "Clutch Shooter", description: "Raises shooting in high-pressure moments.", attribute: "clutch", bonus: 13, rarity: "legendary" },
          { id: "west-midrange", name: "Sharp Elbow Jumper", description: "Elite mid-range pull-up shooting.", attribute: "mid_range", bonus: 9, rarity: "epic" },
        ],
      },
      {
        id: "gail-goodrich-72",
        fullName: "Gail Goodrich",
        nickname: "Stumpy",
        tagline: "Lefty scorer",
        position: "PG",
        skills: [
          { id: "goodrich-shooting", name: "Lefty Sharpshooter", description: "Reliable perimeter scoring off the catch.", attribute: "shooting", bonus: 9, rarity: "epic" },
          { id: "goodrich-speed", name: "Push-the-Pace", description: "Quick transition attacks.", attribute: "speed", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "82-83-sixers",
    season: "1982-83",
    teamName: "Philadelphia 76ers",
    teamShortName: "76ers",
    league: "NBA",
    record: "65-17",
    note: "Moses Malone and Julius Erving swept the Lakers for the title.",
    players: [
      {
        id: "julius-erving-83",
        fullName: "Julius Erving",
        nickname: "Dr. J",
        tagline: "Aerial artist",
        position: "SF",
        skills: [
          { id: "erving-dunk", name: "Aerial Dunker", description: "Acrobatic and creative dunking at the rim.", attribute: "dunk", bonus: 13, rarity: "legendary" },
          { id: "erving-finishing", name: "Baseline Finisher", description: "Crafty finishes along the baseline.", attribute: "finishing", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "moses-malone-83",
        fullName: "Moses Malone",
        nickname: "Chairman of the Boards",
        tagline: "Rebound machine",
        position: "C",
        skills: [
          { id: "malone-rebound", name: "Offensive Rebound King", description: "Elite offensive rebounding and put-backs.", attribute: "rebound", bonus: 15, rarity: "legendary" },
          { id: "malone-strength", name: "Bully Ball", description: "Physical strength and post positioning.", attribute: "strength", bonus: 9, rarity: "epic" },
        ],
      },
      {
        id: "maurice-cheeks-83",
        fullName: "Maurice Cheeks",
        nickname: "Mo",
        tagline: "Defensive point guard",
        position: "PG",
        skills: [
          { id: "cheeks-perimeter-d", name: "Pickpocket", description: "Elite steals and on-ball defense.", attribute: "perimeter_defense", bonus: 10, rarity: "epic" },
          { id: "cheeks-pass", name: "Steady Distributor", description: "Reliable passing and transition lead.", attribute: "passing", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "88-89-pistons",
    season: "1988-89",
    teamName: "Detroit Pistons",
    teamShortName: "Pistons",
    league: "NBA",
    record: "63-19",
    note: "The \"Bad Boys\" swept the Lakers to win their first title.",
    players: [
      {
        id: "isiah-thomas-89",
        fullName: "Isiah Thomas",
        nickname: "Zeke",
        tagline: "Tough floor general",
        position: "PG",
        skills: [
          { id: "isiah-pass", name: "Bad Boy Passer", description: "Elite court vision and fast-break passing.", attribute: "passing", bonus: 12, rarity: "legendary" },
          { id: "isiah-clutch", name: "Gritty Clutch", description: "Raises performance in physical, close games.", attribute: "clutch", bonus: 9, rarity: "epic" },
        ],
      },
      {
        id: "joe-dumars-89",
        fullName: "Joe Dumars",
        nickname: "Joe D",
        tagline: "Two-way guard",
        position: "SG",
        skills: [
          { id: "dumars-perimeter-d", name: "Bad Boy Lock", description: "Physical perimeter defense against elite scorers.", attribute: "perimeter_defense", bonus: 11, rarity: "legendary" },
          { id: "dumars-shooting", name: "Smooth Shooter", description: "Reliable mid-range and three-point shooting.", attribute: "shooting", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "dennis-rodman-89",
        fullName: "Dennis Rodman",
        nickname: "The Worm",
        tagline: "Rebounding and defense",
        position: "SF/PF",
        skills: [
          { id: "rodman-rebound-89", name: "Hustle Rebound", description: "Relentless pursuit of loose rebounds.", attribute: "rebound", bonus: 13, rarity: "legendary" },
          { id: "rodman-interior-d-89", name: "Bad Boy Interior D", description: "Physical interior defense and intimidation.", attribute: "interior_defense", bonus: 8, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "97-98-bulls",
    season: "1997-98",
    teamName: "Chicago Bulls",
    teamShortName: "Bulls",
    league: "NBA",
    record: "62-20",
    note: "Michael Jordan’s final title run with the Bulls; The Last Dance season.",
    players: [
      {
        id: "michael-jordan-98",
        fullName: "Michael Jordan",
        nickname: "His Airness",
        tagline: "The last dance",
        position: "SG",
        skills: [
          { id: "jordan-clutch-98", name: "Last Shot", description: "Dominates late-game possession with isolation scoring.", attribute: "clutch", bonus: 16, rarity: "legendary" },
          { id: "jordan-perimeter-d-98", name: "Defensive Menace", description: "Elite steals and on-ball defensive pressure.", attribute: "perimeter_defense", bonus: 9, rarity: "epic" },
        ],
      },
      {
        id: "scottie-pippen-98",
        fullName: "Scottie Pippen",
        nickname: "Pip",
        tagline: "Defensive engine",
        position: "SF",
        skills: [
          { id: "pippen-perimeter-d-98", name: "Perimeter Engine", description: "Versatile defense and transition playmaking.", attribute: "perimeter_defense", bonus: 12, rarity: "legendary" },
          { id: "pippen-pass-98", name: "Secondary Creator", description: "Initiates offense for others when needed.", attribute: "passing", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "dennis-rodman-98",
        fullName: "Dennis Rodman",
        nickname: "The Worm",
        tagline: "Rebound machine",
        position: "PF",
        skills: [
          { id: "rodman-rebound-98", name: "Worm Rebound", description: "Relentless offensive and defensive rebounding.", attribute: "rebound", bonus: 14, rarity: "legendary" },
          { id: "rodman-strength-98", name: "Physical Hustle", description: "Strength and physicality on loose balls.", attribute: "strength", bonus: 8, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "85-86-celtics",
    season: "1985-86",
    teamName: "Boston Celtics",
    teamShortName: "Celtics",
    league: "NBA",
    record: "67-15",
    note: "Widely considered one of the greatest teams ever; Bird’s peak Celtics.",
    players: [
      {
        id: "larry-bird-86",
        fullName: "Larry Bird",
        nickname: "Larry Legend",
        tagline: "Peak Bird",
        position: "SF",
        skills: [
          { id: "bird-pass-86", name: "Celtic Passing", description: "Elite court vision and passing from the forward spot.", attribute: "passing", bonus: 12, rarity: "legendary" },
          { id: "bird-shooting-86", name: "Pressure Shooter", description: "Three-level scoring under defensive pressure.", attribute: "shooting", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "kevin-mchale-86",
        fullName: "Kevin McHale",
        nickname: "The Black Hole",
        tagline: "Post technician",
        position: "PF",
        skills: [
          { id: "mchale-post-86", name: "Low Post Master", description: "Counter moves and footwork in the post.", attribute: "finishing", bonus: 12, rarity: "legendary" },
          { id: "mchale-block-86", name: "Help Shot Blocker", description: "Strong weak-side shot blocking.", attribute: "block", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "bill-walton-86",
        fullName: "Bill Walton",
        nickname: "The Big Red Head",
        tagline: "Passing big man",
        position: "C",
        skills: [
          { id: "walton-pass-86", name: "Big Man Passer", description: "Elite passing vision from the center position.", attribute: "passing", bonus: 10, rarity: "epic" },
          { id: "walton-block-86", name: "Redwood Blocker", description: "Length and timing at the rim.", attribute: "block", bonus: 8, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "11-12-heat",
    season: "2011-12",
    teamName: "Miami Heat",
    teamShortName: "Heat",
    league: "NBA",
    record: "46-20",
    note: "LeBron James won his first title with the Heat in a lockout-shortened season.",
    players: [
      {
        id: "lebron-james-12",
        fullName: "LeBron James",
        nickname: "King James",
        tagline: "Two-way freight train",
        position: "SF/PF",
        skills: [
          { id: "lebron-finishing-12", name: "Freight Train Finish", description: "Powerful drives and finishes through contact.", attribute: "finishing", bonus: 14, rarity: "legendary" },
          { id: "lebron-perimeter-d-12", name: "Chase-Down Blocker", description: "Elite weak-side blocks and transition defense.", attribute: "perimeter_defense", bonus: 11, rarity: "legendary" },
        ],
      },
      {
        id: "dwyane-wade-12",
        fullName: "Dwyane Wade",
        nickname: "Flash",
        tagline: "Explosive guard",
        position: "SG",
        skills: [
          { id: "wade-dunk-12", name: "Flash Dunk", description: "Explosive transition and cutting dunks.", attribute: "dunk", bonus: 12, rarity: "legendary" },
          { id: "wade-perimeter-d-12", name: "Pressure Defense", description: "Aggressive on-ball defense and steals.", attribute: "perimeter_defense", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "chris-bosh-12",
        fullName: "Chris Bosh",
        nickname: "CB4",
        tagline: "Stretch big",
        position: "PF/C",
        skills: [
          { id: "bosh-shooting-12", name: "Stretch Mid-Range", description: "Reliable mid-range jumper that opens the floor.", attribute: "mid_range", bonus: 9, rarity: "epic" },
          { id: "bosh-rebound-12", name: "Active Rebounder", description: "Hustle rebounds and box-outs.", attribute: "rebound", bonus: 7, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "90-91-bulls",
    season: "1990-91",
    teamName: "Chicago Bulls",
    teamShortName: "Bulls",
    league: "NBA",
    record: "61-21",
    note: "Michael Jordan’s first title; defeated the Lakers in the Finals.",
    players: [
      {
        id: "michael-jordan-91",
        fullName: "Michael Jordan",
        nickname: "His Airness",
        tagline: "First title MJ",
        position: "SG",
        skills: [
          { id: "jordan-dunk-91", name: "Air Attack", description: "Explosive dunks and athletic finishes at the rim.", attribute: "dunk", bonus: 13, rarity: "legendary" },
          { id: "jordan-perimeter-d-91", name: "Defensive Hawk", description: "Elite steals and perimeter defensive pressure.", attribute: "perimeter_defense", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "scottie-pippen-91",
        fullName: "Scottie Pippen",
        nickname: "Pip",
        tagline: "Emerging wing star",
        position: "SF",
        skills: [
          { id: "pippen-pass-91", name: "Rising Point Forward", description: "Developing playmaking from the wing.", attribute: "passing", bonus: 9, rarity: "epic" },
          { id: "pippen-perimeter-d-91", name: "Long Limb Defense", description: "Uses length to disrupt passing lanes.", attribute: "perimeter_defense", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "horace-grant-91",
        fullName: "Horace Grant",
        nickname: "Specs",
        tagline: "Hard-working forward",
        position: "PF",
        skills: [
          { id: "grant-rebound-91", name: "Grant Rebound", description: "Reliable rebounding and second-chance efforts.", attribute: "rebound", bonus: 9, rarity: "epic" },
          { id: "grant-finishing-91", name: "Dunk Finisher", description: "Athletic finishes off cuts and passes.", attribute: "finishing", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "01-02-kings",
    season: "2001-02",
    teamName: "Sacramento Kings",
    teamShortName: "Kings",
    league: "NBA",
    record: "61-21",
    note: "One of the most entertaining offensive teams in NBA history; reached Western Conference Finals.",
    players: [
      {
        id: "chris-webber-02",
        fullName: "Chris Webber",
        nickname: "C-Webb",
        tagline: "Passing power forward",
        position: "PF",
        skills: [
          { id: "webber-pass-02", name: "Hi-Lo Maestro", description: "Elite passing from the high post.", attribute: "passing", bonus: 12, rarity: "legendary" },
          { id: "webber-midrange-02", name: "Smooth Mid-Range", description: "Reliable elbow jumper and face-up game.", attribute: "mid_range", bonus: 9, rarity: "epic" },
        ],
      },
      {
        id: "jason-williams-02",
        fullName: "Jason Williams",
        nickname: "White Chocolate",
        tagline: "Flashy playmaker",
        position: "PG",
        skills: [
          { id: "williams-handle-02", name: "Showtime Handle", description: "Elite dribbling and crowd-pleasing playmaking.", attribute: "ball_handle", bonus: 12, rarity: "legendary" },
          { id: "williams-pass-02", name: "No-Look Passer", description: "Creative passing that finds cutters in transition.", attribute: "passing", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "peja-stojakovic-02",
        fullName: "Peja Stojaković",
        nickname: "Peja",
        tagline: "Sharpshooter",
        position: "SF",
        skills: [
          { id: "peja-shooting-02", name: "Kings Sharpshooter", description: "Elite catch-and-shoot three-point accuracy.", attribute: "shooting", bonus: 13, rarity: "legendary" },
          { id: "peja-speed-02", name: "Off-Ball Movement", description: "Constant motion to get open on the perimeter.", attribute: "speed", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "02-03-mavs",
    season: "2002-03",
    teamName: "Dallas Mavericks",
    teamShortName: "Mavericks",
    league: "NBA",
    record: "60-22",
    note: "Dirk Nowitzki led the Mavs to the Western Conference Finals with a modern offensive style.",
    players: [
      {
        id: "dirk-nowitzki-03",
        fullName: "Dirk Nowitzki",
        nickname: "Dirk",
        tagline: "One-legged fadeaway",
        position: "PF",
        skills: [
          { id: "dirk-midrange-03", name: "One-Legged Fade", description: "Unstoppable fadeaway jumper from the mid-range.", attribute: "mid_range", bonus: 15, rarity: "legendary" },
          { id: "dirk-shooting-03", name: "Stretch Big", description: "Three-point shooting from a 7-foot frame.", attribute: "shooting", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "steve-nash-03",
        fullName: "Steve Nash",
        nickname: "Nash",
        tagline: "Seven-Seconds-or-Less engine",
        position: "PG",
        skills: [
          { id: "nash-pass-03", name: "Fast-Break Vision", description: "Elite transition passing and court vision.", attribute: "passing", bonus: 13, rarity: "legendary" },
          { id: "nash-shooting-03", name: "Sharpshooting Point", description: "Reliable three-point shooting off the dribble.", attribute: "shooting", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "michael-finley-03",
        fullName: "Michael Finley",
        nickname: "Fin",
        tagline: "Two-way wing",
        position: "SF/SG",
        skills: [
          { id: "finley-shooting-03", name: "Mid-Range Wing", description: "Solid mid-range and perimeter scoring.", attribute: "mid_range", bonus: 8, rarity: "epic" },
          { id: "finley-perimeter-d-03", name: "Wing Defender", description: "Competent perimeter defense on wings.", attribute: "perimeter_defense", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "04-05-suns",
    season: "2004-05",
    teamName: "Phoenix Suns",
    teamShortName: "Suns",
    league: "NBA",
    record: "62-20",
    note: "Mike D’Antoni’s Seven-Seconds-or-Less Suns revolutionized NBA offense.",
    players: [
      {
        id: "steve-nash-05",
        fullName: "Steve Nash",
        nickname: "Nash",
        tagline: "MVP playmaker",
        position: "PG",
        skills: [
          { id: "nash-pass-05", name: "Seven-Seconds Passer", description: "Elite fast-break passing and pick-and-roll reads.", attribute: "passing", bonus: 15, rarity: "legendary" },
          { id: "nash-shooting-05", name: "MVP Shooter", description: "High-efficiency three-point and free-throw shooting.", attribute: "shooting", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "amaré-stoudemire-05",
        fullName: "Amar'e Stoudemire",
        nickname: "STAT",
        tagline: "Roll man terror",
        position: "PF/C",
        skills: [
          { id: "amare-dunk-05", name: "Pick-and-Roll Dunker", description: "Explosive dunks off the roll.", attribute: "dunk", bonus: 14, rarity: "legendary" },
          { id: "amare-finishing-05", name: "Finish Above the Rim", description: "Athletic finishes in traffic.", attribute: "finishing", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "shawn-marion-05",
        fullName: "Shawn Marion",
        nickname: "The Matrix",
        tagline: "Versatile defender",
        position: "SF/PF",
        skills: [
          { id: "marion-speed-05", name: "Transition Runner", description: "Elite speed in the open court.", attribute: "speed", bonus: 11, rarity: "legendary" },
          { id: "marion-perimeter-d-05", name: "Defensive Swiss Army", description: "Versatile defense across multiple positions.", attribute: "perimeter_defense", bonus: 8, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "15-16-warriors",
    season: "2015-16",
    teamName: "Golden State Warriors",
    teamShortName: "Warriors",
    league: "NBA",
    record: "73-9",
    note: "Broke the 1995-96 Bulls’ 72-win record but lost in the NBA Finals.",
    players: [
      {
        id: "stephen-curry-16",
        fullName: "Stephen Curry",
        nickname: "Chef Curry",
        tagline: "Unanimous MVP",
        position: "PG",
        skills: [
          { id: "curry-shooting-16", name: "Logo Range", description: "Pulls up from extreme distances with high accuracy.", attribute: "shooting", bonus: 17, rarity: "legendary" },
          { id: "curry-handle-16", name: "Shake-and-Bake", description: "Elite dribble moves that create open looks.", attribute: "ball_handle", bonus: 11, rarity: "legendary" },
        ],
      },
      {
        id: "klay-thompson-16",
        fullName: "Klay Thompson",
        nickname: "Game 6 Klay",
        tagline: "Catch-and-shoot sniper",
        position: "SG",
        skills: [
          { id: "klay-shooting-16", name: "Barrage", description: "Can score 60 points on dribble-free catches.", attribute: "shooting", bonus: 14, rarity: "legendary" },
          { id: "klay-perimeter-d-16", name: "Defensive Wing", description: "Strong perimeter defense on top guards.", attribute: "perimeter_defense", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "draymond-green-16",
        fullName: "Draymond Green",
        nickname: "Dray",
        tagline: "Defensive anchor",
        position: "PF",
        skills: [
          { id: "draymond-pass-16", name: "Draymond Hub", description: "Initiates offense from the elbows and short roll.", attribute: "passing", bonus: 11, rarity: "legendary" },
          { id: "draymond-interior-d-16", name: "Defensive Anchor", description: "Directs team defense and switches all positions.", attribute: "interior_defense", bonus: 10, rarity: "legendary" },
        ],
      },
    ],
  },
  {
    id: "08-09-lakers",
    season: "2008-09",
    teamName: "Los Angeles Lakers",
    teamShortName: "Lakers",
    league: "NBA",
    record: "65-17",
    note: "Kobe Bryant won his fourth title without Shaquille O’Neal.",
    players: [
      {
        id: "kobe-bryant-09",
        fullName: "Kobe Bryant",
        nickname: "Black Mamba",
        tagline: "Alpha scorer",
        position: "SG",
        skills: [
          { id: "kobe-midrange-09", name: "Mamba Fade", description: "Tough shot-making from the mid-range and elbows.", attribute: "mid_range", bonus: 14, rarity: "legendary" },
          { id: "kobe-clutch-09", name: "Mamba Focus", description: "Relentless scoring focus in late-game situations.", attribute: "clutch", bonus: 11, rarity: "legendary" },
        ],
      },
      {
        id: "pau-gasol-09",
        fullName: "Pau Gasol",
        nickname: "Pau",
        tagline: "Skilled big man",
        position: "PF/C",
        skills: [
          { id: "gasol-post-09", name: "Precision Post", description: "Polished post moves and soft touch around the rim.", attribute: "finishing", bonus: 11, rarity: "legendary" },
          { id: "gasol-pass-09", name: "High-Low Passer", description: "Excellent passing vision from the post.", attribute: "passing", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "lamar-odom-09",
        fullName: "Lamar Odom",
        nickname: "LO",
        tagline: "Versatile forward",
        position: "SF/PF",
        skills: [
          { id: "odom-handle-09", name: "Point Forward Handle", description: "Ball-handling and passing from the forward spot.", attribute: "ball_handle", bonus: 8, rarity: "epic" },
          { id: "odom-rebound-09", name: "Versatile Rebound", description: "Rebounding from multiple positions.", attribute: "rebound", bonus: 7, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "89-90-pistons",
    season: "1989-90",
    teamName: "Detroit Pistons",
    teamShortName: "Pistons",
    league: "NBA",
    record: "59-23",
    note: "Back-to-back champions; the Bad Boys’ second straight title.",
    players: [
      {
        id: "isiah-thomas-90",
        fullName: "Isiah Thomas",
        nickname: "Zeke",
        tagline: "Bad Boys leader",
        position: "PG",
        skills: [
          { id: "isiah-pass-90", name: "Bad Boys Engine", description: "Tough, fast-break playmaking and court command.", attribute: "passing", bonus: 13, rarity: "legendary" },
          { id: "isiah-clutch-90", name: "Championship Clutch", description: "Raises performance in Finals-level pressure.", attribute: "clutch", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "joe-dumars-90",
        fullName: "Joe Dumars",
        nickname: "Joe D",
        tagline: "Finals MVP defender",
        position: "SG",
        skills: [
          { id: "dumars-perimeter-d-90", name: "Finals Lockdown", description: "Elite perimeter defense against star scorers.", attribute: "perimeter_defense", bonus: 12, rarity: "legendary" },
          { id: "dumars-shooting-90", name: "Clutch Shooter", description: "Reliable shooting in high-stakes moments.", attribute: "shooting", bonus: 8, rarity: "epic" },
        ],
      },
      {
        id: "dennis-rodman-90",
        fullName: "Dennis Rodman",
        nickname: "The Worm",
        tagline: "Back-to-back champion",
        position: "SF/PF",
        skills: [
          { id: "rodman-rebound-90", name: "Championship Rebound", description: "Relentless rebounding through two title runs.", attribute: "rebound", bonus: 14, rarity: "legendary" },
          { id: "rodman-interior-d-90", name: "Bad Boy Enforcer", description: "Physical interior defense and intimidation.", attribute: "interior_defense", bonus: 9, rarity: "epic" },
        ],
      },
    ],
  },
  {
    id: "96-97-jazz",
    season: "1996-97",
    teamName: "Utah Jazz",
    teamShortName: "Jazz",
    league: "NBA",
    record: "64-18",
    note: "Reached the NBA Finals behind the Stockton-Malone pick-and-roll.",
    players: [
      {
        id: "karl-malone-97",
        fullName: "Karl Malone",
        nickname: "The Mailman",
        tagline: "Pick-and-roll power",
        position: "PF",
        skills: [
          { id: "malone-finishing-97", name: "Mailman Finish", description: "Powerful pick-and-roll finishes at the rim.", attribute: "finishing", bonus: 14, rarity: "legendary" },
          { id: "malone-strength-97", name: "Freight Train", description: "Overwhelming strength in the post and roll.", attribute: "strength", bonus: 11, rarity: "legendary" },
        ],
      },
      {
        id: "john-stockton-97",
        fullName: "John Stockton",
        nickname: "Stock",
        tagline: "Assist king",
        position: "PG",
        skills: [
          { id: "stockton-pass-97", name: "Pick-and-Roll Master", description: "Elite pick-and-roll passing and reads.", attribute: "passing", bonus: 15, rarity: "legendary" },
          { id: "stockton-perimeter-d-97", name: "Stockton Steal", description: "Elite steals and disruptive perimeter defense.", attribute: "perimeter_defense", bonus: 9, rarity: "epic" },
        ],
      },
      {
        id: "jeff-hornacek-97",
        fullName: "Jeff Hornacek",
        nickname: "Horny",
        tagline: "Sharpshooting guard",
        position: "SG",
        skills: [
          { id: "hornacek-shooting-97", name: "Jazz Sharpshooter", description: "Reliable catch-and-shoot perimeter scoring.", attribute: "shooting", bonus: 9, rarity: "epic" },
          { id: "hornacek-midrange-97", name: "Elbow Jumper", description: "Solid mid-range shooting off the pick-and-roll.", attribute: "mid_range", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
  {
    id: "06-07-mavs",
    season: "2006-07",
    teamName: "Dallas Mavericks",
    teamShortName: "Mavericks",
    league: "NBA",
    record: "67-15",
    note: "Dirk Nowitzki won MVP; the Mavs won 67 games but lost in the first round.",
    players: [
      {
        id: "dirk-nowitzki-07",
        fullName: "Dirk Nowitzki",
        nickname: "Dirk",
        tagline: "MVP season",
        position: "PF",
        skills: [
          { id: "dirk-midrange-07", name: "MVP Fadeaway", description: "Unstoppable one-legged fadeaway jumper.", attribute: "mid_range", bonus: 16, rarity: "legendary" },
          { id: "dirk-shooting-07", name: "MVP Stretch", description: "Three-point range from a 7-foot frame.", attribute: "shooting", bonus: 10, rarity: "legendary" },
        ],
      },
      {
        id: "josh-howard-07",
        fullName: "Josh Howard",
        nickname: "J-Ho",
        tagline: "Two-way wing",
        position: "SF",
        skills: [
          { id: "howard-midrange-07", name: "Mid-Range Wing", description: "Solid mid-range scoring from the wing.", attribute: "mid_range", bonus: 8, rarity: "epic" },
          { id: "howard-perimeter-d-07", name: "Wing Stopper", description: "Competent perimeter defense on wings.", attribute: "perimeter_defense", bonus: 7, rarity: "epic" },
        ],
      },
      {
        id: "jason-terry-07",
        fullName: "Jason Terry",
        nickname: "Jet",
        tagline: "Microwave scorer",
        position: "SG/PG",
        skills: [
          { id: "terry-shooting-07", name: "Jet Three", description: "Quick-trigger three-point shooting off the bench.", attribute: "shooting", bonus: 9, rarity: "epic" },
          { id: "terry-clutch-07", name: "Bench Clutch", description: "Raises scoring in fourth-quarter stretches.", attribute: "clutch", bonus: 6, rarity: "rare" },
        ],
      },
    ],
  },
];

export function getTeamById(id: string): HistoricTeam | undefined {
  return HISTORIC_TEAMS.find((t) => t.id === id);
}

const SKILL_LOOKUP: Record<string, PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam }> = {};

function buildSkillLookup() {
  HISTORIC_TEAMS.forEach((team) => {
    team.players.forEach((player) => {
      player.skills.forEach((skill) => {
        SKILL_LOOKUP[skill.id] = { ...skill, player, team };
      });
    });
  });
}

export function getSkillById(id: string): (PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam }) | undefined {
  return SKILL_LOOKUP[id];
}

buildSkillLookup();

export function getTeamBySeasonSeed(seed: number, pool: HistoricTeam[] = HISTORIC_TEAMS): HistoricTeam {
  const idx = seed % pool.length;
  return pool[idx];
}

export function getDailyTeamPool(seed: number, count: number = 3): HistoricTeam[] {
  const result: HistoricTeam[] = [];
  const used = new Set<number>();
  let offset = 0;
  while (result.length < count && offset < HISTORIC_TEAMS.length * 2) {
    const idx = (seed + offset) % HISTORIC_TEAMS.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(HISTORIC_TEAMS[idx]);
    }
    offset += 1;
  }
  return result;
}

export function getDraftRoundFromTeam(
  team: HistoricTeam,
  round: number,
  seed: number = 0
): { optionA: PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam }; optionB: PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam } } {
  const totalPlayers = team.players.length;
  const playerIdxA = (round * 2 + seed) % totalPlayers;
  const playerIdxB = (round * 3 + seed + 1) % totalPlayers;
  const playerA = team.players[playerIdxA];
  const playerB = team.players[playerIdxB];
  const skillA = playerA.skills[(round + seed) % playerA.skills.length];
  const skillB = playerB.skills[(round + seed + 1) % playerB.skills.length];
  return {
    optionA: { ...skillA, player: playerA, team },
    optionB: { ...skillB, player: playerB, team },
  };
}
