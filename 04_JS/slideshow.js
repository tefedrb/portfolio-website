const slideProgressBar = document.querySelector('#slideProgressBar');
const lightBoxContainer = document.querySelector('#lightbox-container');
const lightBoxContent = document.querySelector('#lightbox-content');
const slideBarContainer = document.querySelector('#slideBarContainer');
const slideProgressPercent = document.querySelector('#slideProgress');
const commercialWorkLink = document.querySelector('#commercial-link');
const rrWorkLink = document.querySelector('#rr-link');
const nflLink = document.querySelector('#NFL-link');
const siLink = document.querySelector('#si-link');
const editingPortal = document.querySelector('#editing-portal');
const closeBoxElement = document.querySelector('#close-lightbox');

const slideShowInfo = {
    slide: document.querySelector('#slides-RR div'),
    slideshow: document.querySelector('#slides-RR'),
    pxSlide: 0,
    slidesInView: 3,
    slideShowWidth(){
       const slides = this.slideshow.children;
       const slideWidth = slides[0].offsetWidth + 5;
       return slides.length * slideWidth;
    },
    getSlideWidth(){ 
        return window.getComputedStyle(this.slide).width;
    },
    setCurrentSlide(element){
        this.slide = document.querySelector(element);
    },
    setCurrentSlideShow(element){
        this.slideshow = document.querySelector(element)
        this.slideshow.style.left = '0';
    }
}


$('a.arrow-back').addClass('displayOff')
slideShowInfo.slideshow.style.width = `${slideShowInfo.slideShowWidth()}px`;

const responsiveIframe = () => {
    const width = Math.floor(window.innerWidth - (window.innerWidth / 6));
    const height = Math.floor(width / 16 * 9);
    lightBoxContent.style.width = `${width}px`;
    lightBoxContent.style.height = `${height}px`
}

const calPxSlideLimit = (slidesInView, marginOffSet) => {
    const slideWidth = parseInt(slideShowInfo.getSlideWidth()) + marginOffSet;
    const inViewPx = slideWidth * slidesInView;
    let pxSlideLimit = slideShowInfo.slideShowWidth() - inViewPx; 
    return Math.sign(pxSlideLimit) === 1 ? pxSlideLimit * -1 : 
    Math.sign(pxSlideLimit) === -1 ? pxSlideLimit :
    Math.sign(pxSlideLimit) === 0 ? slideWidth * -1 : null
}

const numOfSlides = (parentElementRef) => {
    return parentElementRef.children.length;
}

const findSlideShowNum = (numOfSlides) => {
    let output;
    const slidesInView = slideShowInfo.slidesInView;
    if(numOfSlides > slidesInView){
        for(let i = slidesInView; i <= numOfSlides; i++){ 
            if(numOfSlides % i === 0) {
                output = i;
                break;
            }
        }
    } else {
        for(let i = slidesInView; i >= numOfSlides; i--){
            if(numOfSlides % i === 0){
                output = i;
                break;
            }
        }
    }
    return output;
};


const displaySlideCount = () => {
    const slideCountWidth = parseInt(window.getComputedStyle(slideBarContainer).width);
    const slideShow = slideShowInfo;
    /* const fullPercentage = -(slideShow.slideShowWidth() / findSlideShowNum(numOfSlides(slideShowInfo.slideshow))); */
    const fullPercentage = calPxSlideLimit(3, 5);
    const currentPercentage = slideShow.pxSlide / fullPercentage * 100;
    slideProgressBar.style.width = `${slideCountWidth / 100 * currentPercentage}px`;
    slideProgressPercent.innerText = `${Math.floor(currentPercentage)}%`;
    if(fullPercentage >= -405 && findSlideShowNum(numOfSlides(slideShowInfo.slideshow)) <=3){
        slideProgressPercent.innerText = '100%';
        slideProgressBar.style.width = '100%';
        $('a.arrow-forward').addClass('displayOff');
        $('a.arrow-back').addClass('displayOff');
    }
}


const nextSlideR = function() { 
    if(slideProgressPercent.innerHTML === '100%') return; 
    $('a.arrow-back').removeClass('displayOff'); 
    slideShowInfo.pxSlide += parseInt(slideShowInfo.getSlideWidth()) * -1 -5;
    $(slideShowInfo.slideshow).css('left', slideShowInfo.pxSlide + "px");
    if (slideShowInfo.pxSlide === calPxSlideLimit){ 
        $('a.arrow-forward').addClass('displayOff')
    }
    displaySlideCount();
}

const nextSlideL = function() {   
    if(slideProgressPercent.innerText === '0%') return;
    $('a.arrow-forward').removeClass('displayOff');
    slideShowInfo.pxSlide += parseInt(slideShowInfo.getSlideWidth()) + 5
    $(slideShowInfo.slideshow).css('left', slideShowInfo.pxSlide + "px")
    if(slideShowInfo.pxSlide === 0) {
        $('a.arrow-back').addClass('displayOff')
   } 
   displaySlideCount()
}

const exitLightBox = () => {
    $('#lightbox-container').fadeOut(500)
    lightBoxContainer.querySelector('#lightbox-content').innerHTML = "";
}

$('a.arrow-forward').on('click', function(e) {
    nextSlideR()
    e.preventDefault() 
})

$('a.arrow-back').on('click', function(e) {
    nextSlideL()
    e.preventDefault()
})

// Exit out of lightbox

$('#close-lightbox').on('click', function(){
    exitLightBox()
})

// Exit out of lightbox with esc key
$('body').on('keydown', function (e) {
    const keyC = e.keyCode
    if (keyC == 27) {
        exitLightBox()  
    }
})

const modifyClassList = (htmlCollection, thisclass, add) => {
    const toArr = Array.from(htmlCollection);
    add ? toArr.forEach(i => i.classList.add(thisclass)) :
    toArr.forEach(i => i.classList.remove(thisclass));
}

editingPortal.addEventListener('click', (e)=>{
    if(e.target === commercialWorkLink){
        modifyClassList(e.target.parentNode.children, 'video-category-selected');
        modifyClassList(e.target.parentNode.children, 'video-category', 'add');
        e.target.classList.remove('video-category');
        e.target.classList.add('video-category-selected');
        $('a.arrow-back').addClass('displayOff');
        $('a.arrow-forward').removeClass('displayOff');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off');
        slideShowInfo.setCurrentSlideShow('#slides-commercial');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off');
        slideShowInfo.pxSlide = 0;
        slideShowInfo.slideshow.style.width = `${slideShowInfo.slideShowWidth()}px`;
        displaySlideCount();
    }

    if(e.target === rrWorkLink){
        modifyClassList(e.target.parentNode.children, 'video-category-selected');
        modifyClassList(e.target.parentNode.children, 'video-category', 'add');
        e.target.classList.remove('video-category');
        e.target.classList.add('video-category-selected');
        $('a.arrow-back').addClass('displayOff');
        $('a.arrow-forward').removeClass('displayOff');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off');
        slideShowInfo.setCurrentSlideShow('#slides-RR');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off')
        slideShowInfo.pxSlide = 0;
        slideShowInfo.slideshow.style.width = `${slideShowInfo.slideShowWidth()}px`;
        displaySlideCount();
    }

    if(e.target === nflLink){
        modifyClassList(e.target.parentNode.children, 'video-category-selected');
        modifyClassList(e.target.parentNode.children, 'video-category', 'add');
        e.target.classList.remove('video-category');
        e.target.classList.add('video-category-selected');
        $('a.arrow-back').addClass('displayOff');
        $('a.arrow-forward').removeClass('displayOff');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off');
        slideShowInfo.setCurrentSlideShow('#slides-NFL');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off')
        slideShowInfo.pxSlide = 0;
        slideShowInfo.slideshow.style.width = `${slideShowInfo.slideShowWidth()}px`;
        displaySlideCount();
    }

    if(e.target === siLink){
        modifyClassList(e.target.parentNode.children, 'video-category-selected');
        modifyClassList(e.target.parentNode.children, 'video-category', 'add');
        e.target.classList.remove('video-category');
        e.target.classList.add('video-category-selected');
        $('a.arrow-back').addClass('displayOff');
        $('a.arrow-forward').removeClass('displayOff');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off');
        slideShowInfo.setCurrentSlideShow('#slides-si');
        slideShowInfo.slideshow.classList.toggle('slideshow-display-off')
        slideShowInfo.pxSlide = 0;
        slideShowInfo.slideshow.style.width = `${slideShowInfo.slideShowWidth()}px`;
        displaySlideCount();
    }

    if(e.target.classList[0] === 'slides-p'){
        const dataLinkAttr = e.target.parentNode.attributes[3].textContent;
        responsiveIframe();
        lightBoxContent.innerHTML = `<iframe width="560" height="315" src="${dataLinkAttr}" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>`;
        $('#lightbox-container').fadeIn(700);
    }
})






