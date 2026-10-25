const room = [
    {
      id: "NULLED",
      name: "Master Room",
      description: "This room exists for engine reasons. If you somehow ended up here, congratulations! You fucked up.",
      type: "room",
      parent: "NULLED",
      area: 0
    },
    {
      id: "MainMenu",
      name: "Main Menu",
      description: "****************************************\n*  _____ _                        _    *\n* | ____| |_ ___ _ __ _ __   __ _| |   * \n* |  _| | __/ _ \\ '__| '_ \\ / _` | |   *\n* | |___| ||  __/ |  | | | | (_| | |   *\n* |_____|\\__\\___|_|  |_| |_|\\__,_|_|   *\n* |  _ \\  ___  ___  ___ ___ _ __ | |_  *\n* | | | |/ _ \\/ __|/ __/ _ \\ '_ \\| __| *\n* | |_| |  __/\\__ \\ (_|  __/ | | | |_  *\n* |____/ \\___||___/\\___\\___|_| |_|\\__| *\n****************************************\n*         Some goofy subtitle          *\n*         v0.3     by Flubber          *\n****************************************",
      type: "menu",
      tag: [
        "noprompt"
      ],
      event: {
        objRemoved: [
          "clear"
        ]
      },
      parent: "NULLED",
      content: [
        {
          id: "2PFJ35",
          name: "Start game",
          description: "This exit has no description",
          type: "exit",
          tag: [
            "silent"
          ],
          parent: "MainMenu",
          target: "HYX9OP"
        }
      ],
      area: 0
    },
    {
      id: "8M9I3L",
      name: "In front of the cave",
      description: "The entrance to the cave is a gaping hole roughly hewed into a wall of thick rock. Strewn about on the ground in front of it are the bones of several small critters, along with bits and pieces of fur and other debris. A path of dried mud leads north into the dungeon.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "4R9TI8",
          name: "North",
          description: "This exit has no description",
          type: "exit",
          parent: "8M9I3L",
          target: "U165DQ",
          room: "8M9I3L"
        },
        {
          id: "YFMIM6",
          name: "South",
          description: "This exit has no description",
          type: "exit",
          parent: "8M9I3L",
          target: "PDQCTQ",
          room: "8M9I3L"
        }
      ],
      area: 0
    },
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
      id: "PDQCTQ",
      name: "Through the forest",
      description: "Along the canopy of the trees a variety of birds can be heard as the light of the sun beams down through the leaves. The thick grass seems to spread further around the area, only to thin towards the large mountainous wall to the north.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "1SEJNE",
          name: "North",
          description: "This exit has no description",
          type: "exit",
          parent: "PDQCTQ",
          target: "8M9I3L",
          room: "PDQCTQ"
        },
        {
          id: "5R289F",
          name: "Southeast",
          description: "This exit has no description",
          type: "exit",
          parent: "PDQCTQ",
          target: "N01KBO",
          room: "PDQCTQ"
        }
      ],
      area: 0
    },
    {
      id: "N01KBO",
      name: "Through the forest",
      description: "Tall trees surround a small, bendy path deeper into the forest. The sunlight cascades upon the thick canopy of leaves surrounding the forest ceiling. Among the sand on the side of the path are several rocks, casually kicked aside by passerby's. ",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "9O6D3S",
          name: "Northwest",
          description: "This exit has no description",
          type: "exit",
          parent: "N01KBO",
          target: "PDQCTQ",
          room: "N01KBO"
        },
        {
          id: "PDOR0K",
          name: "South",
          description: "This exit has no description",
          type: "exit",
          parent: "N01KBO",
          target: "OT2KZN",
          room: "N01KBO"
        },
        {
          id: "JLFXAV",
          name: "West",
          description: "This exit has no description",
          type: "exit",
          target: "YLKBVN",
          room: "N01KBO"
        }
      ],
      area: 0
    },
    {
      id: "OT2KZN",
      name: "Outside the village",
      description: "The path leads to the opening of a large forest adorned with lush, maple trees. The sounds of casual village activity eminate from the south whilst a plethora of birds can be heard from the forest to the north.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "DAYNOT",
          name: "North",
          description: "This exit has no description",
          type: "exit",
          parent: "OT2KZN",
          target: "N01KBO",
          room: "OT2KZN"
        },
        {
          id: "S7JS7E",
          name: "South",
          description: "This exit has no description",
          type: "exit",
          parent: "OT2KZN",
          target: "3J64TI",
          room: "OT2KZN"
        }
      ],
      area: 0
    },
    {
      id: "3J64TI",
      name: "Village Center",
      description: "The village center is adorned with a large bonfire, casting a warm light on the surrouding tents. Splayed around the bonfire are several cut logs meant to be sat on. To the east an especially large tent can be seen, adorned with dried skulls and bones.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "RTSRS6",
          name: "North",
          description: "This exit has no description",
          type: "exit",
          parent: "3J64TI",
          target: "OT2KZN",
          room: "3J64TI"
        },
        {
          id: "4SU4S8",
          name: "East",
          description: "This exit has no description",
          type: "exit",
          parent: "3J64TI",
          target: "HJWH3N",
          room: "3J64TI"
        },
        {
          id: "FH3RAL",
          name: "West",
          description: "This exit has no description",
          type: "exit",
          parent: "3J64TI",
          target: "82EOEA",
          room: "3J64TI"
        },
        {
          id: "HTC4LA",
          name: "Bonfire",
          description: "A cozy bonfire made out of several large logs, burning intensely with a satisfying crackle.",
          type: "item",
          parent: "3J64TI",
          room: "3J64TI"
        }
      ],
      area: 0
    },
    {
      id: "HJWH3N",
      name: "Village Elder's tent",
      description: "This tent belongs to Makar. It is decorated with a variety of brightly dyed skulls hanging from from poles. In the back is a small dresser covered with a small collection of burning candles. A large mat with intricate patterns adorns the center of the room.",
      type: "room",
      event: {
        objAdded: [
          "villageElderQuest"
        ]
      },
      parent: "NULLED",
      content: [
        {
          id: "SI9Y5T",
          name: "West",
          description: "This exit has no description",
          type: "exit",
          parent: "HJWH3N",
          target: "3J64TI",
          room: "HJWH3N"
        },
        {
          id: "4CYFTB",
          name: "Makar, the village elder",
          description: "This entity has no description",
          type: "npc",
          parent: "HJWH3N",
          room: "HJWH3N",
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
          idleMessage: "scratches his butt",
          idleChance: 0.8
        }
      ],
      area: 0
    },
    {
      id: "82EOEA",
      name: "Path through a camp",
      description: "A corner in the small village surrounded by tents. The dusty path is covered with pebbles and other debris.A few buckets and other leftover goods lay stranded aside the path.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "BUDHN0",
          name: "East",
          description: "This exit has no description",
          type: "exit",
          parent: "82EOEA",
          target: "3J64TI",
          room: "82EOEA"
        },
        {
          id: "TX70YS",
          name: "South",
          description: "This exit has no description",
          type: "exit",
          parent: "82EOEA",
          target: "HYX9OP",
          room: "82EOEA"
        },
        {
          id: "0JF7BV",
          name: "West",
          description: "This exit has no description",
          type: "exit",
          target: "3N6DSO",
          room: "82EOEA"
        }
      ],
      area: 0
    },
    {
      id: "HYX9OP",
      name: "Your tent",
      description: "Central to your tent is a cozy looking bedroll adorned with various types of furry animal hides. From the ceiling hangs a deer skull attached by thick twine. A makeshift table consisting of a tree stump stands in the back adorned with various mugs and plates.",
      type: "room",
      action: {
        sleep: "playerTentSleep"
      },
      event: {
        objAdded: [
          "yourTentInit"
        ]
      },
      parent: "NULLED",
      content: [
        {
          id: "EYJRXP",
          name: "North",
          description: "Towards here is the rest of the village",
          type: "exit",
          parent: "HYX9OP",
          target: "82EOEA",
          room: "HYX9OP"
        }
      ],
      area: 0
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
              name: "bat",
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
              idleMessage: "scratches his butt",
              idleChance: 0.8,
              moveChance: 0
            }
          ],
          chance: 1,
          limit: 1,
          entities: [
            "5XL515"
          ],
          room: "V3TKL7"
        },
        {
          id: "5XL515",
          name: "bat",
          description: "This entity has no description",
          type: "mobile",
          parent: "2B624S",
          room: "V3TKL7",
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
          idleMessage: "scratches his butt",
          idleChance: 0.8,
          moveChance: 0
        },
        {
          call: {
            moved: [
              null,
              null,
              null
            ]
          },
          id: "ZRQUL2",
          name: "Player",
          description: "This entity has no description",
          type: "player",
          parent: "MainMenu",
          room: "V3TKL7",
          health: 12,
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
            maxHealth: 12,
            attSpeed: 2500
          },
          healTick: 0,
          maxHealTick: 2,
          locked: false,
          lockedMessage: "You feel compelled to stay where you are",
          quest: {
            main: 1
          }
        }
      ],
      area: 1
    },
    {
      id: "3N6DSO",
      name: "Western corner of a camp",
      description: "The path through the camp ends here with more tents surrounding the area.To the south a small center can be seen with a bunch of wooden toys laying about the area, presumably from the kids living in the camp. ",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "XA95C4",
          name: "East",
          description: "This exit has no description",
          type: "exit",
          target: "82EOEA",
          room: "3N6DSO"
        },
        {
          id: "XHE1ER",
          name: "North",
          description: "This exit has no description",
          type: "exit",
          target: "VTXQ93",
          room: "3N6DSO"
        },
        {
          id: "VM2ZTZ",
          name: "South",
          description: "This exit has no description",
          type: "exit",
          target: "RD6KJE",
          room: "3N6DSO"
        }
      ],
      area: 0
    },
    {
      id: "VTXQ93",
      name: "Northwestern end of a camp",
      description: "A quiet corner of the camp that is well kempt and looking rather new. To the north is a tent that is decorated with twigs and decorative leaves, sewed on rather boldly to the canvas. To the west is a comparatively bland tent with a small stack of dirty bowls piled next to it.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "QQDWEY",
          name: "South",
          description: "This exit has no description",
          type: "exit",
          target: "3N6DSO",
          room: "VTXQ93"
        },
        {
          id: "7W1XCU",
          name: "North",
          description: "This exit has no description",
          type: "exit",
          target: "W0K521",
          room: "VTXQ93"
        },
        {
          id: "1JZGCX",
          name: "West",
          description: "This exit has no description",
          type: "exit",
          target: "9KXOVH",
          room: "VTXQ93"
        }
      ],
      area: 0
    },
    {
      id: "W0K521",
      name: "A tent in the camp",
      description: "The inside of the canvas is about as well decorated as the outside, with decorated leaves sprewn about in a rather sporadic style. A large pot is brewing on a small fire in the middle of tent. A table with cooking utensils and a few bowls of spices is spread along the eastern side of the tent.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "N8QEE9",
          name: "South",
          description: "This exit has no description",
          type: "exit",
          target: "VTXQ93",
          room: "W0K521"
        },
        {
          id: "TFA1HV",
          name: "Camilla",
          description: "A small humanoid woman, about middle-aged, with long dark hair bound tightly into a messy bun. She is wearing a large, dark apron, seemingly made from the hide of an animal, covered in dried splotches of food residue. Underneath the apron she wears a shagged-looking plaid dress with rough seams and a noticable nicks and cuts along the sleeves. On her feet she wears simple leather sandals.",
          type: "npc",
          parent: "QMR50F",
          room: "W0K521",
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
          idleMessage: "busies herself with preparing some lavish looking meal.",
          idleChance: 0.8
        }
      ],
      area: 0
    },
    {
      id: "9KXOVH",
      name: "A tent in the camp",
      description: "A sparsely decorated tent with only a bedroll in the back and a few plates and cutleries sprewn about. A small collection of flies buzzes around, attracted to the myriad of leftover scraps of food sticking to all the kitchenware.The distinct smell of stale food permeates the air. ",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "DZ6RLT",
          name: "East",
          description: "This exit has no description",
          type: "exit",
          target: "VTXQ93",
          room: "9KXOVH"
        }
      ],
      area: 0
    },
    {
      id: "RD6KJE",
      name: "Southwestern corner of a camp",
      description: "The path to the camp ends abruptly with only a single, rather large, tent set up on the west side of the path. A small stack of firewood is neatly stacked to the side of the tent.A few children's toys are laying about, seemingly discarded in the front. ",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "EBVXNP",
          name: "North",
          description: "This exit has no description",
          type: "exit",
          target: "3N6DSO",
          room: "RD6KJE"
        },
        {
          id: "QAR2LM",
          name: "West",
          description: "This exit has no description",
          type: "exit",
          target: "RKJM9O",
          room: "RD6KJE"
        }
      ],
      area: 0
    },
    {
      id: "RKJM9O",
      name: "Front side of a tent",
      description: "A rather large tent sprawling even further west. To the south side of the tent are two bedrolls, with a smaller bedroll spread out in the north. A pile of clothing is stacked neatly on top of the smaller bedroll. ",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "J3NB57",
          name: "East",
          description: "This exit has no description",
          type: "exit",
          target: "RD6KJE",
          room: "RKJM9O"
        },
        {
          id: "K6M1JC",
          name: "West",
          description: "This exit has no description",
          type: "exit",
          target: "A8KBX2",
          room: "RKJM9O"
        },
        {
          id: "1X2HU1",
          name: "Rachida",
          description: "A young woman with a dark complexion, dark hair and brown eyes. Her hair extends to about the middle of her back, seemingly well-kempt and neat. She wears a white-yellow top with short, poofy sleeves with a long green skirt underneath. Her shoes are made of brown cloth with a simple lace tie holding them together.",
          type: "npc",
          parent: "QMR50F",
          room: "RKJM9O",
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
          idleMessage: "scratches his butt",
          idleChance: 0.8
        }
      ],
      area: 0
    },
    {
      id: "A8KBX2",
      name: "Back end of a large tent",
      description: "The tent spreads further back, adorned by a small kitchen table consisting of a few simple planks stacked on top of eachother. A few bowls are set up on the table, as if someone were preparing to serve a meal. From the ceiling of the tent hangs a bushel of rosemary, spreading a pleasant scent through the air.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "N670TV",
          name: "East",
          description: "This exit has no description",
          type: "exit",
          target: "RKJM9O",
          room: "A8KBX2"
        }
      ],
      area: 0
    },
    {
      id: "YLKBVN",
      name: "A small river",
      description: "From the north stretches a small river, blocking your way further west. It stretches a few more meters south before curving further west. Its water is a clear, pale blue with a moderatedly paced flow. A couple of birds stand on the western bank, taking in the fresh water.",
      type: "room",
      parent: "NULLED",
      content: [
        {
          id: "W7CBVU",
          name: "East",
          description: "This exit has no description",
          type: "exit",
          target: "N01KBO",
          room: "YLKBVN"
        }
      ],
      area: 0
    }
  ]
  
  export default room