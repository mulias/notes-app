import { getAppDataSource } from "@/data-source";
import { Note } from "@/entity/Note";

export const seedAdventurerNotes = async () => {
  const AppDataSource = await getAppDataSource();
  const repo = AppDataSource.getRepository(Note);

  await Promise.all(
    notes.map((body) => {
      const note = Note.newBuilder();
      note.body = body;
      return repo.save(note);
    }),
  );
};

const notes = [
  "The baby dragon's breath grows dim; feed it the embers of twilight before sunset.",
  "Beyond the waterfall, the hidden cave whispers secrets only the brave and mad dare to hear.",
  "The singing tree hums lullabies that echo through time, soothing beasts and bending reality.",
  "Why does the moonlight shimmer on the lake? Ask the water spirits who dance in ripples of silver.",
  "Collect nightshade for the witch's brew; beware, for the plants whisper tales of forgotten sorrows.",
  "Whispering Woods where the trees tell stories of times that never were and futures that might be.",
  "The gryphon trader barters in feathers of memory, trading colors for forgotten dreams.",
  "What lies beyond the enchanted forest? A realm where time flows backward and shadows speak in riddles.",
  "Meet the elf guide at the old oak tree, where the leaves whisper of hidden paths and lost loves.",
  "The labyrinth of shifting walls breathes, its passages twisting with every heartbeat.",
  "The ghostly deer glows under the full moon, its eyes reflecting the dreams of those who dare to gaze.",
  "How do you catch a glimpse of a shadow cat? Follow the trail of disappearing echoes and whispered fears.",
  "Milk the moonlit cow for enchanted cream; its milk glows with the light of a thousand forgotten stars.",
  "Mushroom village at the forest's edge, where fungi hum tunes that guide lost souls home.",
  "The mermaid sings of lost treasures, her voice weaving through the waves of time and tears.",
  "Can the talking skull be trusted? Its jokes are deadly, but its wisdom is ancient and sharp.",
  "Translate the goblin's riddles tonight; their solutions unlock doors to realms unseen and dreams untold.",
  "Invisible tower, seen only at sunset, when the sky bleeds colors unknown to mortal eyes.",
  "The frost witch's hair flows like northern lights, her eyes reflecting the cold of forgotten winters.",
  "What secrets does the old crow know? It caws in tongues of the dead, revealing truths buried deep.",
  "Borrow the jester's cap for luck; but beware, it carries the whispers of a hundred tricksters.",
  "Phantom deer's glade at dawn, where the air thickens with the scent of forgotten dreams.",
  "The fairy trader deals in stardust and moonbeams, often trading for fragments of lost time.",
  "Why does the phoenix hide in the volcano, appearing only when stars align with forgotten constellations?",
  "Meet the time-traveling bard at the crossroad. He sings of futures that never were and pasts that might be.",
  "Map the shifting labyrinth; its walls change with each heartbeat, revealing paths to nowhere.",
  "The cyclops' eye grants night vision; many seek it, but few return from the cave where it slumbers.",
  "Who built the stone giants in the mountains? Legends speak of sorcerers who bent the earth to their will.",
  "The talking skull knows secrets; it demands a price paid in whispers and blood.",
  "Seek the unicorn's lost horn; its touch heals wounds of the flesh and soul.",
  "The enchanted forest is full of traps; vines move and the ground shifts beneath unwary feet.",
  "Why does the wind whisper on the cliff? It carries messages from beyond the veil of life.",
  "Ancient ruins hold forbidden knowledge; only the brave enter, risking mind and body.",
  "Speak with the fish that knows secrets; it swims in the crystal lake at the heart of the world.",
  "How do you find the invisible ink? It reveals itself under a full moon and ancient chants.",
  "Find the living book in the enchanted library; it walks on tiny legs and whispers forgotten lore.",
  "The silver dragon is wise; it hoards not gold but tales of times long past and futures unseen.",
  "Where is the secret passage behind the waterfall? Only those who solve the stone riddle may enter.",
  "The alchemist needs dragon scales; rare ingredients that bring power and peril.",
  "The ghost ship sails under the new moon, its crewless form drifting on phantom winds.",
  "Charm the beasts with the enchanted flute; the notes must be played in a sequence forgotten by time.",
  "The enchanted mirror shows desires true, but reveals fears and regrets buried deep.",
  "Retrieve the cursed doll from the haunted inn; its eyes follow, its whispers drive men mad.",
  "The crystal cave is full of wonders; light dances, creating illusions of creatures long gone.",
  "The oracle's prophecy speaks of great danger; a hero must rise, the path fraught with peril.",
  "What lies beneath the ancient ruins? The ground trembles, cold winds blow from unseen cracks.",
  "Find the lost melody in the wind chimes; it brings peace to troubled hearts, clarity to confused minds.",
  "Help the fire sprite with its lost ember; without it, the sprite's light dims, it cannot return home.",
  "The shadow assassin is elusive, dangerous; they strike without warning, presence known by absence of light.",
  "Why does the shadow cat avoid the light? Its fur shimmers with shadows, nearly invisible in darkness.",
];
