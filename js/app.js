'use strict';

$(document).ready(function() {

  const allHorns = [];

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
  

  Horn.collectHorns = () =>{
    $.get('data/page-1.json','json').then(data =>{
      data.forEach(horn => new Horn(horn));
      allHorns.forEach(horn => horn.render());
      allHorns.forEach(horn => horn.makeOption());
    });
  };
  Horn.collectHorns();
  

  $('#hornAnimalDrop').change(function() {
    /*$(".showAnimals").css('display','none');*/
    let $selected = $(this).val();
    console.log($selected);
    
    $('section').hide();
   
    $(`.${$selected}`).show();

  });

});

