const Enter = document.getElementById('Enter');
const textfield = document.getElementById('textfield')
const textmodes = document.getElementById("textmodes")
const sidebar = document.getElementById('sidebar')
const contextmenu = document.getElementById('contextmenu')
let text = document.getElementById('text'), clicked_classname


function wrtext() {
  let writedtext_styleclass = textmodes.value, writedtext_name = text.value.replace(' ', '')

  textfield.insertAdjacentHTML('BeforeEnd', '<div class = ' + writedtext_styleclass + '>' + "<p>" + text.value + "</p>" + '</div>');
  text.value = ""
  console.log(writedtext_styleclass)

  // Переключает режимы ввода текста. Сделано для удобства написания Диалогов.
  if (writedtext_styleclass == "Hero") {
    textmodes.selectedIndex = 1
  }
  else if (writedtext_styleclass == "Line") {
    textmodes.selectedIndex = 0
  }
}

function writeAndSafe() {
  wrtext()
  safeprogress()
}
// Функция которая отправляет текст 
function Send_Enter_Button(event) {
  if (event.which == 13) {
    wrtext()
    textfield.lastChild.scrollIntoView()
    safeprogress()
  }
  else if (event.altKey == true && event.which == 8) {
    textfield.lastChild.remove()
    if (textfield.lastChild.className == 'chapter') {
      textfield.lastChild.remove()
      sidebar.lastChild.remove()
    }
  }

}
// Проста функция которая удаляет последний блок 
function Delete_button(event) {
  if (event.altKey == true && event.which == 8) {
    textfield.lastChild.remove()
  }
}
// Простая функция по переключению режимов ввода текста при зажатой клавише альт и 1-4
function ModeOfText(event) {
  if (event.altKey == true)
    if (event.which == 49) {
      textmodes.selectedIndex = 0
    }
    else if (event.which == 50) {
      textmodes.selectedIndex = 1
    }
    else if (event.which == 51) {
      textmodes.selectedIndex = 2
    }
    else if (event.which == 52) {
      textmodes.selectedIndex = 3
    }

}
// Функции по редактированию текста. Разделены потому что было необходимо узнать значение клавиши
function edit_writed_text() {
  const texfield_inners = document.querySelectorAll('#textfield > div')
  texfield_inners.forEach(element => {
    element.addEventListener('click', () => {
      clicked_classname = element.className
      text.value = element.textContent
      element.className = 'redacting'
    })
  });
}
function redacting_marked_text(event) {
  //alt+r Позволяет редактировать текст оставив тот же тип болка с которым он написан
  const redacting = textfield.querySelectorAll('div.redacting')
  if (event.altKey == true && event.which == 82) {
    redacting[0].textContent = text.value
    text.value = ''
    redacting[0].className = clicked_classname
    for (let index = 0; index <= redacting.length; index++) {
      delete redacting[index]
    }
  }
  // alt+e Позовляет редактировать текст изменив тип блока .
  else if (event.altKey == true && event.which == 69) {
    event.preventDefault()
    redacting[0].textContent = text.value
    text.value = ''
    redacting[0].className = textmodes.value
    for (let index = 0; index <= redacting.length; index++) {
      delete redacting[index]
    }
  }
}

function sidebarChapters(event) {
  if (event.altKey && event.which == 67) {
    const chaptersList = textfield.querySelectorAll('div.Chapter')
    console.log(chaptersList)
  }
}

function safeprogress() {
  localStorage.setItem('nametext', textfield.innerHTML)
}
function loadprogress(event) {
  // alt + s загрузка сохраненного текста 
  if (event.altKey && event.which == 83){
    textfield.innerHTML = localStorage.nametext
  }
  // alt + d удаление сохраненного текста 
  else if (event.altKey && event.which == 68) {
    event.preventDefault()
    localStorage.clear()
  }
}

// футкция которая вызывает контекстное меню.
function RMBcontextmenu(event) {
  if (event.altKey == true && event.which == 3) {
    event.preventDefault()
    contextmenu.style.display = 'block' 
    contextmenu.style.top = event.offsetY + 'px'
    contextmenu.style.left = event.offsetX + 'px'
  }
}
Enter.addEventListener("click", writeAndSafe)
window.addEventListener('keydown', ModeOfText)
window.addEventListener('keydown', Send_Enter_Button)
window.addEventListener('change', Delete_button)
window.addEventListener('change', edit_writed_text)
window.addEventListener('keydown', redacting_marked_text)
window.addEventListener('change', safeprogress)
window.addEventListener('keydown', loadprogress)
window.addEventListener('mousedown', RMBcontextmenu)

// Просто удобный способ узнать код нажатой клавиши. 
// window.addEventListener('keydown', (event) => {
//   console.log(event.key, event.which, event.altKey)
// })
window.addEventListener('mousedown', (event) => {
  console.log( event.which, event.altKey)
})