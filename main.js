const getData = async function(){
    const div = document.createElement('div')
    document.body.append(div)
    div.style.borderStyle = 'solid'
    div.style.padding = '3%'
    const x = await fetch('https://randomuser.me/api/')
    const y = await x.json()
    const obj = y.results[0]

    if (obj['id']['value'] === null){ // לפעמים השרת מחזיר נול וזה תוקע את שאר הפונקציות אז אני עושה קומבינה קטנה כאן
        obj['id']['value'] = ''
    }

    for (let key1 in (obj)){
        let value1 = obj[key1]
        if(typeof value1 ==='object'){
            let key2 = Object.keys(value1)
            let value2 = Object.values(value1)
            const element = document.createElement('div')
            element.innerHTML += "<li>" + key1 +': ' + "</li>"
            let counetr = -1
            key2.forEach(function(Event){
                counetr++
                if (typeof value2[counetr] !== 'object'){
                    element.innerHTML +=  "<ul>" +  "<li>" + Event +  ': ' + value2[counetr]  +"</li>"
                    div.append(element)
                }else{
                    let key3 = Object.keys(value2[counetr])
                    let value3 = Object.values(value2[counetr])
                    if (Event === key2[counetr]){
                        let counetr2 = 0
                        element.innerHTML += "<ul>"+ "<li>" + Event + "</li>"
                        for (let i in key3){
                            element.innerHTML +=  "<ul>"  +"<ul>" + "<li>" + key3[counetr2] + ": " + value3[counetr2] + "</li>" + "</ul>" + "</ul>"  + "</ul>" 
                            counetr2 ++
                            div.append(element)
                        }
                    }
                }
            })
        } else{
            const element = document.createElement('p')
            div.append(element)
            element.innerHTML = "<li>" + key1 +': '+ value1 +"</li>"
        }
    }


    const divBtn = document.createElement('div')
    div.append(divBtn)
    divBtn.style.display = 'flex'
    divBtn.style.justifyContent = 'center'
    divBtn.style.marginTop = '50px'
    const btn = document.createElement('button')
    divBtn.append(btn)
    btn.innerText = "get new user"

    btn.addEventListener('click',function(){
        location.reload()
    })
}

getData()

document.body.style.width = '100vw'
document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'
document.body.style.alignItems = 'center'
