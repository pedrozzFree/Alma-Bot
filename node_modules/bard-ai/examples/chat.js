import Bard from "bard-ai";

await Bard.init("ewjdIX2ym7dVOwfL_4dBWYDKwWlUXyLO9sys-YAhxUOgUvn4GhXg5VDe3842vv6TC0-uEA.");

let myConversation = new Bard.Chat();
console.log(await myConversation.ask("Como vai você?"));
console.log(await myConversation.ask("Qual foi a última coisa que eu disse?"));
