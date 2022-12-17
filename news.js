

	//------------------------------------- initializing the firebase-----------------------------------//

	import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  	import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  
	const firebaseConfig = {
		apiKey: "AIzaSyBboIK2MJ4UuUtySDaD3Ua_XBTa1Bac4cQ",
		authDomain: "mindflow-9fc32.firebaseapp.com",
		databaseURL: "https://mindflow-9fc32-default-rtdb.firebaseio.com",
		projectId: "mindflow-9fc32",
		storageBucket: "mindflow-9fc32.appspot.com",
		messagingSenderId: "142135032949",
		appId: "1:142135032949:web:b6f6fd013a654a52e4cc3c",
		measurementId: "G-EMKNWE5WEV"
	};

  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  

  import{ getDatabase, ref, child, onValue, get}
  from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  const db = getDatabase();  

  //--------------------------------------------------filling the table----------------------------------------------//
	var artno = 0;
	var tbody = document.getElementById('tbody1');
	const state = {
		selectedId:1
	};

	function details_load()
	{
		console.log("loaded");
	}

	function addnewstotable(id,authors,title){
		let anchor = document.createElement('a');
		let trow = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		anchor.href="readnews.html/"+id
		td1.innerHTML= ++artno;
		td2.innerHTML= authors;
		td3.innerHTML= title;
		
		td3.classList+="titlefield"; //for search category
		td2.classList+="authorfield"; //for search category
		
		let btn = document.createElement('button');

		btn.innerHTML="View";
		btn.id = id;

		btn.addEventListener("click", redirectTo);
		td4.appendChild(btn);
		trow.appendChild(td1);
		trow.appendChild(td2);
		trow.appendChild(td3);
		
		trow.appendChild(td4);		
		tbody.appendChild(trow);

	}

	

	function redirectTo() {
		
		const url = "readnews.html?id=" + this.id;
		
		window.location.href = url;
	}

	function addallnews(articles){
		artno=0;
		tbody.innerHTML="";		
		localStorage.setItem("articles", JSON.stringify(articles));
		articles.forEach(element => {					
			addnewstotable(element.ID,element.authors, element.title)
		});
	}

	// ------------------------------------------Getting the data from firebase---------------------------------------//
	function getalldata(){
		const dbref = ref(db);
		get(child(dbref,"Articles"))
		.then((snapshot)=>{
			var articles=[];
			snapshot.forEach(childSnapshot => {
				articles.push(childSnapshot.val()); 								
			});
			 addallnews(articles);
			
		})		
	}
	window.onload= getalldata;

	//----------------------------------------------Search bar functionalities --------------------------------------------//
	var searchbar= document.getElementById("Searchbar");
	var searchbtn= document.getElementById("searchbtn");
	var category= document.getElementById("categoryselected");
	var tbody= document.getElementById("tbody1");

	function searchtable(category){
		var filter = searchbar.value.toUpperCase();
		var tr = tbody.getElementsByTagName("tr");
		var found;
		for (let i = 0; i < tr.length; i++) {
			var td= tr[i].getElementsByClassName(category);
			for (let j = 0; j<td.length; j++) {
				if(td[j].innerHTML.toUpperCase().indexOf(filter)>-1){
					found=true;
				}
			}
			if(found){
				tr[i].style.display="";
				found=false;
			}
			else{
				tr[i].style.display="none"
			}
		}
	}

	searchbar.onkeypress = function(event){
		if(event.keyCode==13){
			searchbtn.click();
		}
	}
	

	searchbtn.onclick = function(){
		if(searchbar.value==""){
			searchtable("titlefield");
		}
		else if(category.value==1)
			searchtable("authorfield");
		else if(category.value==2)
			searchtable("titlefield");
	}