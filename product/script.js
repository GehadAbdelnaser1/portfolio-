let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood = 'create';

let tmp;

let sech = document.querySelector = ('.searchBlock')

// let switchBtn = document.getElementById('switchBtn');

// function switchMood(){
//     console.log('switchBtn');
//     document.body.style.background = ('#fff');
//     document.body.style.color = ('#000');
//     title.style.color = ('#fff');
//     switchBtn.style.display = 'none'
//     title.style.background = ('#fff');
//     title.style.border = ('#000 solid 1px');
//     price.style.background = ('#fff');
//     price.style.border = ('#000 solid 1px');
//     taxes.style.background = ('#fff');
//     taxes.style.border = ('#000 solid 1px');
//     ads.style.background = ('#fff');
//     ads.style.border = ('#000 solid 1px');
//     // total.style.background = ('#fff');
//     // total.style.border = ('#000 solid 1px');
//     count.style.background = ('#fff');
//     count.style.border = ('#000 solid 1px');
//     category.style.background = ('#fff');
//     category.style.border = ('#000 solid 1px');
//     discount.style.background = ('#fff');
//     discount.style.border = ('#000 solid 1px');
//     querySelector('input').style.background = '#fff'
//     pmp.style.background = '#fff'


// }



//get total


function getTotal(){
    if(price.value != ''){
        let result =(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background ='#820404';
    }

}


//create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //count + update part2

    if(title.value != '' && price.value != '' 
    && category.value != '' 
    && newPro.count < 1001)
    {
            if(mood === 'create'){
        if(newPro.count > 1){
        for(let i = 0; i < newPro.count; i++){
            dataPro.push(newPro);
    }
    }else{dataPro.push(newPro);};
} else{
    dataPro[tmp] = newPro;
    mood = 'create'
    submit.innerHTML = 'Create';
    count.style.display = 'block';

}
    //clear inputs part1
    clearData();
    }

    

    //save data
    localStorage.setItem('product', JSON.stringify(dataPro));

    //read part1
    showData()
};


//clear inputs part2

function clearData(){
    title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        total.innerHTML = ''
        count.value = ''
        category.value = ''
};

//read part2

function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        // table = dataPro[i];

        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        
        `;
    }

    document.getElementById('tbody').innerHTML = table;


    //clear data part1
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }



} showData()

//delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

//clear data part2
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData()
}

//update part1

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;

    getTotal();

    count.style.display = 'none';

    category.value = dataPro[i].category;

    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior: 'smooth',

    })
}
//search


let searchMood = 'title';

function getSearchMood(id) {

    let search = document.getElementById('search');
    
    if( id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
        
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData()
}

function searchData(value){
    let table = '';
    if(searchMood == 'title' )
    {

        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase()))
            {table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                
                `;
            }
        }

    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase()))
            {table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}




























