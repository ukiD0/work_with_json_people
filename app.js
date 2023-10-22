 const list = document.querySelector('#list')
 const  filter = document.querySelector('#filter')
 let USERS = []

filter.addEventListener('input',(event) => { //поиск 
    const value = event.target.value.toLowerCase()
    const filteredUSERS = USERS.filter((user) => user.name.toLowerCase().includes(value))
    render(filteredUSERS) //по нижнему регистру
})

 async function start() {
    list.innerHTML = 'Loading...'
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await resp.json()
        setTimeout(() => {
            USERS = data
            render(data)
        }, 2000)
        
    } catch (err) {     //ловим ошибку
        list.style.color ='red'
        list.innerHTML = err.message
    }
 } 

 function render(users = []) {
    if (users.length == 0) { //проверяет на совпадение если нет выдает не найдено
        list.innerHTML = 'No matched users!'
    } else {
    const html = users.map(toHTML).join('')
    list.innerHTML = html
}
 }

function toHTML(user) {         //редачим джсончик и криво выводим
    return `
        <li class="list-group-item">Номер пользователя ${user.userId}<br>Статус -- ${user.title}<br>Главная мысль дня -- ${user.body}</li>`
}

 start()