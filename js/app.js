console.log("Welcome!!this is note app")
showNotes();

let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click',function(e){
         let addTxt = document.getElementById('addTxt')
         let notes = localStorage.getItem("notes")
        
         if(notes == null){ 
                notesObj = [];
         }
         else{
                notesObj = JSON.parse(notes)
         }
            notesObj.push(addTxt.value)         
           localStorage.setItem("notes",JSON.stringify(notesObj))
           addTxt.value = "";
       //     console.log(notesObj)
       
           let addTitle = document.getElementById('addTitle')
           let title = localStorage.getItem("title")
           if(title == null){
              notesTitle = [];
           }
           else{
              notesTitle = JSON.parse(title);
           }
           notesTitle.push(addTitle.value)
           localStorage.setItem("title", JSON.stringify(notesTitle))
           addTitle.value = ""
       //     console.log(notesTitle)

           showNotes();
})

//Fuction to show elements from LocalStorage
function showNotes() {
       let notes = localStorage.getItem("notes")
       if(notes == null){
                notesObj = [];
       }
       else{
                notesObj = JSON.parse(notes)
       }
       let title = localStorage.getItem("title")
       if(title == null){
              notesTitle = [];
       }
       else{
              notesTitle = JSON.parse(title);
       }

       let html = "";
       notesObj.forEach(function(element, index){
                html += `
                <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title"> ${index + 1} ${notesTitle[index]} </h5>
                    <p class="card-text">${element}</p>
                    <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>      
                </div>      
                `;
       });

       let noteElm = document.getElementById('notes')
       if(notesObj.length != 0){
               noteElm.innerHTML = html;
       }
       else{
               noteElm.innerHTML = `<h5> Nothing to show! Use "Add a note" section above to add notes </h5>`
       }
}

function deleteNote(index) {
       // console.log("i am deleting", index);
       let notes = localStorage.getItem("notes")
       if(notes == null){
                notesObj = [];
       }
       else{
                notesObj = JSON.parse(notes)
       }
       let title = localStorage.getItem("title")
       if(title == null){
              notesTitle = [];
       }
       else{
              notesTitle = JSON.parse(title);
       }
        
       notesObj.splice(index, 1)
       localStorage.setItem("notes", JSON.stringify(notesObj))
       notesTitle.splice(index, 1)
       localStorage.setItem("title", JSON.stringify(notesTitle))
       showNotes();
}

// Search in Note APP
let searchTxt = document.getElementById('search')
searchTxt.addEventListener("input", function(e){
            let inputVal = searchTxt.value;
       //      console.log(inputVal)
       let noteCard = document.getElementsByClassName('noteCard')
       Array.from(noteCard).forEach(function(element){
                 let cardText = element.getElementsByTagName("p")[0].innerText;
                 let cardTitle = element.getElementsByTagName("h5")[0].innerText;
                 if(cardText.includes(inputVal) || cardTitle.includes(inputVal)){
                            element.style.display = "block"
                 }
                 else{
                     element.style.display = "none"
                 }
              //    console.log(cardText,cardTitle)
       })

})