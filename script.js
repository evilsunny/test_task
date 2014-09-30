$(document).ready(function(){
	var colRow = 3;

    $('#res').hide();
		
		 

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

	})

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

         var solve = function(matrix){
       var x =[];
       var e = 0.0001;
        var n = matrix.length;
        var matrix1 =matrix;
        //g.show(g.matrix);
        for (var k = 0; k < n - 1; k++){
            var k1 = k;
            while (matrix[k][k] == 0){
                k1++;
                if (k1 == n) {
                	$('#end').empty();
                	 $('#end').append("Your matrix is empty");
                	 $('#results').hide();
                	 $('#res').hide();
                    return -1;

                    }
                var r = matrix[k1];
                matrix[k1] = matrix[k];
                matrix[k] = r;                
            
                    createResult(matrix);
                
        
                }
            for (var i = k + 1; i < n; i++){
                if (matrix[i][k] != 0) {
                    var m1 = - matrix[i][k] / matrix[k][k];
                    for (var j = k; j <= n; j++){
                        matrix[i][j] = +matrix[i][j] + matrix[k][j] * m1;
                        }

                     createResult(matrix);

                    }
                }
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


         for (var i = 0; i < x.length; i++) {
         	if(!isFinite(x[i]))
         	{	
         		$('#end').empty();
         		$('#end').append("Can't find solution");
         		$('#res').hide();
         		return 0;
         	}
         };
        outResult(x);
        outMistake(arrayE(matrix,x));
        return 1;
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
			if((e.keyCode>=46 && e.keyCode<=58) || e.keyCode==9 || e.keyCode==190 || e.keyCode==8)
			 { return true; } else 
			{ return false; } 
		});  
    }

	inputP();
});

