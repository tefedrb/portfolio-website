const header = document.querySelector('header');
const body = document.querySelector('body');
const filmLink = document.querySelector('.filmmaking');
const devLink = document.querySelector('.development');
const aboutLink = document.querySelector('.about-link');
const contactLink = document.querySelector('.contact-link');
const filmPortal = document.querySelector('#film-portal-wrap');
const devPortal = document.querySelector('#dev-portal-wrap');
const aboutPortal = document.querySelector('#about-portal');
const contactPortal = document.querySelector('#contact-portal');
const footer = document.querySelector('footer');
const trainer = document.querySelector('#trainer-img');
const email = document.querySelector('#email');
const headerLogoArray = Array.from(document.querySelector('header h1').children);
const headerLogoDev = document.querySelector('#logo-dev');
const headerLogoFilm = document.querySelector('#logo-film');
const headerLogoAbout = document.querySelector('#logo-about');
const headerLogoContact = document.querySelector('#logo-contact');

const copyToClipboard = (email) => {
    let tempInput = document.createElement('input');
    tempInput.value = email.innerText
    body.appendChild(tempInput).select();
    document.execCommand('copy');
}

const linksArray = () => {
    let mainNavLinks = document.querySelector('#main-nav').children
    let returnArr = [];
    for(let i = 0; i < mainNavLinks.length; i++){
        if(mainNavLinks[i].tagName == 'A'){
            returnArr.push(mainNavLinks[i])
        }
    }
    return returnArr
}

const shiftContent = (element, transX, transY, position) => {
    let translate = `translate(0%, ${transX})`
    if(transY && transX){
        translate = `translate(${transX}, ${transY})`
    } else if(transY){
        translate = `translate(0%, ${transY})`
    }
    if(position){
        element.style.position = position;
    }
    element.style.transform = translate
}

const computedTransX = (element) => {
    let transXstring = element.style.transform
    return transXstring.includes('X') ? 
    transXstring.slice(11, transXstring.length -1) : 
    transXstring.includes(',') ? transXstring.slice(10, transXstring.indexOf(',')) :
    null
}

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
}

const linkSectionIndicator = (link) => {
    const saveLinks = linksArray()
    for(let i = 0; i < saveLinks.length; i++){
        if(saveLinks[i] !== link){
            saveLinks[i].style.borderBottom = '0px'
        }
    }
    link.style.borderBottom = '1px solid #000'
}

const modifyHeaderLogo = (wipeClass, target, addClass) => {
    if(wipeClass) headerLogoArray.forEach(i => i.classList.remove(wipeClass));
    if(addClass) target.classList.add(addClass);
}

header.addEventListener('click', function(e){
    if(e.target == filmLink){
        e.preventDefault()
       if(!filmLink.style.borderBottom.includes('solid')){
            modifyHeaderLogo('logo-visible', headerLogoFilm, 'logo-visible');
            devPortal.style.opacity = '0';
            filmPortal.style.opacity = '1';
            aboutPortal.style.opacity = '0';
            contactPortal.style.opacity = '0';
            filmPortal.style.backgroundColor = 'black';
            shiftContent(filmPortal, '0%', '0%', 'absolute')
            shiftContent(devPortal, '-100%', '0%', 'fixed')
            shiftContent(aboutPortal, '0%', '100%', 'fixed')
            shiftContent(contactPortal, '-100%', '100%', 'fixed')
            linkSectionIndicator(filmLink)
        }
    }

    if(e.target == devLink){
        e.preventDefault()
        if(!devLink.style.borderBottom.includes('solid')){
            modifyHeaderLogo('logo-visible', headerLogoDev, 'logo-visible');
            devPortal.style.opacity = '1';
            filmPortal.style.opacity = '0';
            aboutPortal.style.opacity = '0';
            contactPortal.style.opacity = '0';
            devLink.style.backgroundColor = 'white';
            shiftContent(filmPortal, '100%', '0%', 'fixed')
            shiftContent(devPortal, '0%', '0%', 'absolute')
            shiftContent(aboutPortal, '100%', '100%', 'fixed')
            shiftContent(contactPortal, '0%', '100%', 'fixed')
            linkSectionIndicator(devLink)
        }
    }

    if(e.target == aboutLink){
        e.preventDefault()
        if(!aboutLink.style.borderBottom.includes('solid')){
            modifyHeaderLogo('logo-visible', headerLogoAbout, 'logo-visible');
            devPortal.style.opacity = '0';
            filmPortal.style.opacity = '0';
            aboutPortal.style.opacity = '1';
            contactPortal.style.opacity = '0';
            aboutPortal.style.backgroundColor = "#898B3B";
            shiftContent(filmPortal, '0%', '-100%', 'fixed')
            shiftContent(devPortal, '-100%', '-100%', 'fixed')
            shiftContent(aboutPortal, '0%', '0%', 'absolute')
            shiftContent(contactPortal, '-100%', '0%', 'fixed')
            linkSectionIndicator(aboutLink)
        }
    }
    if(e.target == contactLink){
        e.preventDefault()
        if(!contactLink.style.borderBottom.includes('solid')){
            modifyHeaderLogo('logo-visible', headerLogoContact, 'logo-visible');
            devPortal.style.opacity = '0';
            filmPortal.style.opacity = '0';
            aboutPortal.style.opacity = '0';
            contactPortal.style.opacity = '1';
            contactPortal.style.backgroundColor = "#CA9947";
            shiftContent(filmPortal, '100%', '-100%', 'fixed')
            shiftContent(devPortal, '0%', '-100%', 'fixed')
            shiftContent(aboutPortal, '100%', '0%', 'fixed')
            shiftContent(contactPortal, '0%', '0%', 'absolute')
            linkSectionIndicator(contactLink) 
        }
    }
})

trainer.addEventListener('click', (e) => {
    if(e.target == trainer){
        console.log('ok')
        window.location.pathname = '/Multi_Game/index.html'
    }
})

contactPortal.addEventListener('click', function(e){
    copyToClipboard(e.target)   
})

// flyout-menu
$('.ham-menu-click').on('click', function (){
    $('.flyout-menu').toggleClass('flyout-menu-out')
})

