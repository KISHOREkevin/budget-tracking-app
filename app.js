const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

let budgetDetails={
	totalBudget:0,
	expense:0,
	balance:0,
	expenseName:[],
	expensePrice:[],
	statement:""
}

app.get("/",(req,res)=>{
	res.render("index",{totalBudget:budgetDetails.totalBudget
		,expense:budgetDetails.expense
		,balance:budgetDetails.balance
		,expenseNames:budgetDetails.expenseName
		,expensePrices:budgetDetails.expensePrice
		,statement:budgetDetails.statement});
})

app.post("/totalBudget",(req,res)=>{
	let totalBudget=req.body.totalBudget;
	budgetDetails.totalBudget= parseInt(totalBudget);
	res.redirect("/");

})
app.post("/expenseList",(req,res)=>{
	let expenseName = req.body.expenseName;
	let expensePrice = req.body.expensePrice;
	budgetDetails.expense+= parseInt(expensePrice);
	if(budgetDetails.expense<=budgetDetails.totalBudget){
		budgetDetails.expenseName.push(expenseName);
		budgetDetails.expensePrice.push(expensePrice);
		budgetDetails.balance=budgetDetails.totalBudget-budgetDetails.expense;
		budgetDetails.statement="";
	}else{
		budgetDetails.expense-=expensePrice;
		budgetDetails.statement="Not Enough Money ..."
	}

	res.redirect("/");
	
})
app.post("/clear",(req,res)=>{
	budgetDetails.totalBudget=0;
	budgetDetails.expense=0;
	budgetDetails.balance=0;
	budgetDetails.expenseName=[];
	budgetDetails.expensePrice=[];
	res.redirect("/");
})
app.listen(3000,()=>{
	console.log("Server Started ...");
})