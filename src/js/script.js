var bg_width = 2560;
var bg_height = 1600;
var contentHeight = 10000;
var currentHeight = 0;
var naviFrag = false;
var loadflag = false;

$(function(){
    var timer = false;


    $.when(
        setResize(),
        garelly_resize()
    ).done(function(){
        naviFrag = true;
    });
    button_animation();
    $(window).on('resize', function(){
        garelly_resize();
        if (timer !== false){
            clearTimeout(timer);
        }
        timer = setTimeout(setResize, 100);
    }).on('scroll', glNavi_animation);;

    $('.js_link').each(function(){
        $(this).on('click', link_translate);
    });

    $(".p-nav__child__link.js_link").each(glNavi_hover);

    garelly_hover();

    //modal
    modal();

});
//----------resize--------------------------
function setResize(){
    var contentWidth = $(this).width();
    contentHeight = bg_height / bg_width * contentWidth;
    $('section').animate({
        "min-height" : contentHeight
    }, 200);
    $('.p-title').animate({
        'margin-top' : contentHeight/3
    } ,200);

};

//----------navigation_animation------------
function glNavi_animation(){
    if(naviFrag){
        currentHeight = $(this).scrollTop();
        var header = $("header");
        if(currentHeight > contentHeight/2){
            $(header).slideDown(200);
        }else{
            $(header).slideUp(200);
        }
    }
}

function glNavi_hover(){
    $(this).hover(function(){
        $(this).css({
            'color': '#ffab00'
        }).parent().css({
            'border-bottom': '4px solid #ffab00'
        });
    },
                  function(){
        $(this).css({
            'color': '#ffab00'
        }).parent().css({
            'border-bottom': 'none'
        });

    });
}
//----------button_animation----------------
function button_animation(){
    $(".c-btn--top").hover(
        function(){
            $(this).css({
                'background-color':'rgba(0, 0, 0, 0.3)',
                'border-color':'#000000',
                'color': '#130f30'
            });
        },
        function(){
            $(this).css({
                'background-color': 'rgba(255, 255, 255, 0.3)',
                'border-color':'#000000',
                'color': '#130f30'
            });
        });
}
//----------link_animation------------------
function link_translate(){
    var toLink = $(this).attr("href");
    var linkPostion = $(toLink).offset().top;
    $('html,body').animate({ scrollTop: linkPostion }, 300);
    return false;
}
//----------garelly_animation---------------
var garelly = $('.p-garelly--works');
var garelly_child = $('.p-garelly--works .c-garelly__children');

function garelly_hover(){
    $(garelly_child).each(function(){
        $(this).hover(
            function(){
                $(this).find(".c-garelly__children--hover").css("display", "block");
            },
            function(){
                $(this).find(".c-garelly__children--hover").css("display", "none");
            });
    });
}
function garelly_resize(){
   
    var garelly_width = garelly_child.find("img").width();
    $(garelly_child).find(".c-garelly__children--hover").css({
        'width': garelly_width
    });
}

//----------modal---------------
function modal(){
    var current_scrollY;
    
    
    $('.c-imageBox').on('click', function(){
        current_scrollY = $(window).scrollTop();
        var index = $('.c-imageBox').index(this);
        
        $("#wrapper").css({
            position : 'fixed',
            width : '100%',
            top : -1 * current_scrollY
        });
        var height = 50;
        $('.p-modal').show().find(".p-modal__wrap").css("top", height).find('.c-modal__content').eq(index).show();
    });
    
    $('.p-modal__close').on('click', function(){
        $( '#wrapper' ).attr( { style: '' } );
        $( 'html, body' ).prop( { scrollTop: current_scrollY } );
        $('.p-modal').css("display", "none").find('.c-modal__content').hide();
    });
    
}