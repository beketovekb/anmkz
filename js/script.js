var $header = $('.header_content, .header_nav ul');
var $submenu = $('.point_menu .submenu_list');
var $headerlink = $('.header_nav a, .location_place');
var $logo = $('.logo svg .logo_anm, .logo svg .caption_logo_anm')
$(document).scroll(function() {
    $header.css({"background-color": $(this).scrollTop()<10 ? "transparent":"#fff"});
    $submenu.css({"background-color": $(this).scrollTop()<10 ? "#0C0E16":"#fff"});
    $headerlink.css({"color": $(this).scrollTop()<10 ? "#fff":"#000"});
    $logo.css({"fill": $(this).scrollTop()<10 ? "#fff":"#000"});

});


// $(window).scroll(function(){
//   var offset = $('.header').offset(),
//       offsetwb = $('.header + .s1-about_us').offset();
//   if ($(this).scrollTop() > offset.top && $(this).scrollTop() < offsetwb.top)  {
//     $('.num01').css('color','#7B7B7B');
//     $('.num02').css('color','#118BDD');
//   }
//   else {
//     $('.num01').css('color','#118BDD');
//     $('.num02').css('color','#7B7B7B');
//   }
// });

// выбираем блоки
const blocks = document.querySelectorAll('section');

// добавляем обработчик событий прокрутки
window.addEventListener('scroll', () => {
  // получаем текущую позицию скролла
  const currentPosition = window.scrollY;
  
  // проходимся по всем блокам
  blocks.forEach((block, index) => {
    // проверяем, если блок находится в видимой области
    if (currentPosition >= block.offsetTop - 100 && currentPosition < block.offsetTop  + block.offsetHeight) {
      // выводим номер блока
      ind = index + 1
      console.log(`Текущий блок: ${ind}`);
      for (let i = 1; i <= 7; i++) { // выведет 0, затем 1, затем 2
        if(i==ind)
        {
          $('.num0'+ind).css('color','#118BDD');
        }
        else
        {
          $('.num0'+i).css('color','#7B7B7B');
        }
      }
    }
  });
});