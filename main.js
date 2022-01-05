var ideas = [];

var saveButton = document.querySelector('.save-button');
var ideaTitle = document.querySelector('#title');
var ideaBody = document.querySelector('#body');

saveButton.addEventListener('click', saveIdeaCard)

saveIdeaCard() {
  var idea = new Idea(ideaTitle.value, ideaBody.value);
  ideas.push(idea);
  console.log(ideas);
  // insertIdeaCard();
}

// function insertIdeaCard() {
//
// };
