import { Project } from '../types';

export const waSirLtaxi: Project = {
  id: "wa-sir-ltaxi",
  featured: true,
  title: "Wa Sir L'taxi",
  description: "Your trusty red taxi won't stop! Guess it's the perfect opportunity to register for the White House City GP. Buckle up, because the meter is running, the brakes are broken, and the only way to the finish line is forward!",
  shortDescription: "A one-button racing game with wacky physics designed for speedrunning, controlled entirely with the Space bar.",
  date: "March 2025",
  developmentTime: "1 month",
  genres: ["Racing", "One-Button"],
  roles: ["Solo Project"],
  teamSize: [
    { count: 1, role: "Solo Developer" }
  ],
  mission: "Developed as a solo project, the core constraint was to create an engaging racing game controlled entirely by a single input: the Space bar. I aimed to blend Mario Kart-style arcade racing with wacky, cartoony physics, specifically catering to the speedrunning community through high-skill movement ceilings.",
  tasks: [
    // ############################################################################
    // FULL SYSTEM IMPLEMENTATION
    // ############################################################################
    {
      title: "Full System Implementation",
      description: "As a solo developer, I implemented all gameplay systems, logic, and environmental interactions (excluding music and 3D models).",
      content: [
        {
          type: 'text',
          content: "I designed and implemented the entire gameplay architecture around a singular constraint: the space bar. To ensure the one-button control felt natural rather than forced, I developed an automatic acceleration system where the player's only input is the drift. Pressing the space bar toggles the drift direction, while holding it builds a turbo charge, justifying the minimalist control scheme through high-stakes timing."
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-straight.gif',
          size: 'medium',
          align: 'center'
        },
        {
          type: 'text',
          content: "Operating as a solo developer using visual scripting required me to deconstruct and manually map every single feature. Without relying on AI or traditional code tutorials, I had to gain a deep technical understanding of how to bridge every system—from the logic of the coin collection to the specific parameters of the drift toggle. This ensured that every mechanic was built with total intentionality and was fully integrated into the game's one-button logic.",
          group: 'visual-script'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-visualscript..png',
          size: 'medium',
          group: 'visual-script'
        },
        {
          type: 'text',
          content: "The game is a pure race against time, so I leaned into a \"broken,\" cartoony physics model to give the experience its unique energy. The vehicles feature floaty, arcade-style handling that allows players to initiate drifts and build turbo even while airborne. This rewards aggressive, creative playstyles and turns every jump into a technical opportunity to stack speed for the next straightaway."
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-takeoff.gif',
          size: 'large',
          align: 'center'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "To add strategic depth to the single-button mechanics, I created two vehicles with radically different playstyles. One offers smooth, precise drifting for perfecting racing lines, while the other features high-power turbos and poor handling—ideal for \"snaking\" strategies where players accumulate massive speed through constant, rapid-fire micro-drifts.",
          group: 'garage'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-garage.png',
          size: 'medium',
          group: 'garage'
        },
        {
          type: 'text',
          content: "Visual clarity was essential for the control scheme, so I implemented dynamic blinkers on the rear of the vehicles to preview the next drift direction. This is complemented by a responsive camera system that snaps to a tactical angle during drifts, emphasizing the sense of speed while ensuring the player has a clear view of the upcoming track and time-trial line.",
          group: 'blinkers'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/blinkers.gif',
          size: 'medium',
          group: 'blinkers'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "I utilized DOTween and custom particle systems to sell the \"juice\" of the experience. The vehicles squash and stretch during turns and bounce upon releasing a boost, while the exhaust evolves from simple smoke to intense flames as the turbo charges. These visual cues provide instant, technical feedback on the specific level of power the player is currently holding."
        },
        {
          type: 'text',
          content: "The audio design reinforces the \"combo\" nature of the gameplay. I implemented a dynamic sound system where a successful turbo release triggers an orchestral hit. The pitch of this hit shifts higher based on the drift level, providing a satisfying, escalating reward for players who push their turbos to the limit to beat their personal records.",
          group: 'snaking'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/snaking.gif',
          size: 'medium',
          group: 'snaking'
        },
        {
          type: 'text',
          content: "The HUD and UI were designed with a playful \"taxi meter\" aesthetic to track lap counts, coin collection, and the best-time record system. I also implemented a custom end-of-race sequence that triggers specific musical themes and text animations based on the player's performance, ensuring every solo run concludes with a distinct sense of accomplishment.",
          group: 'win-screen'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/win screen.gif',
          size: 'medium',
          group: 'win-screen'
        }
      ]
    },
    // ############################################################################
    // PHYSICS ENGINEERING
    // ############################################################################
    {
      title: "Physics Engineering",
      description: "Crafted wacky yet precise vehicle physics—chaotic handling that rewards skilled timing and can be mastered and exploited by players.",
      content: [
        {
          type: 'text',
          content: "I spent the majority of the development cycle ensuring the vehicle physics were both intuitive for new players and exploitable for experts. By hand-crafting a chaotic, cartoony feel, I created a system that allows for immense freedom once mastered, ensuring the car could traverse varied terrain while maintaining its signature wacky energy."
        },
        {
          type: 'text',
          content: "Before implementing a single gameplay feature, I prioritized building a versatile and modular physics base. This technical foundation was essential to ensure I wouldn't be restricted later when designing complex levels or adding new mechanics, allowing the vehicle to adapt to any environment I could imagine."
        },
        {
          type: 'video',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-surfaces.mp4',
          size: 'large'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "Working solo with visual scripting meant I couldn't rely on AI, tutorials, or pre-existing templates. I had to deconstruct the very concept of \"vehicle movement\" from scratch, mapping out every technical interaction to ensure the physics responded exactly as intended within my specific one-button framework.",
          group: 'physics-script'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-physicsscript.png',
          size: 'medium',
          group: 'physics-script'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "The core of the system is a hidden physics sphere that \"rolls\" through the environment. The car model acts as a visual layer that calculates the forward vector and rotates to match the sphere's movement. This separation allowed me to achieve smooth, responsive handling while maintaining the visual weight and silhouette of a racing vehicle."
        },
        {
          type: 'text',
          content: "To handle verticality, I spent a significant amount of time \"finagling\" with the car's surface normals. This was crucial for ensuring the vehicle would respond correctly to steep inclines and remain stable while airborne, preventing the chaotic physics from breaking the player's immersion during jumps."
        },
        {
          type: 'text',
          content: "The final system was the result of extensive trial and error. I reached this solution by reverse-engineering technical breakdowns of arcade classics like Mario Kart and studying community-driven recreations. This deep dive into the industry's best practices allowed me to build a high-performance physics model from the ground up.",
          variant: 'accent'
        }
      ]
    },
    // ############################################################################
    // LEVEL & PROGRESSION DESIGN
    // ############################################################################
    {
      title: "Level & Progression Design",
      description: "I designed multiple tracks with specific speedrunning routes in mind, ensuring the wacky physics could be exploited by high-level players for faster times.",
      content: [
        {
          type: 'text',
          content: "I approached level design with an \"easy to learn, hard to master\" mentality, beginning each track with hand-drawn sketches to map out pacing and intensity curves."
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/track sketch.jpg',
          size: 'small',
          group: 'sketches'
        },
        {
          type: 'text',
          content: "This might be hard to read, but it started here!",
          variant: 'quote',
          group: 'sketches'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/map 1 from above.png',
          size: 'small',
          group: 'sketches'
        },
        {
          type: 'text',
          content: "My goal was to give every level a Unique Selling Point—both visually and mechanically—ensuring that the progression felt like a natural escalation from a neighborhood drive to a grandiose, illegal street race.",
          group: 'track-select'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-trackselect.png',
          size: 'medium',
          group: 'track-select'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "To cater to the speedrunning community, I designed layouts with multiple engaging routes. Beyond standard shortcuts, I ensured the environment featured accurate collisions on every asset, such as rooftops and houses. This allows high-level players to exploit the wacky physics and \"carve\" their own unconventional paths through the world, turning the environment itself into a series of potential speed-gain opportunities.",
          group: 'ramp'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-ramp.png',
          size: 'medium',
          group: 'ramp'
        },
        {
          type: 'text',
          content: "I intentionally engineered the checkpoint and death-zone triggers to be oversimplified, allowing for game-breaking shortcuts. In the second level, for instance, the vertical reach of the checkpoints enables a \"kamikaze\" strategy: players can use a ramp to soar over the track and intentionally hit a death zone, forcing a respawn much further ahead and shaving precious seconds off their time.",
          group: 'shortcut'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-shortcut.gif',
          size: 'medium',
          group: 'shortcut'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "Facing a strict academic deadline, I utilized a spline-based workflow to generate the tracks. By drawing the layout and using spline meshes to instantly produce roads and safety barriers, I was able to build complex circuits rapidly. This system also allowed me to create dynamic hazards, such as the swerving taxis in the final level, ensuring the tracks felt alive and dangerous despite the tight production schedule."
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-spline1.gif',
          size: 'small',
          group: 'splines'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-spline2.gif',
          size: 'small',
          group: 'splines'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "As part of my narrative design approach, I treated the story as a functional gameplay brick rather than a separate script. By using environmental storytelling—through ads, billboards, and architectural cues—as the sole narrative vector, I ensured the story strengthened the game's atmosphere without ever interrupting the arcade flow.",
          group: 'billboard'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-billboard.png',
          size: 'medium',
          group: 'billboard'
        },
        {
          type: 'text',
          content: "Even in the title screen!",
          variant: 'quote',
          textAlign: 'center'
        },
        {
          type: 'text',
          content: "The plot follows a taxi driver whose company removed his brakes to force productivity—a move he subverts to pursue his dream of winning the Grand Prix. This arc culminates in the final level, where the company hypocritically plasters his image on billboards to claim his defiance as a marketing victory, adding a layer of satirical depth that mirrors the player's own \"break-the-rules\" playstyle.",
          variant: 'highlight',
          size: 'small'
        }
      ]
    },
    // ############################################################################
    // ONE-BUTTON MENU & UI DESIGN
    // ############################################################################
    {
      title: "One-Button Menu & UI Design",
      description: "Built a full menu system using only Space bar: tap to navigate, hold to confirm—with snappy camera transitions and radial animations for instant feedback.",
      content: [
        {
          type: 'text',
          content: "The primary UX challenge was designing a deep menu system—featuring track selection and vehicle customization—that felt responsive while restricted to a single button. My goal was to eliminate the friction typically associated with limited inputs, ensuring that navigating the interface felt as intentional and fast-paced as the racing itself."
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "I implemented a \"Tap vs. Hold\" interaction model: quick presses for navigation and sustained holds for confirmation. To make this binary input feel tactile, I added radial progress animations to every button. These visual cues provide instant feedback on the input state, ensuring the player never has to guess whether their action has been registered.",
          group: 'buttons'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/buttons.gif',
          size: 'medium',
          group: 'buttons'
        },
        { type: 'separator' },
        {
          type: 'text',
          content: "To heighten the production value, I integrated a dynamic camera system that snaps to different locations based on the current menu. These transitions work in tandem with the UI animations to create a cohesive sense of space, guiding the player's eye from the main menu to the garage without breaking immersion.",
          group: 'camera'
        },
        {
          type: 'image',
          url: '/projects/GD1/Wa Sir L\'taxi/Content/Roles/taxi-camera.gif',
          size: 'medium',
          group: 'camera'
        },
        {
          type: 'text',
          content: "This one-button philosophy remained consistent across the entire project, from the pause menu to the victory screens. The only exception was the use of the Escape key for pausing during gameplay, a deliberate choice to ensure the player's focus remained entirely on the Space bar for every high-stakes driving maneuver."
        },
        {
          type: 'text',
          content: "In the garage and stage select screens, I focused on high-speed accessibility. I designed the layout so players could cycle through vehicles and reset their personal records with minimal inputs, prioritizing a \"jump-in\" feel that rewards the player's desire for immediate replayability.",
          variant: 'accent'
        }
      ]
    }
  ],
  challenge: "With multiple selectable tracks and two distinct driving styles, the primary UX challenge was designing a menu system that felt tight and responsive while being limited to a single button. I needed to prevent the interface from feeling sluggish or frustrating for players who wanted to jump quickly into the action.",
  solution: "I designed a \"Press vs. Hold\" interface: quick taps for navigation and sustained holds for confirmation. To make this intuitive, I implemented dynamic camera transitions and radial UI animations on every button. These visual cues provided constant feedback on the input state, ensuring the player always felt in control of the menu process despite the hardware limitations.",
  coverImage: "/projects/GD1/Wa Sir L'taxi/Wa Sir l'taxi.png",
  overlayColor: "rgba(234, 179, 8, 0.05)",
  bannerColor: "#ffedb7",
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'youtube', url: '0jdoxy1O4_o' },
    { type: 'image', url: '/projects/GD1/Wa Sir L\'taxi/Content/Wa Sir l\'taxi 1.png' },
    { type: 'image', url: '/projects/GD1/Wa Sir L\'taxi/Content/Wa Sir l\'taxi 2.png' },
    { type: 'image', url: '/projects/GD1/Wa Sir L\'taxi/Content/Wa Sir l\'taxi 3.png' }
  ],
  tools: ['Unity'],
  linkUrl: "https://loveneedlove.itch.io/wa-sir-ltaxi",
  linkTitle: "Play Wa Sir L'taxi on itch.io"
};
