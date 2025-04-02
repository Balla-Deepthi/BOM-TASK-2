let dropdown_container=document.getElementById("dropdown-container")
let container=document.getElementById("container")
async function getData()
{
    let response=await fetch("https://fakestoreapi.com/products")
    if(!response.ok)
    {
        throw new Error("HTTP Error",response.status)
    }
    let result=await response.json()
    localStorage.setItem("products",JSON.stringify(result))
    let data=JSON.parse(localStorage.getItem("products"))

    displayData(data)
    displayDropdowns()
    
}

function displayData(data)
{
    container.innerHTML=``

  if(data==null)
  {
    container.innerHTML=`no data available`
  }
  else
  {
    
        
        data.forEach(ele=>
        {
            let item=document.createElement("div")
            let{image,title,price,category}=ele
            item.innerHTML=`
            <img src=${image}>
            <p>${title}</p>
            <p>${price}</p>
            <p>${category}</p>
            `
            container.appendChild(item)
        }
        )
    
  }
}
function displayDropdowns()
{
    dropdown_container.innerHTML=``
    let data=JSON.parse(localStorage.getItem("products"))
    let select=document.createElement("select")
    select.innerHTML=`<option value="all" >All categories</option>`
    dropdown_container.appendChild(select)
   
    let catArray=Array.from(new Set(data.map(ele=>ele.category)))
    catArray.forEach(ele=>
    {
        let option=document.createElement("option")
        option.value=ele
        option.innerHTML=ele
        select.appendChild(option)
        // dropdown_container.appendChild(select)
        select.addEventListener("change",function()
        {
            filterData(this.value)
            
        })
       
        

    }
    )
    
    
}
function filterData(category)
{
    let data=JSON.parse(localStorage.getItem("products"))
    if(category=="all")
    {
        return displayData(data)
    }
    let filter=data.filter(ele=>ele.category==category)
    displayData(filter)
    


}

getData()