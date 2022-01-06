var ideas = [];

var saveButton = document.querySelector('.save-button');
var ideaTitle = document.querySelector('#title');
var ideaBody = document.querySelector('#body');
var ideaCardGrid = document.querySelector('.idea-card-grid');

saveButton.addEventListener('click', saveIdeaCard);

function saveIdeaCard() {
  if (ideaTitle.value != false && ideaBody.value != false) {
  var idea = new Idea(ideaTitle.value, ideaBody.value);
  ideas.push(idea);
  insertIdeaCard();
  ideaTitle.value = "";
  ideaBody.value = "";
  }
}

function insertIdeaCard() {
  ideaCardGrid.innerHTML += `
    <div class="idea-card">
      <div class="user-idea-header"></div>
      <div class="user-idea">
        <h3>${ideas[ideas.length-1].title}</h3>
        <p>${ideas[ideas.length-1].body}</p>
      </div>
      <button class="comment-button">Comment</button>
      <label class="comment hidden"></label>
    </div>
  `;
};
