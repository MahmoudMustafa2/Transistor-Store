//اول حاجة هحفظهم في متغيرات علشان اقدر اوصلهم
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let btnmode = "create"; //ده متغير علشان زر الانشاء والتعديل
let globalvar; //ده متغير عام هيساعدني

//get total function********************************************************************************************************
function gettotal() {
  //اول حاجة هتاكد ان خانة السعر بداخلها رقم
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

//add new product  function************************************************************************************************
//اول حاجة هنعمل مكان نخزن فيه الداتا وهو المصفوفة
//علشان مش كل شوية يرجع ويفضي المصفوفة لما اعمل اعدة تحميل للصفحة واضيف اي عنصر اخر فهعمل شرط انه طالما المصفوفة فيها داتا يبقي مش يحذفهم
let dataproductarray;
if (localStorage.product != null) {
  dataproductarray = JSON.parse(localStorage.product); //هنا رجعت المصفوفة لأصلها
} else {
  dataproductarray = [];
}
//تاني حاجه هي لما اضغط على الزرار يتم حفظ الداتا المدخلة
submit.onclick = function () {
  let proobject = {
    // هنعمل اوبجكت لكل منتج
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML, 
    count: count.value,
    category: category.value.toLowerCase(),
  };




  //هنا هنعمل كود الكونت
  //ده الكود اللي بيعمل انشاء
  if(title.value !='' && price.value !='' && category.value !=''  && proobject.count <=100  ){   //دي دالة علشان ميتمش انشاء منتج لو الاسم والسعر فارغين
    if (btnmode === "create") {
        if (proobject.count > 1) {
          for (let i = 0; i < proobject.count; i++) {
            dataproductarray.push(proobject); //هنا هيقوم باضافة كل اوبجكت اعمله للمصفوفة علشان يحتفظ بيه ومش يتمسح
          }
        } else {
          dataproductarray.push(proobject);
        }
      } else { //اللي هو تحديث
        dataproductarray[globalvar] = proobject;
        btnmode = "create"; //ده للتحويل بين الوضعين
        submit.innerHTML = "Create";
        count.style.display = "block";
      }
      cleardata();    //لن يتم مسح الداتا الا لو تم انشاء منتج جديد

  }
 


  localStorage.setItem("product", JSON.stringify(dataproductarray)); //هحفظ المصفوفة فى الذاكرة المحلية علشان مش تتمسح
  showdata();
};

//clear function***********************************************************************************************************
//دي دالة علشان افضي خانات المدخلات بعد الحفظ
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read data function******************************************************************************************************
function showdata() {
  gettotal(); //علشاان التوتال يشتغل والللون يتغير
  let table = ""; //المفروض هنا احفظ المصفوفة داخل هذا المتغير
  for (let i = 0; i < dataproductarray.length; i++) {
    //اللوب دي لعرض الداتا المخزنة داخل المصفوفة

    //ده شكل الداتا اللي هيتعرض
    //ال اف دي انا ضيفتها زيادة
    //if (dataproductarray[i] && dataproductarray[i].title && dataproductarray[i].price && dataproductarray[i].taxes && dataproductarray[i].ads && dataproductarray[i].discount && dataproductarray[i].total && dataproductarray[i].category) {}

    table += `                
        <tr> 
        <td>${i+1}</td>
        <td>${dataproductarray[i].title}</td>
        <td>${dataproductarray[i].price}</td>
        <td>${dataproductarray[i].taxes}</td>
        <td>${dataproductarray[i].ads}</td>
        <td>${dataproductarray[i].discount}</td>
        <td>${dataproductarray[i].total}</td>
        <td>${dataproductarray[i].category}</td>
        <td><button onclick= " updatedata(${i}) "   id="update">Update</button></td>
        <td><button onclick= "deleteproduct(${i})"  id="delete">Delete</button></td>
        </tr>
`;
  }
  document.getElementById("tbody").innerHTML = table; //كده انا ضيفت المتغير اللي اسمه جدول داخل ال ت بضي
  let deletebtn = document.getElementById("deleteAll");
  if (dataproductarray.length > 0) {
    deletebtn.innerHTML = `<button onclick="deleteall()"> Delete All(${dataproductarray.length}) </button>`;
  } else {
    deletebtn.innerHTML = "";
  }
}
showdata();

//delete product function*************************************************************************************************
function deleteproduct(i) {
  dataproductarray.splice(i, 1); //كده هحذف من المصفوفة العنصر  (اي)   وعدد العناصر المحذوفة هو 1 (اللى هو اي) وكده انا حذفت من المصفوفة فقط
  localStorage.product = JSON.stringify(dataproductarray);
  showdata(); //هنفذ الدالة دي علشان تحديث البيانات بعد كل عملية حذف
}

//deleteall products function***********************************************************************************************
function deleteall() {
  localStorage.clear(); //حذف الداتا من المخزن
  dataproductarray.splice(0); //حذف الداتا من المصفوفة
  showdata(); //للتحديث التلقائي للعرض
}

//update function***********************************************************************************************************
function updatedata(i) {
  //انا عاوز اوصل لكل قيمة وارفعها في الخانه بتاعتها فووق  علشان تتعدل
  title.value = dataproductarray[i].title; //  كده هو هياخد العنوان بتاع العنصر رقم هي ويحطه فوق في خانة العنوان علشان يتعدل والباقي هكذا
  price.value = dataproductarray[i].price;
  taxes.value = dataproductarray[i].taxes;
  ads.value = dataproductarray[i].ads;
  discount.value = dataproductarray[i].discount;
  count.style.display = "none";
  category.value = dataproductarray[i].category;
  gettotal();
  submit.innerHTML = "Update";
  btnmode = "update";
  globalvar = i;
  scroll({ top: 0, behavior: "smooth" });
}
//Search function**********************************************************************************************************
//هنا هنعمل دالتين واحدة لتحديد طريقة البحث والاخري لعملية البحث نفسها
let searchmode = "title"; //ده المتغير اللي هحدد بيه طريقة البحث
function getsearchmode(id)   //دي الدالة اللي هستعملها لتحديد طريقة البحث
 { 
    let search =document.getElementById('search');
  if (id == 'searchtitle') {
     searchmode = 'title';
    
  } else {
     searchmode = 'category';
  }
  search.placeholder=`Search By ${searchmode}`;
  search.focus();
  search.value='';
  showdata();
}


function searchindata(value){         //دي الدالة نفسها اللي بتبحث
    let table=''
    if(searchmode == 'title'){    //هنا كود البحث من خلال الاسم
         for(let i=0 ; i<dataproductarray.length ; i++){   //دي لووب علشان يمر علي عنصر عنصر داخل المصفوفة
             if( dataproductarray[i].title.includes(value.toLowerCase())) {   //هنا بقوله لف علي المصفوفة كلها وشوفلي مين يحتوي علي (هذه القيمة)
                                              //لو فعلا هذا العنصر يحتوي علي هذه القيمه اذن اطبعلي هذا العنصر بهذا الشكل التالي
                table += `                                     
                <tr> 
                <td>${i}</td>
                <td>${dataproductarray[i].title}</td>
                <td>${dataproductarray[i].price}</td>
                <td>${dataproductarray[i].taxes}</td>
                <td>${dataproductarray[i].ads}</td>
                <td>${dataproductarray[i].discount}</td>
                <td>${dataproductarray[i].total}</td>
                <td>${dataproductarray[i].category}</td>
                <td><button onclick= " updatedata(${i}) "   id="update">Update</button></td>
                <td><button onclick= "deleteproduct(${i})"  id="delete">Delete</button></td>
                </tr>
        `;
             } 
         }
    }else{   //هنا كود البحث من خلال النوع
        for(let i=0 ; i<dataproductarray.length ; i++){   //دي لووب علشان يمر علي عنصر عنصر داخل المصفوفة
            if( dataproductarray[i].category.includes(value.toLowerCase())) {   //هنا بقوله لف علي المصفوفة كلها وشوفلي مين يحتوي علي (هذه القيمة)
                                             //لو فعلا هذا العنصر يحتوي علي هذه القيمه اذن اطبعلي هذا العنصر بهذا الشكل التالي
               table += `                                     
               <tr> 
               <td>${i}</td>
               <td>${dataproductarray[i].title}</td>
               <td>${dataproductarray[i].price}</td>
               <td>${dataproductarray[i].taxes}</td>
               <td>${dataproductarray[i].ads}</td>
               <td>${dataproductarray[i].discount}</td>
               <td>${dataproductarray[i].total}</td>
               <td>${dataproductarray[i].category}</td>
               <td><button onclick= " updatedata(${i}) "   id="update">Update</button></td>
               <td><button onclick= "deleteproduct(${i})"  id="delete">Delete</button></td>
               </tr>
       `;
            } 
        }
    }
    document.getElementById("tbody").innerHTML = table;    
//هنا انا ضيفت المتغير اللي اسمه جدول داخل التى بضي وحطيت السطر ده هنا علشان هستخدمه ف البحث بالاسم والبحث بالنوع  وهنا هيطلع اللي يحتوي ع القيمة ويعرضهم هماى فقط 
     

}

//darkmode 
document.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementById('darkmode');
  
  toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('darkmode');
  });
});