import { Project } from '../types';

export const lastScythe: Project = {
  id: "last-scythe",
  featured: true,
  title: "Last Scythe",
  description: "The work of a reaper is never over... and that's exactly why you're ready to quit! Take on waves of vengeful souls with your trusty scythe, explore various arenas, and uncover the truth behind your retirement plan. Because let's be honest: even death deserves a vacation.",
  shortDescription: "A top-down brawler with a spacing-focused combat system where your scythe only deals damage at the tip of the blade.",
  date: "December 2025",
  developmentTime: "2 months",
  genres: ["Brawler", "Top-Down"],
  roles: ["UX", "Narrative Design", "Programming"],
  teamSize: [
    { count: 5, role: "Game Designer" }
  ],
  mission: "Our mission was to build a brawler centered around a specific \"spacing\" constraint. We settled on a top-down combat loop where the scythe only deals damage at the tip of the blade, leaving a dangerous \"dead zone\" directly in front of the player. To manage this vulnerability, I integrated a push mechanic that allows players to shove close-range enemies back into the lethal blade range, creating a rhythmic dance of spacing and crowd control.",
  tasks: [
    // ############################################################################
    // UX & UI IMPLEMENTATION
    // ############################################################################
    {
      title: "UX & UI Implementation",
      description: "I designed and fully implemented the entire UI architecture, including all menus, the tutorial flow, and a dynamic HUD that tracks off-screen threats to maintain combat awareness.",
      illustrations: [
        { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 1.png' },
        { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 2.png' }
      ],
      content: [
        {
          type: 'text',
          content: 'I designed and implemented the entire UI architecture, from the initial tutorial flow to a dynamic HUD. To reflect the game\'s core simplicity, I prioritized a minimalist aesthetic using high-contrast plain text and a restricted color palette, ensuring maximum readability without visual clutter.',
          size: 'full'
        },
        {
          type: 'text',
          content: 'The main menu sets a moody, "soul-like" tone through a custom particle system paired with subtle post-processing. By using bloom and calm environmental effects, I created an immediate atmospheric shift that prepares the player for the game\'s world before they even press start.',
          group: 'mainmenu'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/mainmenu.gif',
          group: 'mainmenu'
        },
        {
          type: 'text',
          content: 'For the level selection, I opted for a vertical layout featuring flat imagery. This design choice allows players to instantly grasp the setting and their current spot in the progression. I even experimented with a retro-style pointer, but ultimately scrapped it to maintain the interface\'s modern, clean lines.',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/levelselect.gif',
          size: 'medium'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/audiomenu.png',
          group: 'options'
        },
        {
          type: 'text',
          content: 'I built a streamlined options menu focusing on player comfort, including granular audio sliders and a vibration toggle. While vibrations enhance impact, playtests showed they could be polarizing, so I ensured users had full control over their sensory experience.',
          group: 'options'
        },
        {
          type: 'text',
          content: 'Behind the scenes, I developed a flexible audio system for the UI. Beyond simple button clicks, I made sure the sounds were easy to customize and modify globally, allowing for real-time adjustments like pitch shifting to keep the feedback feeling responsive and dynamic.',
          group: 'audio'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/inspector.png',
          group: 'audio'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'In combat, the HUD functions as a tactical guide. Since gameplay relies on clearing waves, I implemented a tracking system for off-screen threats. Simple, clear animations signal when enemies are charging or recovering, allowing players to maintain awareness of the battlefield at all times.',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/hud1.gif',
          group: 'hud-images'
        },
        {
          type: 'text',
          content: 'The health indicator serves a dual purpose: tracking HP while featuring a dedicated gauge for swing-charge levels. This keeps vital combat data centralized, so players don\'t have to scan multiple corners of the screen during high-intensity encounters.',
          size: 'full'
        },
        {
          type: 'text',
          content: 'To reward player skill, the combo system triggers highlighted pop-ups that celebrate multi-kills in real-time. This visual reinforcement provides immediate positive feedback, ensuring every successful string of attacks feels impactful.',
          group: 'combo'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/combo.gif',
          group: 'combo'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/score.gif',
          group: 'score'
        },
        {
          type: 'text',
          content: 'For the score, I implemented a physical-style counter where numbers flip as "souls" are collected from defeated enemies. This movement, combined with the visual journey of the soul traveling toward the UI, creates a tangible sense of progression.',
          group: 'score'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'I designed a "First Time User Experience" structured as a series of bite-sized minigames. This approach ensures players master the movement and camera controls intuitively, requiring them to navigate specific distances and track targets with the right stick to progress.',
          size: 'full'
        },
        {
          type: 'text',
          content: 'The tutorial culminates in hands-on combat training, where players learn to use the push mechanic to move dummies toward objectives. Finally, it introduces the core offensive loop, teaching players how to time and charge their swings to maximize damage against enemies.',
          size: 'full'
        },
        {
          type: 'video',
          url: '/projects/GD2/Last Scythe/Content/Roles/tutorial.mp4',
          size: 'full'
        }
      ]
    },
    // ############################################################################
    // NARRATIVE & IMPLEMENTATION
    // ############################################################################
    {
      title: "Narrative & Implementation",
      description: "I wrote the script and implemented the entire narrative system, including the full game ending and credits sequence, ensuring a cohesive conclusion to the player experience.",
      content: [
        {
          type: 'text',
          content: 'I designed the narrative system to transform a standard arcade loop into a meta-commentary on the nature of "work." By reframing the game\'s core loop as a professional routine, I justified the level-based structure and gave the player a macro-objective: reaching a "quota" to earn a long-awaited retirement.',
          size: 'full'
        },
        {
          type: 'text',
          content: 'The hub was reimagined as a corporate break room that evolves as the player progresses. I developed a custom tool to manage this evolution, allowing me to programmatically toggle furniture and NPC dialogue. This made the hub feel increasingly "warm," reflecting the tragic reality of Reapers who have known nothing but labor.',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/hubprogression.gif',
          size: 'full'
        },
        {
          type: 'text',
          content: 'To ensure the story never obstructed the gameplay, I designed the hub as a straight path to the action and implemented a "skip" feature for those wanting to jump directly into the fray. This balance ensures the narrative serves as a reward rather than a hurdle.',
          size: 'full'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'For the mission briefings, I created a shader-based floating text system with a "dreamy" aesthetic. These bubbles appear along a corridor to represent instructions from a superior entity. I subverted this routine in the finale by stretching this corridor to an unsettling length, creating an eerie atmosphere that signals the end of the status quo.',
          group: 'briefings'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/corridor.gif',
          group: 'briefings'
        },
        {
          type: 'text',
          content: 'I built an NPC dialogue system inspired by Mario Odyssey, using text animations to inject personality into the other Reapers. To make the world feel alive, I created unique idle animations for each character that reflect their specific temperament. I also implemented a system where characters can rotate to face the player—a feature I kept optional and adjustable in speed to further distinguish their individual behaviors.',
          group: 'npc-system'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/npcmanager.png',
          group: 'npc-system'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/npctable.gif',
          group: 'npc-examples'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/npcsleeping.gif',
          group: 'npc-examples'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/npctv.gif',
          group: 'npc-examples'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'The climax recontextualizes the entire journey through a final plot twist: Reapers are simply souls who died before choosing how to live. To sell this moment, I implemented a transition that strips the player of their abilities, swapping their model for a refined version of the enemy souls they had been slaying all along.',
          group: 'twist'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/transformation.gif',
          group: 'twist'
        },
        {
          type: 'text',
          content: 'In the final scene, the "retirement" the player worked for is revealed to be a cycle of violence where they are slain by their own trainee. I paired this with a credits sequence and a final message on the brevity of life, ensuring the player\'s "objective" felt appropriately short-lived and poignant.',
          size: 'full'
        },
        {
          type: 'video',
          url: '/projects/GD2/Last Scythe/Content/Roles/endingscene.mp4',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/creditsroll.gif',
          size: 'full'
        }
      ]
    },
    // ############################################################################
    // SYSTEMS & GAMEFEEL
    // ############################################################################
    {
      title: "Systems & Gamefeel",
      description: "I designed the enemy abilities and boss logic, and implemented the \"hitstop\" and particle effects to ensure every strike felt impactful. I also programmed custom C# tools for audio and animation management.",
      content: [
        {
          type: 'text',
          content: 'I designed a comprehensive animation framework powered by DOTween to handle all character tweens, structured around four distinct combat states: preparation, delivery, recovery, and cooldown. By layering eight procedural animations—such as squash-and-stretch, leans, and shakes—I created a system where highly expressive movement responds dynamically to the flow of combat.',
          size: 'full'
        },
        {
          type: 'video',
          url: '/projects/GD2/Last Scythe/Content/Roles/animation system demo.mp4',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/animator setup.png',
          size: 'large'
        },
        {
          type: 'text',
          content: 'To ensure the architecture was accessible to the whole team, I built the system to be entirely front-end driven within the Unity Inspector. Since my colleagues primarily used visual scripting, I ensured all C# functions were fully compatible, allowing my scripts to generate dedicated visual scripting nodes. This enabled other developers to easily trigger complex logic, like calling a specific haptic event, without writing code.',
          group: 'vs-nodes'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/vsnodes.png',
          group: 'vs-nodes'
        },
        { type: 'separator' },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/audiotool.png',
          group: 'audio'
        },
        {
          type: 'text',
          content: 'I integrated a robust audio engine into this state machine, enabling specific sound triggers for every phase of an action. The tool supports granular control over delay and pitch shifting, and even allows for seamless audio looping within a specific state. This versatility allowed us to animate and sound-tag weapons and environmental elements to drastically improve gameplay readability.',
          group: 'audio'
        },
        {
          type: 'text',
          content: 'To achieve a tactile "hit feel," I developed a universal haptic feedback script. This system allowed me to create and call custom vibration events—such as the gradual tension of a charging scythe. Because the script was designed to be universal, I was able to share it with other teams across different projects, facilitating a high-standard of haptic feedback.',
          group: 'haptic'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/playerhaptics.png',
          group: 'haptic'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'I implemented a dedicated hit-stop script that freezes the frame momentarily upon impact. This technique provides an essential sense of weight and physical resistance, giving the player a split second to process the action and improving the overall clarity of high-speed encounters.',
          size: 'full'
        },
        {
          type: 'text',
          content: 'The visual feedback was rounded out with a universal hit-response system. I implemented dynamic screen shakes and color flashes to communicate invincibility frames and damage states instantly. I also handled the particle systems for the scythe and enemy deaths, ensuring that every strike concluded with a satisfying, visceral payoff.',
          group: 'visual-feedback'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/fightfootage.gif',
          group: 'visual-feedback'
        }
      ]
    },
    // ############################################################################
    // PITCHES & DIRECTION
    // ############################################################################
    {
      title: "Pitches & Direction",
      description: "I prepared all milestone pitches and presentations, managing the vision through several discarded iterations and reviewing level designs.",
      content: [
        {
          type: 'text',
          content: 'I was responsible for spearheading the pitches for every iteration of the project, a process that required bridging the gap between abstract concepts and tangible visions. This involved creating high-fidelity "fake screenshots" and visual mockups to establish a definitive tone for a wide variety of potential directions.',
          size: 'full'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'Before settling on the top-down simplicity of Last Scythe, we explored a 3D brawler-platformer concept titled Knock-Toys. Although the project was eventually dropped, creating the pitch document was a vital exercise in conveying high-energy gameplay and verticality through a static medium.',
          size: 'full'
        },
        {
          type: 'slideshow',
          title: 'Knock-Toys Pitch',
          images: [
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/1.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/2.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/3.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/4.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/5.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/6.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/7.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/8.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/9.gif',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/10.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/11.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/12.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/13.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/14.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/15.png',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/16.gif',
            '/projects/GD2/Last Scythe/Content/Roles/knocktoyspitch/17.png'
          ],
          size: 'full'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'For each pitch, I designed detailed schematics for "preview" level design scenarios and gameplay bricks. These served as a proof of concept for our professors, demonstrating exactly how the enemies and mechanics would function in a live environment to secure project approval.',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/ldpreview1.png',
          group: 'ld-previews'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/ldpreview2.png',
          group: 'ld-previews'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/bricks1.png',
          group: 'ld-previews'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: 'I curated extensive moodboards for both visual direction and gameplay feel. By documenting and analyzing our inspiration sources, I provided the team with a clear North Star, ensuring that everyone from artists to programmers understood the intended atmosphere and mechanical references.',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/moodboardinsp.png',
          group: 'moodboards'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Roles/moodboardvis.png',
          group: 'moodboards'
        },
        {
          type: 'text',
          content: 'Throughout the production, I designed the presentations for every major milestone. These documents were built to serve as dynamic oral supports, carefully structured to reflect our progress and goals while maintaining a high level of professional polish that kept the audience engaged.',
          size: 'full'
        },
        {
          type: 'text',
          content: 'To ensure our live presentations remained smooth and focused, I utilized the commentary features of PowerPoint and Google Slides to provide key notes for the team. This allowed us to stay on track during high-pressure orals, ensuring we covered every vital subject without deviating from our core message.',
          size: 'full'
        }
      ]
    }
  ],
  challenge: "Early playtesting revealed a critical engagement drop-off; while the combat mechanics were functional, players didn't feel a strong enough \"pull\" to finish each level or a sufficient sense of reward for their efforts.",
  solution: "I implemented a Hub-world progression system tied to a fully-fledged short storyline. By adding NPCs and furniture to the Hub that unlock as the player advances, I gave the player a tangible, visual representation of their progress. This shifted the motivation from mere survival to personal investment, using the narrative as a powerful hook to keep players engaged until the final credits.",
  coverImage: "/projects/GD2/Last Scythe/Last Scythe.png",
  overlayColor: "rgba(220, 38, 38, 0.05)",
  bannerColor: "#161616",
  featuredTextColor: "#f1f1f1",
  secondaryTextColor: "#5de9ff",
  mediaList: [
    { type: 'youtube', url: '20m89_nlSHE' },
    { type: 'youtube', url: 'eIs244Z9ESw' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 1.png' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 2.png' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 3.png' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 4.png' }
  ],
  tools: ['Unity', 'git'],
  linkUrl: "https://loveneedlove.itch.io/last-scythe",
  linkTitle: "Play Last Scythe on itch.io"
};
