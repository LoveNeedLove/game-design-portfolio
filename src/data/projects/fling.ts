import { Project } from '../types';

export const fling: Project = {
  id: "fling",
  featured: true,
  title: "Fling",
  description: "You've crash-landed in an unknown habitat, but you have a unique advantage: the ability to possess and fling spherical objects. Jump, dash, and throw your way through six unique levels to reach the core of this hostile planet—literally!",
  shortDescription: "A 2.5D platformer with a unique recoil-based mobility system where projecting objects flings you in the opposite direction.",
  date: "May 2025",
  developmentTime: "2 months",
  genres: ["Platformer"],
  roles: ["UX", "Level Design", "Gamefeel"],
  teamSize: [
    { count: 6, role: "Game Designer" },
    { count: 2, role: "Programmer" },
    { count: 2, role: "Music and Sound Designer" }
  ],
  mission: "Our goal was to develop a 2.5D platformer with a distinct \"recoil\" mobility hook. Instead of traditional movement, projecting an object flings the player in the opposite direction, acting as a powerful secondary dash that requires precise aiming and timing to navigate the environment.",
  tasks: [
    {
      title: "Level Design & Implementation",
      description: "I fully implemented the game's final level (Level 6), managing the pacing and difficulty curve for the climactic conclusion.",
      content: [
        {
          type: 'text',
          content: "I was tasked with designing the climactic finale of the game, where the player must finally use the four keys retrieved from the corners of the world to descend into the Earth's core. This level serves as the ultimate test of the player's mastery over the game's mechanics.",
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/big door with keys.png',
          group: 'level-intro'
        },
        {
          type: 'text',
          content: "Designing a final level is a delicate balancing act; it must respect the player's progression without \"bloating\" the experience by recycling too many features from previous levels. My goal was to create a unique, high-intensity climax that feels like a natural evolution of the challenges faced throughout the journey rather than a simple accumulation of old mechanics.",
          group: 'level-intro'
        },
        {
          type: 'slideshow',
          title: 'Level 6 Design',
          images: [
            '/projects/GD1/Fling/Content/Roles/ld/overview.png',
            '/projects/GD1/Fling/Content/Roles/ld/phase 1.png',
            '/projects/GD1/Fling/Content/Roles/ld/phase 2.png',
            '/projects/GD1/Fling/Content/Roles/ld/phase 3.png',
            '/projects/GD1/Fling/Content/Roles/ld/phase 4.png',
            '/projects/GD1/Fling/Content/Roles/ld/phase 6.png'
          ],
          format: '16/9',
          size: 'full'
        },
        {
          type: 'text',
          content: "The level design places the game's unique selling point at the center of the experience. I focused on complex sequences that require the player to possess various ball types, taking full advantage of the recoil-based \"fling\" mechanic to navigate tight corridors and solve high-speed environmental puzzles.",
          group: 'lava-mechanics'
        },
        {
          type: 'video',
          url: '/projects/GD1/Fling/Content/Roles/lava chase situation.mp4',
          group: 'lava-mechanics'
        },
        {
          type: 'text',
          content: "In order to make this finale stand out, I implemented a \"wall of lava\" mechanic—a massive, lethal deadzone that pursues the player on a fixed rail. This allowed me to engineer high-tension chase sequences and precision-based challenges, such as guiding a ball through narrow pathways while the lava descends from above.",
          size: 'full'
        },
        {
          type: 'text',
          content: "Pacing and difficulty were my primary concerns during the implementation phase. I ensured the level integrated seamlessly with the hub and the overall narrative structure; as players progress through the game, they unlock the keys that gradually open the massive gate leading to this final descent.",
          size: 'full'
        },
        {
          type: 'text',
          content: "Instead of the standard key reward found in earlier stages, the level culminates in a subversion of the core mechanic. The player must possess the Earth's core itself—designed as a giant, gargantuan ball—to trigger the final fall and lead directly into the game's credits.",
          size: 'full'
        }
      ]
    },
    {
      title: "Technical Implementation",
      description: "I used C# and Unity Visual Scripting to program specialized gameplay hazards and \"bricks,\" including reactive lava walls and destructible environmental obstacles.",
      content: [
        {
          type: 'text',
          content: "To build a truly reactive environment, I looked beyond the core \"fling\" mechanic to develop a library of specialized gameplay bricks. I used Visual Scripting to implement a variety of interactive hazards, including destructible walls, crumbling platforms that collapse under the player's weight, and high-velocity trampolines that launch both characters and balls to new heights.",
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/destructible wall.gif',
          group: 'bricks',
          groupStack: '1'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/crumble platforms.gif',
          group: 'bricks',
          groupStack: '2'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/trampoline showcase.gif',
          group: 'bricks',
          groupStack: '3'
        },
        {
          type: 'text',
          content: "For the final level's high-stakes sequences, I transitioned to C# to develop a custom spline-based movement system. This allowed for precise, non-linear control over the \"wall of lava\" and moving platforms, enabling me to script specific pacing shifts—such as sudden accelerations or dramatic pauses—to heighten the tension during chase encounters.",
          group: 'spline-system'
        },
        {
          type: 'video',
          url: '/projects/GD1/Fling/Content/Roles/final chase sequence.mp4',
          group: 'spline-system'
        },
        {
          type: 'text',
          content: "To maintain a seamless flow and prevent soft-locks, I engineered an automated \"respawn\" system for complex level segments. This ensures that specific destructible sections and environmental bricks regenerate instantly upon a player's death, allowing them to jump back into the action and experience the intended challenge without technical friction.",
          size: 'full'
        }
      ]
    },
    {
      title: "Gamefeel & Polish",
      description: "I implemented character and object feedback, such as squash-and-stretch logic and dynamic fire trails, to enhance the tactile feel of the physics-based movement.",
      content: [
        {
          type: 'text',
          content: "Since the core experience relies almost entirely on physics and flinging objects into enemies, achieving a \"perfect\" tactile response was a top priority. I began by producing a comprehensive gamefeel research document, which served as a blueprint for the project's \"juice\" by featuring detailed mock-ups for every intended interaction.",
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/gamefeel document.gif',
          size: 'full'
        },
        {
          type: 'text',
          content: "To make the physics-based movement feel more organic, I implemented a dynamic squash-and-stretch system for the balls. The intensity of the deformation scales with the speed of the bounce, providing immediate visual feedback on the momentum and weight of the object as it moves through the environment.",
          size: 'full'
        },
        {
          type: 'text',
          content: "I also developed a multi-layered feedback system to communicate damage potential. When a ball reaches a lethal velocity, it triggers a color lerp and ignites a dynamic flame trail. These visual cues serve a dual purpose: they enhance the aggressive aesthetic of the \"fling\" while giving the player clear, non-intrusive data on whether their projectile is fast enough to take down an enemy.",
          group: 'damage-feedback'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/ball_in_flames.gif',
          group: 'damage-feedback'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'During playtesting, we observed that players struggled to grasp the core controls, specifically the interaction between the dash and the "fling" recoil, leading to frustration during high-stakes platforming sections.',
          size: 'full'
        },
        {
          type: 'text',
          content: 'To bridge this gap without breaking immersion, I designed and implemented a series of wordless, in-game 2D animations at key progression points. By teaching the mechanics through clear visual observation rather than text, I eliminated the language barrier and allowed players to master the complex controls intuitively.',
          size: 'full'
        },
        {
          type: 'slideshow',
          title: 'Tutorial Animations',
          images: [
            '/projects/GD1/Fling/Content/Roles/Tutorials/tuto start.gif',
            '/projects/GD1/Fling/Content/Roles/Tutorials/tuto jump.gif',
            '/projects/GD1/Fling/Content/Roles/Tutorials/tuto dash.gif',
            '/projects/GD1/Fling/Content/Roles/Tutorials/tuto grab.gif',
            '/projects/GD1/Fling/Content/Roles/Tutorials/tuto presse.gif'
          ],
          size: 'full'
        }
      ]
    },
    {
      title: "Progression & Audio",
      description: "I authored mood documents to define the ambient soundscape and implemented the entire progression system, including a unique playable credits sequence.",
      content: [
        {
          type: 'text',
          content: "To give the player a tangible sense of progression, I designed key elements of the Hub, including a massive, mysterious door that serves as the central gate to the game's finale. By linking the successful completion of each world to the collection of physical keys, I created a clear visual anchor that tracks the player's journey toward the Earth's core.",
          group: 'hub-progression'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/keys appearing.gif',
          group: 'hub-progression'
        },
        {
          type: 'text',
          content: "Since our team included dedicated sound designers, I acted as the bridge between gameplay and audio by authoring a comprehensive \"Musical DNA\" document. This guide defined the specific ambient loops and tonal shifts for each level, ensuring that the soundscape evolved alongside the difficulty and environmental themes.",
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/Music Doc.png',
          group: 'audio',
          groupStack: '1'
        },
        {
          type: 'image',
          url: '/projects/GD1/Fling/Content/Roles/Ambiance Loop document.png',
          group: 'audio',
          groupStack: '2'
        },
        {
          type: 'text',
          content: "I fully implemented a playable credits sequence inspired by the interactive credits in Super Smash Bros. In a humorous subversion of the core mechanics, the player uses the planet itself as a ball to shatter destructible walls. These obstacles hide the developers' names and the logos of our personal studios—serving as both a tribute to our past projects and a high-energy conclusion to the experience.",
          size: 'full'
        },
        {
          type: 'video',
          url: '/projects/GD1/Fling/Content/Roles/fling credits.mp4',
          size: 'full'
        }
      ]
    }
  ],
  challenge: "During playtesting, we observed that players struggled to grasp the core controls—specifically the interaction between the dash and the \"fling\" recoil—leading to frustration during high-stakes platforming sections.",
  solution: "To bridge this gap without breaking immersion, I designed and implemented a series of wordless, in-game 2D animations at key progression points. By teaching the mechanics through clear visual observation rather than text, I eliminated the language barrier and allowed players to master the complex controls intuitively.",
  coverImage: "/projects/GD1/Fling/Fling.png",
  overlayColor: "rgba(99, 102, 241, 0.05)",
  bannerColor: "#babbfa",
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'youtube', url: 'vbLfOxRkTsc' },
    { type: 'image', url: '/projects/GD1/Fling/Content/Fling 1.png' },
    { type: 'image', url: '/projects/GD1/Fling/Content/Fling 2.png' },
    { type: 'image', url: '/projects/GD1/Fling/Content/Fling 3.png' }
  ],
  tools: ['Unity', 'git'],
  linkUrl: "https://loveneedlove.itch.io/fling",
  linkTitle: "Play Fling on itch.io"
};
