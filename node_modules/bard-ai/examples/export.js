import Bard from "bard-ai";

await Bard.init("ewjdIX2ym7dVOwfL_4dBWYDKwWlUXyLO9sys-YAhxUOgUvn4GhXg5VDe3842vv6TC0-uEA.");

// ! Comment out code block underneath, and uncomment this
let myConversation = new Bard.Chat();
console.log(await myConversation.ask("O que é 1+1?"));
console.log(await myConversation.export());

// ! Comment out previous, and uncomment this
let continuedConversation = new Bard.Chat(/* Paste your exported JSON here */);
console.log(
    await continuedConversation.ask("O que você ganha se adicionar 1 a isso?")
);
console.log(await continuedConversation.export());

// Observe how the AI remembers the previous conversation!
