async function blogs(req,res){
    try{
          const data="hello this are the ongoing offers in our store please visit when your are free";
          res.render("customer/blogs/blogs",{
            offer:data,
            activePage:'customer',
            activeRoute:'blogs'
          })
    }
    catch(error){
        console.error("Error rendering data:", error);
            res.status(500).send("Internal Server Error");
       }
}

module.exports={
    blogs,
}