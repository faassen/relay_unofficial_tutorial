export class Author {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}


export class Story {
  constructor(id, text, author) {
    this.id = id;
    this.text = text;
    this.author = author;
  }
}

const jane = new Author('jane', 'Jane');
const john = new Author('john', 'John');

const authors = { jane, john };

const stories = new Map();

function addStory(id, text, author) {
  stories.set(id, new Story(id, text, author));
}

addStory('0', 'This is the story of how I saw the frumious Bandersnatch ' +
         'and lived.', jane);
addStory('1', 'I was wary of the Jubjub bird.', john);
addStory('2', 'My vorpal sword was sharp.', jane);
addStory('3', 'The borogroves were all mimsy.', john);
addStory('4', 'The mome rathes outgrabed.', jane);
addStory('5', 'Beware the Jabberwock, my son!', john);
addStory('6', 'Shun the fruminous Bandersnatch!', jane);
addStory('7', 'I rested by the Tumtum tree.', john);
addStory('8', 'I was a while in thought.', jane);
addStory('9', 'The Jabberwock had eyes of flame.', john);
addStory('10', 'The Jabberwock came wiffling through the tulgey wood.', jane);
addStory('11', 'The Jabberwock burbled as it came!', john);
addStory('12', 'I sought the manxome foe for a long time.', jane);
addStory('13', 'It has claws that bite, claws that catch!', john);
addStory('14', 'It was brillig that day.', jane);
addStory('15', 'The slithy toves gyred and gimbled in the wabe.', john);
addStory('16', 'John stood as in uffish thought.', jane);
addStory('17', 'The vorpal blade went snicker-snack!', john);
addStory('18', 'It was left for dead, they took its head.', jane);
addStory('19', 'She went galumphing back.', john);
addStory('20', 'I chortled in my joy.', jane);
addStory('21', 'O frabjous day!', john);
addStory('22', 'Callooh!', jane);
addStory('23', 'Callay!', john);
addStory('24', 'Come to my arms, my beamish boy!', jane);

export function getStory(id) {
  return stories.get(id);
}

export function getAuthor(id) {
  return authors[id];
}

export function getStories() {
  return [...stories.values()];
}

export function getViewer() {
  return { stories: getStories() };
}
