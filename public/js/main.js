const deleteBtn = document.querySelectorAll('.fa-trash') 
const starBtn = document.querySelectorAll(".fa-star")


async function deleteItem(){ //function to delete items
    const itemText = this.parentNode.childNodes[1].innerText // saving the clicked on  text element  in a variable called  itemText
    try{ // try  the  code below  first 
        const response = await fetch('deleteItem', { // wait for the fetch  with the path  of deleteItem and save it  in a constant variable called response 
            method: 'delete', // decide the fetch method as delete
            headers: {'Content-Type': 'application/json'}, // decide the data content type as json 
            body: JSON.stringify({ // change the  itemText data into json format
              'itemFromJS': itemText 
            })
          })
        const data = await response.json()  
        console.log(data) 
        location.reload() 
    }catch(err){  
        console.log(err) 
    }
}


async function markStar(){ 
    const itemText = this.parentNode.childNodes[1].innerText 
    try{ 
        const response = await fetch('markStar', {
            method: 'put', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ 
                'itemFromJS': itemText 
            })
          })
        const data = await response.json()
        console.log(data) 
        location.reload() 


    }catch(err){
        console.log(err) 
    }
}
