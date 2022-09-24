

function build_table(data_check){
    document.getElementById('table-contain').innerHTML = ''
    if (data_check.length != 0){
        let data_table = document.createElement('table');
        data_table.id='data-table';
        let header = document.createElement('thead');
        let body = document.createElement('tbody');
    
        data_table.appendChild(header);
        data_table.appendChild(body);

    
        let row0 = document.createElement('tr');
        let header0 = document.createElement('th');
        header0.innerHTML = 'Item';
        let header1 = document.createElement('th');
        header1.innerHTML = ''
        header1.id='hd-bxchx'
        row0.appendChild(header0)
        row0.appendChild(header1)
        header.appendChild(row0)
        console.log('after assiging data_check to self', data_check.length)
        
        data_check = data_check[0]
        for (var x = 0; x < data_check.length; x++){
            var current = data_check[x]
            console.log('current', current)
            let row = document.createElement('tr');
            let td0 = document.createElement('td');
            let td1 = document.createElement('td');
            console.log(current.item)
            td0.innerHTML = current.item
            if(current.value == '0'){
                var chx = document.createElement('input')
                chx.setAttribute('type', 'checkbox')
                chx.className = 'chxbox'
                td1.appendChild(chx)
            }
            else{
                var chx = document.createElement('input')
                chx.setAttribute('type', 'checkbox')
                chx.className = 'chxbox'
                chx.checked = true
                td1.appendChild(chx)
            }
            row.appendChild(td0)
            row.appendChild(td1)
            data_table.appendChild(row)
        }
        document.getElementById('table-contain').appendChild(data_table);
    }
    else{
        let data_table = document.createElement('table');
    data_table.id='data-table';
    let header = document.createElement('thead');
    let body = document.createElement('tbody');

    data_table.appendChild(header);
    data_table.appendChild(body);

    document.getElementById('table-contain').appendChild(data_table);

    let row0 = document.createElement('tr');
    let header0 = document.createElement('th');
    header0.innerHTML = 'Item';
    let header1 = document.createElement('th');
    header1.innerHTML = ''
    header1.id='hd-bxchx'
    row0.appendChild(header0)
    row0.appendChild(header1)
    header.appendChild(row0)

    }

}

function addrow(){
    var myin = document.getElementById('in-item')
    if(myin.value !=''){
    var table = document.getElementById('data-table')
    let row = document.createElement('tr');
    row.className = 'row'
    let td0 = document.createElement('td');
    td0.innerHTML = myin.value;
    let td1 = document.createElement('td');
    let chx = document.createElement('INPUT')
    chx.setAttribute('type', 'checkbox')
    chx.className = 'chxbox'
    td1.appendChild(chx)
    row.appendChild(td0)
    row.appendChild(td1)
    table.appendChild(row)
    var content = String(myin.value) + '|'+ '0'
     //url =  'http://127.0.0.1:5000/add/' + content
    url = 'http://172.20.0.19:6008/add/'+ content
    document.getElementById('in-item').value = ''
    addrow_py(url)
    }
    else{
        alert('please put in an item')
    }
}

function getchecked(){
    var data = []
    var checkboxes = document.getElementsByClassName('chxbox')
    var rows = document.getElementsByTagName('tr');
    for(var x = 0; x < checkboxes.length; x++){
        if(checkboxes[x].checked == true){
            var y = 1
            y = y + x 
            var content = rows[y].cells[0].innerHTML
            data.push(content)
        }
    }
    return data
}

function check_list(){
    //url =  'http://127.0.0.1:5000/groceries'
    url = 'http://172.20.0.19:6008/groceries'
    var list = []
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        list.push(data)
        if(list != []){
            console.log(list)
            build_table(list)
        }
        else
        {
            build_table(list)
        }
    }) 
}

function addrow_py(url){
    fetch(url)
}

function rmvitem_py(url){
    fetch(url)
    check_list()
}

function clear_py(url){
    fetch(url)
    check_list()
}

document.getElementById('btn-add').addEventListener('click', () =>{
    addrow()
})

document.getElementById('btn-rem').addEventListener('click', () =>{
    var selected = getchecked()
    var content = selected[0]
    console.log(content)
    //url = 'http://127.0.0.1:5000/remove/'+ content
    url = 'http://172.20.0.19:6008/remove/'+ content
    rmvitem_py(url)
})

document.getElementById('btn-clr').addEventListener('click', () =>{
    url = 'http://172.20.0.19:6008/clear'
    //url = 'http://127.0.0.1:5000/clear'
    clear_py(url)
})

check_list()


document.getElementsByTagName