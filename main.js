var ideas = [];

var saveButton = document.querySelector('.save-button');
var ideaTitle = document.querySelector('#title');
var ideaBody = document.querySelector('#body');
var ideaCardGrid = document.querySelector('.idea-card-grid');
var topParent = document.querySelector('.top-section');
var ideaSection = document.querySelector('.idea-section')

saveButton.addEventListener('click', saveIdeaCard);
saveButton.addEventListener('mouseover', disableSaveButton);
saveButton.addEventListener('mouseout', enableSaveButton);
ideaSection.addEventListener('click', deleteIdeaCard);

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
      <div class="user-idea-header">
        <img src="./assets/star.svg" alt="star"/>
        <img src="./assets/star-active.svg" alt="star-active"/>
        <img id=${ideas[ideas.length-1].id} class="delete-icon" src="./assets/delete.svg" alt="delete-icon"/>
        <img src="./assets/delete-active.svg" alt="delete-icon-active"/>
      </div>
      <div class="user-idea">
        <h3>${ideas[ideas.length-1].title}</h3>
        <p>${ideas[ideas.length-1].body}</p>
      </div>
      <div class="user-idea-footer">
        <img src="./assets/comment.svg" alt="comment-icon"/>
        <section class="comment-button">Comment</section>
        <label class="comment hidden"></label>
      </div>
    </div>
  `;
};

function disableSaveButton(event) {
  if (event.target.className === 'save-button') {
    if (ideaTitle.value == false || ideaBody.value == false) {
      document.querySelector('.save-button').style.opacity = '0.5';
      document.querySelector('.save-button').style.cursor = 'none';
    }
  }
}

function disableSaveButton(event) {
  if (event.target.className === 'save-button') {
    if (ideaTitle.value == false || ideaBody.value == false) {
      document.querySelector('.save-button').style.opacity = '0.5';
      document.querySelector('.save-button').style.cursor = 'none';
    }
  }
}

function enableSaveButton(event) {
  if (event.target.className === 'save-button') {
      document.querySelector('.save-button').style.opacity = '1';
      document.querySelector('.save-button').style.cursor = '';
  }
}

function deleteIdeaCard(event) {
  if (event.target.className === 'delete-icon') {
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id == event.target.id) {
        ideas.splice(i, 1);
      }
    }
  }
  regenerateIdeaCards();
}

function regenerateIdeaCards() {
  ideaCardGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaCardGrid.innerHTML += `
    <div class="idea-card">
      <div class="user-idea-header">
        <img src="./assets/star.svg" alt="star"/>
        <img src="./assets/star-active.svg" alt="star-active"/>
        <img id=${ideas[i].id} class="delete-icon" src="./assets/delete.svg" alt="delete-icon"/>
        <img src="./assets/delete-active.svg" alt="delete-icon-active"/>
      </div>
      <div class="user-idea">
        <h3>${ideas[i].title}</h3>
        <p>${ideas[i].body}</p>
      </div>
      <div class="user-idea-footer">
        <img src="./assets/comment.svg" alt="comment-icon"/>
        <section class="comment-button">Comment</section>
        <label class="comment hidden"></label>
      </div>
    </div>
    `
  }
}

/*

Goal: Remove idea card from both ideas array AND HTML display using deleteIdeaCard() function.

1. Add querySelector variable for .idea-card-grid.
2. Add event listener to execute the deleteIdeaCard() function on click of the the targeted delete button.
3. Write deleteIdeaCard()function so that it removes the item from the array AND the page.

*/
