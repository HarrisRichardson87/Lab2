'use strict';
let allHorns = [];

function Horn(horn){
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns
  allHorns.push(this);
}
Horn.prototype.render = function () {
  const hornSectionHtml = $('#hornAnimal').html();

  $('main').append('<section id="clone"></section>');
  $('#clone').html(hornSectionHtml);
  $('#clone').find('h2').text(this.title);
  $('#clone').find('img').attr('id',this.title)
  $('#clone').find('img').attr('src', this.image_url);
  $('#clone').find('alt').attr('alt', this.description);
  $('#clone').attr('class',this.keyword);
  $('#clone').attr('id', this.title);
  $('#clone').find('h2').attr('id',this.horns);
}

Horn.prototype.makeOption = function(){
  if($(`option[id = ${this.keyword}]`).length)return;
  $('#hornAnimalDrop').append('<option id = "drop"></option>');
  $('#drop').text(this.keyword);
  $('#drop').find('alt').attr('alt',this.description);
  $('#drop').attr('id', this.keyword);
}
const testHornedAnimal = new Horn ({});
testHornedAnimal.render();


Horn.collectHorns = data =>{
  $.get(`${data}`,'json').then(data =>{
    data.forEach(horn => new Horn(horn));
    allHorns.forEach(horn => horn.render());
    allHorns.forEach(horn => horn.makeOption());
  });
};

$('#hornAnimalDrop').change(function() {
  let $selected = $(this).val();
  console.log($selected);
  $('section').hide();
  $(`.${$selected}`).show();
});


$('header').on('click','button',function(){
  console.log($(this).text())
  allHorns = [];
  $('main').empty();

  Horn.collectHorns(`data/${$(this).text()}.json`);
  console.log(allHorns);

});

$(document).ready(function() {
  Horn.collectHorns('data/page-1.json')
  $('header').on('click','p',function(){
    allHorns.sort((a,b)=>{
      $('main').empty();
      if(a.title > b.title) return 1;
      if(a.title < b.title) return -1;
      return 0;
    })
    allHorns.forEach(horn => horn.render());
  })
  $('header').on('click','h3',function(){
    $('main').empty();
    allHorns.sort((a,b)=>{
      if(a.horns > b.horns) return 1;
      if(a.horns < b.horns) return -1;
      return 0;
    })
    allHorns.forEach(horn => horn.render());


  })


});

