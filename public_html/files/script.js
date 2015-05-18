$(document).ready(function ()
{
   $('#background').fadeIn(800);
   $('#logo').fadeIn(800);

   $('#menubg').animate({opacity: 1}, 1000);
   $('#inside').slideDown(1100);

   $('#loadtext').load("pages/mainpage.html");

   setTimeout(function () {
      $('.scroll').css("overflow", "auto");
      $('#loadtext').animate({opacity: 1}, 'slow');
   }, 1100);


   $('#firstpane p').each(function (index, element) {
      var el = this;
      setTimeout(function () {
         $(el).animate({opacity: 1, marginLeft: '-=200px'}, 500);//.fadeIn(1000).removeClass('hidden');
      }, 1000 + index * 500);
   });

   hideDiv();

   $(window).resize(function () {
      hideDiv();
   });

   $("#firstpane p.menu_head").click(function () {
      $(this).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
   });

   $('.menu_body a').click(function () {
      var url = $(this).attr('href');
      $('#loadtext').fadeOut(600, function () {
         $('#loadtext').load(url, function () {
            $('#loadtext').fadeIn(600, function () {
               var data = localStorage.getItem('comments');
               if (data !== null) {
                  comments = JSON.parse(data);
                  $.each(comments, function (index, item) {
	 $('#loadtext div.append').last().append("<hr color=\"white\" noshade> <div class=\"append\">" + "<p class=\"miniheader\">" + item.name + "</p>" + item.text + "</div>");
                  });
               }
            });
         });
      });
      return false;
   });

   $('#loadtext').on('keyup', "#search_sponsors", function () {
      $('#loadtext #table_sponsors tr:gt(0)').hide();
      $("#table_sponsors tr:Contains('" + $(this).val() + "')").show();
   });

   $('#loadtext').on('keyup', "#search_colonists", function () {
      $('#loadtext #table_colonists tr:gt(0)').hide();
      $("#table_colonists tr:Contains('" + $(this).val() + "')").show();
   });

   $('#loadtext').on('keyup', "#search_spacecraft", function () {
      $('#loadtext #table_spacecraft tr:gt(0)').hide();
      $("#table_spacecraft tr:Contains('" + $(this).val() + "')").show();
   });

   $('#loadtext').on('keyup', "#search_cargo", function () {
      $('#loadtext #table_cargo tr:gt(0)').hide();
      $("#table_cargo tr:Contains('" + $(this).val() + "')").show();
   });

   $('#loadtext').on('click', "#desc", function () {
      $(this).next('#loadtext .description').slideToggle('slow');
   });

   $('#loadtext').on('click', "input#submit", function () {
      var text = $('textarea#comment').val();
      var name = $('input#name').val();
      if(text === '' || name === ''){
         alert("All fields must be filled!");
         return false;
      }
      var comment =
              {
                 name: name,
                 text: text
              };
      var comments;
      var stored_comments = localStorage.getItem('comments');
      if (stored_comments === null) {
         comments = [];
      } else {
         comments = JSON.parse(stored_comments);
      }
      comments.push(comment);
      localStorage.setItem('comments', JSON.stringify(comments));
      $('#loadtext div.append').last().append("<hr color=\"white\" noshade> <div class=\"append\">" + "<p class=\"miniheader\">" + name + "</p>" + text + "</div>");
  
      return false;
   });
   
});

jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function (arg) {
   return function (elem) {
      return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
   };
});

function hideDiv() {
   if ($(window).height() < 500) {
      $("#background").fadeOut("slow");
   } else {
      $("#background").fadeIn("slow");
   }
}