class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveIdeaCard() {
    var idea = new Idea(ideaTitle.value, ideaBody.value);
    ideas.push(idea);
    console.log(ideas);
    //insertIdeaCard();

  }

  updateIdea() {
    // should update the idea's starred state.
  }

}
