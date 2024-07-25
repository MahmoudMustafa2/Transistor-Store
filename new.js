document.addEventListener("DOMContentLoaded", function() {
    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let taxes = document.getElementById('taxes');
    let ads = document.getElementById('ads');
    let discount = document.getElementById('discount');
    let total = document.getElementById('total');
    let count = document.getElementById('count');
    let category = document.getElementById('category');
    let submit = document.getElementById('submit');
    let btnmode = 'create'; // متغير علشان زر الإنشاء والتعديل
    let globalvar; // متغير عام
)}
//get total function*********************************************************
function gettotal()
{
//اول حاجة هتاكد ان خانة السعر بداخلها رقم
if(price.value !=''){
    let result=  ( +price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.backgroundColor='#040'
}else{
    total.innerHTML='';
    total.style.backgroundColor='#a00d02'
}
}

    // مصفوفة لتخزين البيانات
    let dataproductarray;
    if (localStorage.product != null) {
        dataproductarray = JSON.parse(localStorage.product);
    } else {
        dataproductarray = [];
    }
    gettotal()
    // حدث الضغط على زر الإرسال
    submit.onclick = function() {
        let proobject = { // كائن لكل منتج
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value
        };

        // كود الكونت
        if (btnmode === 'create') {
            if (proobject.count > 1) {
                for (let i = 0; i < proobject.count; i++) {
                    dataproductarray.push(proobject);
                }
            } else {
                dataproductarray.push(proobject);
            }
        } else {
            // تحديث
            dataproductarray[globalvar] = proobject;
            btnmode = 'create';
            submit.innerHTML = "Create";
            count.style.display = 'block';
        }
        localStorage.setItem('product', JSON.stringify(dataproductarray));
        cleardata();
        showdata();
        gettotal()
    }

    // دالة لتفريغ خانات المدخلات بعد الحفظ
    function cleardata() {
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    }
    gettotal()

    // دالة لعرض البيانات المخزنة
    function showdata() {
        gettotal();
        let table = '';
        for (let i = 0; i < dataproductarray.length; i++) {
            // التحقق من أن الكائن يحتوي على جميع الخصائص المطلوبة
            if (dataproductarray[i] && dataproductarray[i].title && dataproductarray[i].price && dataproductarray[i].taxes && dataproductarray[i].ads && dataproductarray[i].discount && dataproductarray[i].total && dataproductarray[i].category) {
                table += 
                    `<tr>
                        <td>${i}</td>
                        <td>${dataproductarray[i].title}</td>
                        <td>${dataproductarray[i].price}</td>
                        <td>${dataproductarray[i].taxes}</td>
                        <td>${dataproductarray[i].ads}</td>
                        <td>${dataproductarray[i].discount}</td>
                        <td>${dataproductarray[i].total}</td>
                        <td>${dataproductarray[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteproduct(${i})" id="delete">Delete</button></td>
                    </tr>`;
            }
        }
        document.getElementById('tbody').innerHTML = table;
        let deletebtn = document.getElementById('deleteAll');
        if (dataproductarray.length > 0) {
            deletebtn.innerHTML = `<button onclick="deleteall()">Delete All(${dataproductarray.length})</button>`;
        } else {
            deletebtn.innerHTML = '';
        }
    }
    showdata();