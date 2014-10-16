$(document).ready(function(){
	var colRow = 3;

    
		 $("#res").hide();
		 $("#end").hide();

	function readInput() {
		
		var results = [];
		var i = 0;
		var inputs = $('.input');

		 $("input").each(function (idx, elem) {
    	 results[i] = ($(elem).val());
    	 i++;	
 		 });
  
		console.log(results);
		return results;
	}


	createTable(3);
	$('#submitBtn').on('click', function(){

		$('#end').empty();
		$('#end').show();
        $('#end').append("Step by Step Solutions");
        $('#res').show();
		   var A = writeToArray(readInput());
		  $("#results").empty();
		  $('#results').show();
		  console.log(solve(A));
		

		  
	});

	$('#plus').on('click',function(){
		
		if(colRow<8){
			colRow++;
		}
		$('#colRow').text(colRow);
		createTable(colRow);
		inputP();
	});

	$('#minus').on('click',function(){
		
		if(colRow>2)
		{
		colRow--;
	}
		$('#colRow').text(colRow);
		createTable(colRow);
		inputP();

	});

	 function solve(matrix){
       var x =[];
       var e = 0.0001;
        var n = matrix.length;
        var matrix1 =matrix;
        
        for (var k = 0; k < n ; k++){
            var aa = Math.abs(matrix[k][k]);
            var i = k;

            for (var m = k+1; m < n; m++) {
            	if(Math.abs(matrix[m][k]>aa)){
            		i=m;
            		aa = Math.abs(matrix[m][k]);
            	}
            };

            if (aa === 0){

            		$('#end').empty();
                	 $('#end').append("Your matrix is empty OR there is no solution ");
                	 $('#results').hide();
                	 $('#res').hide();
                    return -1;
            }


            if (i!=k){

            	for (var j = k; j < n+1; j++) {
            		var bb = matrix[k][j];
            		matrix[k][j] = matrix[i][j];
            		matrix[i][j] = bb;
            	};
            }

            aa = matrix[k][k];
            matrix[k][k] = 1;

            for (var j = k+1; j < n+1; j++) {
            	matrix[k][j] = matrix[k][j]/aa;
            };

            for (var i = k+1; i < n; i++) {
            	bb = matrix[i][k];
            	matrix[i][k] = 0;
            	if(bb!==0){
            		for (var j = k+1; j < n+1; j++) {
            			matrix[i][j] = matrix[i][j] - bb*matrix[k][j];
            		};
            	}
            };
            createResult(matrix);
        }
           

            x[n - 1] = Math.round((matrix[n - 1][n] / matrix[n - 1][n - 1]) / e) * e;

            if (n > 1) {
                for (var i = n - 2; i >= 0; i--){
                    var m1 = matrix[i][n];
                    for (var j = i + 1; j < n; j++){
                        m1 = m1 - x[j] * matrix[i][j];    
                        }
                    x[i] = m1 / matrix[i][i];
                    }
                }
         console.log(x);

        outResult(x);
        outMistake(arrayE(matrix,x));

        return x;
        }

	function createTable(colRow){
		$('#inputTable').empty();
		var html = '<table id = "myTable"><form>';	
			for (var i = 1; i <= colRow; i++) {
				html += '<tr>';
				for (var j = 1; j <= colRow+2; j++) {
				 html+='<td>';
				 	
				 		 	if(j<=colRow)
				 		 	{
				 		 	 html+='<div class="row ceilGroup">';
				 		 html+='<div class="col-md-8">';
				 			 html+='<input class="form-control inputBox">';
				 		 html+='</div>';
				 		 html+='<div class="col-md-4 indexSpan">';
				 			 html+='<span>X';
				 			 html+='<sub>'
				 			 
				 			 html+=j;
				 			 if(j!==colRow)
				 			 {
				 			 	html+='</sub>+</span>';
				 			 }

				 			}
				 			else
				 			{
				 				if((j===colRow+1)&&(i===Math.floor(colRow/2)+1))
				 				{
				 					html+='<span> = </span>'
				 				}
				 				else
				 				{
				 					if(j===colRow+2)
				 					{
				 						 html+='<div class="row ceilGroup">';
				 						 html+='<div class="col-md-8">';
				 						 html+='<input class="form-control inputBox">';
				 		 				html+=	'</div>';
				 						 html+='<div class="col-md-4 indexSpan">';
				 					}
				 				}
				 			}
				 		 html+='</div>';
				  html+='</div>';
				 html+='</td>';
				}
				html+= '</tr>';
			}
			html+='</form></table>';
				
		$('#inputTable').append(html);	
	}

	function writeToArray (array) {
		var mas=new Array(colRow);
	 
		for (var i=0; i<colRow; i++) {
			mas[i]=new Array(colRow+1);}
		
		for (var j = 0; j < colRow +1; j++) {
			for (var i = 0; i < colRow; i++) {
				if(array[i*(colRow+1)+j] != ""){
				mas[i][j] = array[i*(colRow+1)+j];}
				else{
					mas[i][j] =0;
				}
			};
		};
		console.log(colRow);
		console.log(mas);
		
		return mas;
	}

	function createResult(matrix){
		
		var html = []
		 html = '<div class = "result"><table id="tableRes" class="table table-bordered" >';	
			for (var i = 0; i < colRow; i++) {
				html += '<tr>';
				for (var j = 0; j < colRow+2; j++) {
					if (j<colRow)
					{	
						html+='<td>'+parseFloat(matrix[i][j]).toFixed(2)+'</td>';
					}
					else{
						 if((i===Math.floor(colRow/2))&&(j===colRow))
						 {
						    html+='<td> = </td>';
						 }
						 else
						 {
						       	if(j===colRow+1)
						       	{
						       	  html+='<td>'+ parseFloat(matrix[i][j-1]).toFixed(2) +'</td>'
						        }
						        else
						        {
						         	html+='<td> </td>'
						        }
						}

					}
				};
				html+= '</tr>'
			}
			html+='</table></div>'


		$("#results").append(html);	
	}

     

        function outResult(array)
        {

        	var html='<table id = "resultArray" class="table table-bordered">'
        	for (var i = 0; i < array.length; i++) {
        		html+='<tr>';
        		html+='<td>'
        		html+= parseFloat(array[i]).toFixed(2) ;
        		html+='</td>'
        		html+='</tr>'
        	};
        	html+='</table>'
        	$('#resultTable').empty();
        	$('#resultTable').append(html);
        }

        function arrayE(matrix,x){
        	   var n = matrix.length;
               var m = x.length ;
        		ve = [];
        		for (var i = 0; i < n; i++)
        		{
            		var ss = 0;
          			 for (var j = 0; j < m; j++)
          			 {
                		ss += matrix[i][j] * x[j];
               		 }
            		ve[i] = Math.abs(ss - matrix[i][m]);
            	}
            		return ve;
            		console.log(ve);
        }

        function outMistake(array)
        {
        	var html='<table id = "mistakeArray" class="table table-bordered">'
        	for (var i = 0; i < array.length; i++) {
        		html+='<tr>';
        		html+='<td>'
        		html+= array[i].toFixed(5) ;
        		html+='</td>'
        		html+='</tr>'
        	};
        	html+='</table>'
        	$('#mistakeTable').empty();
        	$('#mistakeTable').append(html);
        }


        function inputP(){
        $('input').bind('keydown', function(e){
             console.log(e);
			if((e.keyCode>=46 && e.keyCode<=58) ||(e.keyCode>=96 && e.keyCode<=105)|| e.keyCode==9 || e.keyCode==190 || e.keyCode==8|| e.keyCode==173|| e.keyCode==109)
			 { return true; } else 
			{ return false; } 
		});  
    }

	inputP();
});

