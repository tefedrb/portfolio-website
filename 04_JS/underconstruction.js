// Oh uhh nothing to see here. Move along now.

const blink = () => {
    const cursor = document.querySelector('.cursor')
    if(cursor.style.color === 'white'){
        cursor.style.color = 'transparent'
    } else {
        cursor.style.color = 'white'
    }
    setTimeout(blink, 500)
}

const ttyl = () => {
    let text = `Well HELLO THERE. This is a bit awkward... come back later k?`
    let i = 0;
    const runme = () => {  
        document.querySelector('.text').innerHTML += text[i]
    }
    const newFunc = () => {
        if(i<text.length){
            runme()
            i++
            setTimeout(newFunc, 50)
        } else {return blink()}
    }
    return newFunc
}

const decrypt = (str) => {  
    let hold = str.split('').reverse().splice(4).reverse().join('')
    let output = ''.concat('lmth.', hold)
    return output.split('').reverse().join('')
  }


const findpage = () => {
    window.location.replace(decrypt('xxednikced'))
}

const ttylGo = ttyl()

ttylGo()