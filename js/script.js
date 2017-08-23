(function(){
  'use strict';



  var btn = document.getElementById('button'),
      input = document.getElementById('input'),
      form = document.getElementById('form');


function searchInput(){
  var container = document.getElementById('photo');
//  console.log(container);
  var source = document.getElementById('template').textContent;
//  console.log(source);
  var compiled = _.template(source);
//  console.log(compiled);
  var apiURL = createAPI();
//  console.log(apiURL);
  var promise = fetch(apiURL)
  .then(function(response){
    if (response.ok){
      return response.json();
    }
    throw new Error('Error during fetch');
  })
  .then(function(data){
    var imgs = _.map(data.hits, function(item){
            return {
          webformatURL:item.webformatURL,
          tags: item.tags
          };

    });
    // console.log(imgs);
    render(compiled, imgs, container);
  });
}


function render(template, data, parent) {
  var htmlString = ' ';

  _.forEach(data, function(item) {
    htmlString += template(item);
  });

parent.innerHTML = htmlString;
}



function createAPI (){


  // var endpoint = 'https://pixabay.com/api/?key=5992000-de0663331a4d0b877fb659d73&q=';
  // var other = '&orientation=horizontal';
  var q = input.value;
  // console.log(q);
  // var apiURL = endpoint + q + other;
  //https://pixabay.com/api/?key=5992000-de0663331a4d0b877fb659d73&q=yellow+flowers&image_type=photo&pretty=true
  return ('https://pixabay.com/api/?key=5992000-de0663331a4d0b877fb659d73&q=' + q + '&orientation=horizontal');
}
  btn.addEventListener('click', function(){
    searchInput();
  });

        function addEvent(obj, type, fn){
            if (obj.addEventListener){
                obj.addEventListener( type, fn, false );
            } else if(obj.attachEvent) {
                obj.attachEvent( "on"+type, fn );
            } else {
                obj["on"+type] = fn;
            }
        }
        addEvent(form, 'keypress', function(e) {
            if (e.keyCode == 13) {
                searchInput();
                e.preventDefault();
            }
        });

var question = document.getElementById('question'),
    answers = document.getElementById('answers'),
    correctAnswer = document.getElementById('correctAnswer'),
    submit = document.getElementById('submit');

function TestConstructor (question, answers, correctAnswer){
  this.question = question;
  this.answers = answers;
  this.correctAnswer = correctAnswer;
}

//localStorage.clear();
var getArray = [];
localStorage.setItem('storageElement', '[]');


  function pushStorage (test){
      getArray.push(test);
      localStorage.setItem('storageElement',JSON.stringify(test));
      getArray= JSON.parse(localStorage.getItem('storageElement'));
    }

submit.addEventListener('click', function(e){

create();
e.preventDefault();

});




function makeTemplate(dataTest) {
    var containerTest = document.getElementById('containerTest'),
    sourceTest = document.getElementById('templateTest').textContent,
    templateTest = _.template(sourceTest);
    containerTest.innerHTML += templateTest(dataTest);
  }

function create (){
  var arrQuestion = question.value,
      arrAnswers = answers.value,
      newArrAnswers = arrAnswers.split(','),
      arrCorrectAnswer = correctAnswer.value;


   var test = new TestConstructor(arrQuestion, newArrAnswers, arrCorrectAnswer);

   pushStorage(test);
   makeTemplate(getArray);
   getArray = [];
}






})();
