function getNumberOfCellsInARow(){
		var theHeaderRow = document.getElementById('tableHeader').getElementsByTagName("th");
		return theHeaderRow.length;
	}
	
	/*
	function addRow(elementsToAdd){
		var numberOfElements = getNumberOfCellsInARow();
		var newTableRow = document.createElement("tr");
		for (var i = 0; i < numberOfElements; i++) {
			var tableDataCell = document.createElement("td");
			console.log(tableDataCell);
			var textNode = document.createTextNode(elementsToAdd[i]);
			console.log(textNode);
			tableDataCell.appendChild(textNode);
			newTableRow.appendChild(tableDataCell);
		}
		console.log(newTableRow);
		return newTableRow;
	}
	*/
	
	function addRow(elementsToAdd){
		var numberOfElementsInARow = getNumberOfCellsInARow();
		var newRowIndex = getNumberOfExistingTableRows();
		var theTable = document.getElementById('testTable');
		var newRow = theTable.insertRow(newRowIndex);
		if (!elementsToAdd){
			//add an empty row
			console.log(newRow);
			elementsToAdd = [];
				for(var i = 0; i < numberOfElementsInARow; i++){
				console.log(newRow);
				var newCell = newRow.insertCell(i);
				console.log(newCell);
				newCell.innerHTML = elementsToAdd[i];
				console.log(newRow);
			}
			return;
		} else {
			//add elements in row (up to the maximum cell (ignore extras)
			var numberOfElementsInARow = getNumberOfCellsInARow();
			var newRowIndex = getNumberOfExistingTableRows();
			var theTable = document.getElementById('testTable');
			var newRow = theTable.insertRow(newRowIndex);
			var index = (elementsToAdd.length < numberOfElementsInARow)? elementsToAdd.length:numberOfElementsInARow;
			console.log(elementsToAdd.length, numberOfElementsInARow);
			console.log(index);
			for(var i = 0; i < index; i++){
				var newCell = newRow.insertCell(i);
				newCell.innerHTML = elementsToAdd[i];
			}
			addRow();
		}
	}
	
	
	function addEmptyRow(){
		var numberOfElementsInARow = getNumberOfCellsInARow();
		var newRowIndex = getNumberOfExistingTableRows();
		var theTable = document.getElementById('testTable');
		var newRow = theTable.insertRow(newRowIndex);
		//add an empty row
		console.log(newRow);
		for(var i = 0; i < numberOfElementsInARow; i++){
			var newCell = newRow.insertCell(i);
			newCell.setAttribute("contenteditable", "true");
			//contenteditable='true'
			console.log(newRow);
		}
	}
	
	function getNumberOfExistingTableRows(){
		//all rows(including table header)
		return document.getElementById('testTable').getElementsByTagName("tr").length;
	}
	
	function getLastRow(){
		var rows = document.getElementById('testTable').getElementsByTagName("tr");
		var lastRow = rows[rows.length - 1];
		console.log(lastRow);
		return lastRow;
	}
	
	
	
	function addBlankInputRow(){
		var numberOfInputBoxes = getNumberOfCellsInARow();
		//this row should be blank
		var lastRowIndex = (getNumberOfExistingTableRows() - 1);
		var blankRowIndex = lastRowIndex + 1;
		console.log(blankRowIndex);
		
		
		var newTableRow = document.createElement("tr");
		
		for(var i = 0; i < numberOfInputBoxes; i++){
			var x = document.createElement("INPUT");
			x.setAttribute("type", "text");
			//console.log(x);
			newTableRow.appendChild(x);
			console.log(newTableRow);
		}
		document.getElementById('testTable').appendChild(newTableRow);
	}
	
	function setAllTableCellsToEditable(){
		var cells = document.getElementsByTagName("td");
		for (var i = 0; i < cells.length; i++){
			cells[i].setAttribute("contenteditable", "true")
		}
	}
	//get text in header relevant header input, append"-input" to it and use it as an attribute of the input tags in the new blank row
	
	var newElements = ["text1", "text2"];
	var theTable = document.getElementById('testTable');