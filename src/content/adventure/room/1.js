const room = [
  {
    id: "U165DQ",
    name: "Pathway into the cave",
    description: "The cave extends into a long tunnel, the walls of which only a meter or two apart. The path of dried mud beneath you stretches further into the cave. The walls on the west and east are dry and roughly cut. The smell of stale dirt permeates the stoney hallway. A soft breeze rolls in from the south, along with the soft rustling of bushes and leaves.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "KGZYIL",
        name: "South",
        description: "This exit has no description",
        type: "exit",
        parent: "U165DQ",
        target: "8M9I3L",
        room: "U165DQ"
      },
      {
        id: "HQO7C2",
        name: "North",
        description: "This exit has no description",
        type: "exit",
        parent: "U165DQ",
        target: "XOP8PV",
        room: "U165DQ"
      }
    ],
    area: 1
  },
  {
    id: "XOP8PV",
    name: "Deeper into the tunnel",
    description: "The wall on the east seems to spread away from the rest of the tunnel. The faint sound of distant bat wings and scurrying paws can be heard from further within the cave. A streak of dried water marks the wall on the right, seemingly leaked down from a crack in the ceiling. The ground is covered in a mixture of dried mud and gravel.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "RF42EW",
        name: "South",
        description: "This exit has no description",
        type: "exit",
        parent: "XOP8PV",
        target: "U165DQ",
        room: "XOP8PV"
      },
      {
        id: "5WWJ57",
        name: "Northeast",
        description: "This exit has no description",
        type: "exit",
        parent: "XOP8PV",
        target: "44T8BJ",
        room: "XOP8PV"
      }
    ],
    area: 1
  },
  {
    id: "44T8BJ",
    name: "Gentle Curve",
    description: "The gravel turns thicker as the path curves towards the east, deeper into the cave. The light eminating from the south reflects on the northern walls, creating a soft relief of shadows among the rocky walls.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "13045Q",
        name: "Southwest",
        description: "This exit has no description",
        type: "exit",
        parent: "44T8BJ",
        target: "XOP8PV",
        room: "44T8BJ"
      },
      {
        id: "ZWPB7M",
        name: "East",
        description: "This exit has no description",
        type: "exit",
        parent: "44T8BJ",
        target: "BR8YQK",
        room: "44T8BJ"
      }
    ],
    area: 1
  },
  {
    id: "BR8YQK",
    name: "Curved cave tunnel",
    description: "Rough cavernous walls continue towards the east and the west along a dark tunnel. Further to the west a smidge of light can be seen, seemingly bouncing from an nearby exit to the outside. The tunnel towards the east grows increasingly dim, with the smell of dried bat feces growing stronger. The gravel under your feet shifts slightly as you walk on it.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "YJ4XGX",
        name: "West",
        description: "This exit has no description",
        type: "exit",
        parent: "BR8YQK",
        target: "44T8BJ",
        room: "BR8YQK"
      },
      {
        id: "S5WIZ8",
        name: "East",
        description: "This exit has no description",
        type: "exit",
        parent: "BR8YQK",
        target: "ZAM77T",
        room: "BR8YQK"
      }
    ],
    area: 1
  },
  {
    id: "ZAM77T",
    name: "Rough cave tunnel",
    description: "A threeway of paths here split towards towards different parts of the cave. To the east, the slighest shimmer of outside light can be seen. The paths north and east seem to lead further into the cave, both seemingly bathed in a thick darkness. The occasional bat flies through overhead, seemingly making it ways out of the cave.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "OZ8GIL",
        name: "West",
        description: "This exit has no description",
        type: "exit",
        parent: "ZAM77T",
        target: "BR8YQK",
        room: "ZAM77T"
      },
      {
        id: "J5MYJQ",
        name: "North",
        description: "This exit has no description",
        type: "exit",
        parent: "ZAM77T",
        target: "133GIH",
        room: "ZAM77T"
      },
      {
        id: "NO2TMT",
        name: "East",
        description: "This exit has no description",
        type: "exit",
        parent: "ZAM77T",
        target: "9IA2R6",
        room: "ZAM77T"
      }
    ],
    area: 1
  },
  {
    id: "133GIH",
    name: "Deep inside the cave",
    description: "The tunnel turns dark as the outside light falls off completely. Several bats skitter among the ceiling making their way in and out of the cave. The walls are covered in a thin layer of goop, presumably from bat excrement. The smell eminating from the cave grows increasingly musk.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "ZPYXH4",
        name: "South",
        description: "This exit has no description",
        type: "exit",
        parent: "133GIH",
        target: "ZAM77T",
        room: "133GIH"
      },
      {
        id: "DACSKY",
        name: "North",
        description: "This exit has no description",
        type: "exit",
        parent: "133GIH",
        target: "OJ8P60",
        room: "133GIH"
      }
    ],
    area: 1
  },
  {
    id: "9IA2R6",
    name: "Dead end in a cave",
    description: "The tunnel ends here abruptly with a large pile of big rocks stopping any further exploration to the east. A smidge of light casts through the gaps between the rocks revealing what could be a passage further inside.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "JECY2J",
        name: "West",
        description: "This exit has no description",
        type: "exit",
        parent: "9IA2R6",
        target: "ZAM77T",
        room: "9IA2R6"
      }
    ],
    area: 1
  },
  {
    id: "OJ8P60",
    name: "Deep inside the cave",
    description: "The tunnel leads to a solid wall of rock with paths leading to the west, east and south. The gravelly path underfoot now consists of larger rocks that are splayed every which way. Dusty cobwebs are spread between the ceiling and the walls in every direction.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "H3WHQ9",
        name: "South",
        description: "This exit has no description",
        type: "exit",
        parent: "OJ8P60",
        target: "133GIH",
        room: "OJ8P60"
      },
      {
        id: "7FK5UN",
        name: "East",
        description: "This exit has no description",
        type: "exit",
        parent: "OJ8P60",
        target: "317DK6",
        room: "OJ8P60"
      },
      {
        id: "FT4FJ1",
        name: "West",
        description: "This exit has no description",
        type: "exit",
        parent: "OJ8P60",
        target: "CQ9ZUY",
        room: "OJ8P60"
      }
    ],
    area: 1
  },
  {
    id: "317DK6",
    name: "Deep inside the cave",
    description: "The sound of bats becomes increasingly noticable with more of them swerving just below the rocky ceiling and throughout the cave. The rocks here are noticable stained, eminating a distasteful smell throughout the area. A few rats scurry alongsides the walls.",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "24V03C",
        name: "West",
        description: "This exit has no description",
        type: "exit",
        parent: "317DK6",
        target: "OJ8P60",
        room: "317DK6"
      },
      {
        id: "IFXVSS",
        name: "North",
        description: "This exit has no description",
        type: "exit",
        parent: "317DK6",
        target: "V3TKL7",
        room: "317DK6"
      }
    ],
    area: 1
  },
  {
    id: "CQ9ZUY",
    name: "Dead end in a cave",
    description: "The tunnel further west ends here, closing in on a solid wall smeared with some moldy-looking brown blotches. A collection of inconspicious rocks lay against the wall, seemingly of no interest. ",
    type: "room",
    parent: "NULLED",
    content: [
      {
        id: "U9G7EC",
        name: "East",
        description: "This exit has no description",
        type: "exit",
        parent: "CQ9ZUY",
        target: "OJ8P60",
        room: "CQ9ZUY"
      },
      {
        id: "PXN4H5",
        name: "Shiny rock",
        description: "A peculiar looking rock that reflects the light rather well.",
        type: "item",
        parent: "CQ9ZUY",
        room: "CQ9ZUY"
      }
    ],
    area: 1
  },
  {
    id: "V3TKL7",
    name: "Bat's nest",
    description: "The cave opens up in a minor expanse, with the ceiling almost completely covered in shagged-looking bats. The entire place smells absolutely rancid, the smell seemingly eminating from the big piles of brown goop that cover the floor. A couple of dead bats adorn the piles with bits and pieces of bone and fur scattered across the room.",
    type: "room",
    parent: "NULLED",
    action:{
      "collect":"collectPoop"
    },
    content: [
      {
        id: "U2HXS1",
        name: "South",
        description: "This exit has no description",
        type: "exit",
        parent: "V3TKL7",
        target: "317DK6",
        room: "V3TKL7"
      },
      {
        id: "2B624S",
        name: "spawner",
        description: "This entity has no description",
        type: "spawner",
        parent: "6MNWGY",
        content: [
          {
            id: "UNXX8T",
            name: "Furry bat",
            area:1,
            description: "This entity has no description",
            type: "mobile",
            parent: "2B624S",
            room: "NULLED",
            health: 2,
            attribute: {
              strength: 1,
              intelligence: 1,
              dexterity: 1,
              constitution: 1,
              wisdom: 1,
              charisma: 1,
              luck: 1
            },
            statistic: {
              damage: 1,
              critChance: 1,
              critDamage: 1.5,
              maxWeight: 1,
              maxHealth: 2,
              attSpeed: 2500
            },
            idleMessage: ["flaps around the room"],
            idleChance: 0.8,
            moveChance: 0.7
          }
        ],
        chance: 1,
        limit: 3,
        entities: [],
        room: "V3TKL7"
      }
    ],
    area: 1
  }
]

export default room