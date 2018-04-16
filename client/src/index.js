
console.log('starting sync service!')

let DiffSyncClient = require('diffsync').Client

let socket = require('socket.io-client')

let client = new DiffSyncClient(socket('http://localhost:3001'), 'form-data')

let data = {}
client.on('connected', function () {
    // Die Datenreferenz, welche zum synchronisieren verwendet wird.
    data = client.getData()
    console.log('Verbunden!')
    console.log('Daten akutell:')
    if (data['liste'] == null) {
        data['liste'] = []
        client.sync()
    } else {
        draw()
    }

    console.log(data)
})

client.on('synced', function () {
    // Wird aufgerufen, wenn neue Daten vom Server reinkommen
    console.log('Neue Daten vom Server!')
    console.log('Synchronisierte Daten akutell:')
    console.log(data)
    draw()
})

window.addEventListener('load', () => {
})

function draw () {
    let b
    let row
    document.getElementById('list').innerHTML = ''
    // name Row
    row = document.createElement('tr')

    row.appendChild(document.createElement('td')).appendChild(document.createElement('b')).innerText = 'Name'
    row.appendChild(document.createElement('td')).appendChild(document.createElement('b')).innerText = 'Anzahl'
    row.appendChild(document.createElement('td')).appendChild(document.createElement('b')).innerText = 'Einheit'
    document.getElementById('list').appendChild(row)

    // input row

    row = document.createElement('tr')
    row.appendChild(document.createElement('td')).appendChild(document.createElement('input')).setAttribute('id', 'name_input')
    row.appendChild(document.createElement('td')).appendChild(document.createElement('input')).setAttribute('id', 'amt_input')
    row.appendChild(document.createElement('td')).appendChild(document.createElement('input')).setAttribute('id', 'unit_input')
    b = row.appendChild(document.createElement('td')).appendChild(document.createElement('input'))
    b.setAttribute('id', 'submit')
    b.setAttribute('type', 'button')
    b.value = 'Einfügen'
    document.getElementById('list').appendChild(row)

    // iterate over items
    for (let i in data['liste']) {
        let name = data['liste'][i]['name']
        let amt = data['liste'][i]['amt']
        let unit = data['liste'][i]['unit']
        let index = i

        // test row
        row = document.createElement('tr')

        // name text field
        b = row.appendChild(document.createElement('td'))
        b.innerText = name
        b.setAttribute('index', index)
        b.setAttribute('field', 'name')
        b.className += 'row_' + index

        // amt text field
        b = row.appendChild(document.createElement('td'))
        b.innerText = amt
        b.setAttribute('index', index)
        b.setAttribute('field', 'amt')
        b.className += 'row_' + index

        // unit text field
        b = row.appendChild(document.createElement('td'))
        b.innerText = unit
        b.setAttribute('index', index)
        b.setAttribute('field', 'unit')
        b.className += 'row_' + index

        // delete button
        b = row.appendChild(document.createElement('td')).appendChild(document.createElement('input'))
        b.setAttribute('id', index + '_delete')
        b.setAttribute('index', index)
        b.setAttribute('type', 'button')
        b.className += 'delete'
        b.value = 'Löschen'
        b.addEventListener('click', function () {
            data['liste'].splice(index, 1)
            client.sync()
            draw()
        })

        // edit button
        b = row.appendChild(document.createElement('td')).appendChild(document.createElement('input'))
        b.setAttribute('id', index + '_edit')
        b.setAttribute('index', index)
        b.setAttribute('type', 'button')
        b.className += 'edit'
        b.value = 'Bearbeiten'

        b.addEventListener('click', function () {
            let b2 = b.cloneNode(true)
            b.parentNode.replaceChild(b2, b)
            b = b2
            console.log(b.getAttribute('index'))

            let v = document.getElementsByClassName('row_' + index)
            for (let oldText of v) {
                console.log(oldText)
                let val = oldText.innerText
                oldText.innerHTML = ''
                let newInput = oldText.appendChild(document.createElement('input'))
                newInput.value = val
                b.value = 'Bestätigen'

                b.addEventListener('click', function () {
                    console.log(data['liste'][index][oldText.attributes['field'].value])

                    data['liste'][index][oldText.attributes['field'].value] = newInput.value
                    client.sync()
                })
            }
        })

        document.getElementById('list').appendChild(row)
    }
    document.getElementById('submit').addEventListener('click', function () {
        data['liste'].push({name: document.getElementById('name_input').value, amt: document.getElementById('amt_input').value, unit: document.getElementById('unit_input').value})
        client.sync()
        draw()
    })
}

client.initialize()
