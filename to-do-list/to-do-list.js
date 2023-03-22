let list = [];
const btn=document.getElementById('push');
const btnValue=document.getElementById('push').innerText;
const recordDisplay = document.querySelector('.task');
const listValue = localStorage.getItem('user');
let edit_id = null;
if (listValue != null) {
    list = JSON.parse(listValue);
}
Display();
document.querySelector('#push').onclick =
    function () {
        if (document.querySelector('.did input').value.length == 0) {
            document.getElementById('alert').innerHTML=
             `<h3>Please Enter a Task Before Adding!!</h3>`
        }
        else{
         document.getElementById('alert').innerHTML=`''`
        const Data = document.querySelector(".did input").value;
        if (edit_id != null) {
            list.splice(edit_id, 1, { 'name': Data });
            edit_id = null;

        } else {
            list.push({ 'name': Data });
        } 
        Save(list);
        Display();
        btn.innerText=btnValue;
        document.querySelector('.did input').value = "";

    }

    }
function Save(list) {
    const str = JSON.stringify(list)
    localStorage.setItem('user', str)
}

function Display() {
    let statement = ' ';
    list.forEach((user, i) => {
        statement += `<div>
            <div id="do">
            <div id="task">
           <h4> ${user.name} </h4>
             </div>
             <div id="new">
                <button class="edit" onclick='EditInfo(${i})'>Edit</button>
                <button class="delete" onclick='DeleteInfo(${i})'>Delete</button>
               </div>
            </div>
          </div>`;

    });
    recordDisplay.innerHTML = statement;

}
function DeleteInfo(id) {
    const v=confirm('Do You Want To Delete This Item !!');
    if(v) {
    list.splice(id, 1);
    Save(list);
    Display();}
}
function EditInfo(id) {
    edit_id = id;
    document.querySelector('.did input').value = list[id].name;
    list.splice(id, 1, recordDisplay);
    btn.innerText="UPDATE";
    Save(list);

}
