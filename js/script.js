(function(){
  'use strict';



  var btn = document.querySelector('button'),
      input = document.querySelector('input');


function searchInput(){
  var container = document.getElementById('photo');
  console.log(container);
  var source = document.getElementById('template').textContent;
  console.log(source);
  var compiled = _.template(source);
  console.log(compiled);
  var apiURL = createAPI();
  console.log(apiURL);
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
    console.log(imgs);
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
  console.log(q);
  // var apiURL = endpoint + q + other;
  //https://pixabay.com/api/?key=5992000-de0663331a4d0b877fb659d73&q=yellow+flowers&image_type=photo&pretty=true
  return ('https://pixabay.com/api/?key=5992000-de0663331a4d0b877fb659d73&q=' + q + '&orientation=horizontal');
}
  btn.addEventListener('click', function(){
    searchInput();
  });

})();
