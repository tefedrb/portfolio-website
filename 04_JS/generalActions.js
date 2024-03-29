const header = document.querySelector('header');
const body = document.querySelector('body');
const filmLink = document.querySelector('.filmmaking');
const devLink = document.querySelector('.development');
const aboutLink = document.querySelector('.about-link');
const contactLink = document.querySelector('.contact-link');
const devFlyOutLink = document.querySelector('.development-flyout');
const filmFlyOutLink = document.querySelector('.filmmaking-flyout');
const aboutFlyOutLink = document.querySelector('.about-link-flyout');
const contactFlyOutLink = document.querySelector('.contact-link-flyout');
const flyOutMenu = document.querySelector('.flyout-menu');
const filmPortal = document.querySelector('#film-portal-wrap');
const devPortal = document.querySelector('#dev-portal-wrap');
const aboutPortal = document.querySelector('#about-portal');
const contactPortal = document.querySelector('#contact-portal');
const footer = document.querySelector('footer');
const trainer = document.querySelector('#trainer-img');
const quadSquad = document.querySelector('#proj2');
const project1 = document.querySelector('#proj1');
const project2 = document.querySelector('#travel-buddy');
const email = document.querySelector('#email');
const headerLogoArray = Array.from(document.querySelector('header h1').children);
const headerLogoDev = document.querySelector('#logo-dev');
const headerLogoFilm = document.querySelector('#logo-film');
const headerLogoAbout = document.querySelector('#logo-about');
const headerLogoContact = document.querySelector('#logo-contact');
const slideShowArray = Array.from(document.querySelector('#slideshow').children);
const filmVidAll = Array.from(filmPortal.querySelectorAll('video'));
const filmVidBg = filmPortal.querySelector('#film-video-bg');


const condenseHeader = () => {
    window.setTimeout(function(){
        
    })
}

// const copyToClipboard = (email) => {
//     let tempInput = document.createElement('input');
//     tempInput.value = email.innerText;
//     body.appendChild(tempInput).select();
//     document.execCommand('copy');
// };

const realignWindow = (positionY, duration) => {
    // Thanks to gizma.com/easing formulas and Dev Ed (youtube channel) for inspiring this function
    if(window.scrollY === positionY) return;
    const currentScroll = window.scrollY;
    let distance;  
    let startTime = null;
    const ease = (t, b, c, d) =>{
        return c*t/d + b;
    }; 

    currentScroll > positionY ? distance = (currentScroll - positionY) * -1:
    distance = positionY;

    const animation = (currentTime) =>{
        if(startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
         // To use easeInOutCubic to scroll - using window.scrollTo()
         const easeInOut = ease(timeElapsed, currentScroll, distance, duration);
         window.scrollTo(0, easeInOut);
         //base case - compare timeElapsed to duration
        if(duration > timeElapsed) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
};

const linksArray = () => {
    let mainNavLinks = document.querySelector('#main-nav').children
    let returnArr = [];
    for(let i = 0; i < mainNavLinks.length; i++){
        if(mainNavLinks[i].tagName == 'A'){
            returnArr.push(mainNavLinks[i]);
        }
    }
    return returnArr
};

const shiftContent = (element, transX, transY, position) => {
    realignWindow(0, 500);
    setTimeout(function(){
        let translate = `translateX(${transX})`;
    if(transY && transX){
        translate = `translate(${transX}, ${transY})`;
    } else if(transY){
        translate = `translate(0%, ${transY})`;
    }
    element.style.transform = translate;
    }, 250)
    if(position){
        setTimeout(function(){
            element.style.position = position;
        }, 750)
    }
};

const computedTransX = (element) => {
    let transXstring = element.style.transform
    return transXstring.includes('X') ? 
    transXstring.slice(11, transXstring.length -1) : 
    transXstring.includes(',') ? transXstring.slice(10, transXstring.indexOf(',')) :
    null
};

const toggleMainContainer = (main, about) => {
    const devLeft = devPortal.style.left;
    const filmLeft = filmPortal.style.left
    if(body.style.overflowY === 'hidden'){
        body.style.overflowY = null
        shiftContent(filmPortal, filmLeft ? filmLeft : null, computedTransX(filmPortal), '0%')
        shiftContent(devPortal, devLeft ? devLeft : null, computedTransX(devPortal), '0%')
        shiftContent(aboutPortal, null, '-50%', '-200%')
        devPortal.style.removeProperty('transform')
        filmPortal.style.removeProperty('transform')
    } else if(main && about){
        body.style.overflowY = 'hidden'
        shiftContent(filmPortal, filmLeft ? filmLeft : null, computedTransX(filmPortal), '200%')
        shiftContent(devPortal, devLeft ? devLeft : null, computedTransX(devPortal), '200%')
        shiftContent(aboutPortal, null, '-50%', '25vh')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
};

const linkSectionIndicator = (link) => {
    const saveLinks = linksArray()
    for(let i = 0; i < saveLinks.length; i++){
        if(saveLinks[i] !== link){
            saveLinks[i].style.borderBottom = '0px'
        }
    }
    link.style.borderBottom = '1px solid #000'
};

const modifyHeaderLogo = (wipeClass, target, addClass) => {
    if(wipeClass) headerLogoArray.forEach(i => i.classList.remove(wipeClass));
    if(addClass) target.classList.add(addClass);
};

const portalOpacityAndVid = (portal) => {
    portal === "devPortal" ? devPortal.style.opacity = '1' : 
    devPortal.style.opacity = '0';
    if(portal == "filmPortal"){
        filmPortal.style.opacity = '1';
        setTimeout(function(){
            filmPortal.querySelector('#film-video-bg').style.opacity = '1';
            filmVidBg.play();
        }, 500)
    } else {
        filmPortal.style.opacity = '0';
        setTimeout(function(){
            filmPortal.querySelector('#film-video-bg').style.opacity = '0';
            filmVidAll.forEach(vid => vid.pause());
        }, 500)
    }
    portal === "aboutPortal" ? aboutPortal.style.opacity = '1' : 
    aboutPortal.style.opacity = '0'; 
    portal === "contactPortal" ? contactPortal.style.opacity = '1':
    contactPortal.style.opacity = '0';
}

const shiftToFilm = () => {
    modifyHeaderLogo('logo-visible', headerLogoFilm, 'logo-visible');
    portalOpacityAndVid("filmPortal");
    shiftContent(filmPortal, '0%', '0%', 'absolute');
    shiftContent(devPortal, '-100%', '0%', 'fixed');
    shiftContent(aboutPortal, '0%', '100%', 'fixed');
    shiftContent(contactPortal, '-100%', '100%', 'fixed');
    console.log(this.location, "MAIN")
};

const shiftToDev = () => {
    modifyHeaderLogo('logo-visible', headerLogoDev, 'logo-visible');
    portalOpacityAndVid("devPortal");
    shiftContent(filmPortal, '100%', '0%', 'fixed');
    shiftContent(devPortal, '0%', '0%', 'absolute');
    shiftContent(aboutPortal, '100%', '100%', 'fixed');
    shiftContent(contactPortal, '0%', '100%', 'fixed');
    console.log("YEAHHHHH")
};

const shiftToAbout = () => {
    modifyHeaderLogo('logo-visible', headerLogoAbout, 'logo-visible');
    portalOpacityAndVid("aboutPortal");
    // aboutPortal.style.backgroundColor = "#898B3B";
    shiftContent(filmPortal, '0%', '-100%', 'fixed');
    shiftContent(devPortal, '-100%', '-100%', 'fixed');
    shiftContent(aboutPortal, '0%', '0%', 'absolute');
    shiftContent(contactPortal, '-100%', '0%', 'fixed');
    console.log(this.location, "MAIN")
};

const shiftToContact = () => {
    modifyHeaderLogo('logo-visible', headerLogoContact, 'logo-visible');
    portalOpacityAndVid("contactPortal");
    shiftContent(filmPortal, '100%', '-100%', 'fixed');
    shiftContent(devPortal, '0%', '-100%', 'fixed');
    shiftContent(aboutPortal, '100%', '0%', 'fixed');
    shiftContent(contactPortal, '0%', '0%', 'absolute');
    console.log(this.location, "MAIN")
};

const handleLinking = (e) => {
    if(e.target == filmLink || this.location.hash == "#film-portal"){
       if(!filmLink.style.borderBottom.includes('solid')){
            shiftToFilm(filmLink);
            linkSectionIndicator(filmLink);
        }
    }
    // Adding an or statement here to have the anchors present
    if(e.target == devLink || this.location.hash == "#dev-portal"){
        // e.preventDefault()
        if(!devLink.style.borderBottom.includes('solid')){
            shiftToDev(devLink);
            linkSectionIndicator(devLink);
        }
    }
    if(e.target == aboutLink || this.location.hash == "#about-portal"){
        // e.preventDefault()
        if(!aboutLink.style.borderBottom.includes('solid')){
            shiftToAbout(aboutLink);
            linkSectionIndicator(aboutLink);
        }
    }
    if(e.target == contactLink || this.location.hash == "#contact-portal"){
        // e.preventDefault()
        if(!contactLink.style.borderBottom.includes('solid')){
            shiftToContact(contactLink);
            linkSectionIndicator(contactLink);
        }
    }
}

window.addEventListener('hashchange', handleLinking);
header.addEventListener('click', handleLinking);

flyOutMenu.addEventListener('click', function(e){
    if(e.target == devFlyOutLink){
        shiftToDev();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == filmFlyOutLink){
        shiftToFilm();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == aboutFlyOutLink){
        shiftToAbout();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == contactFlyOutLink){
        shiftToContact();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
})

devPortal.addEventListener('click', (e) => {
    if(e.target == trainer){
        console.log(e.target)
        window.location.pathname = '/Multi_Game/index.html';
    }
    if(e.target == quadSquad){
        console.log(e.target)
        window.location.pathname = '/Quad_Squad/index.html';
    }
    if(e.target == travelBuddy){
        console.log(e.target)
        window.location.pathname = '/Travel_Buddy/index.html';
    }
})

// contactPortal.addEventListener('click', function(e){
//     copyToClipboard(e.target);   
// })

// flyout-menu
$('.ham-menu-click').on('click', function (){
    $('.flyout-menu').toggleClass('flyout-menu-out')
});

const hiddenOnAllPortals = (except) => {
  slideShowArray.forEach(i => {
    i !== except ? i.style.overflow = 'hidden': i.style.overflow = 'initial';
  })
};


// const sendMail = await fetch ('php/mail.php', {
//     method: 'POST',
//     body: JSON.stringify()
// }) 

const sendMail2 = (e) => {
    e.preventDefault();
    console.log(e, 'well...')
}


