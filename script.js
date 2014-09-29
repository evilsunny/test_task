$(document).ready(function(){
	var colRow = 2;
	
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



	$('#submitBtn').on('click', function(){
		   var A = writeToArray(readInput());
		  // console.log(gauss(A,colRow));
		  console.log(solve(A));
		  createResult(A);

		  
	});

	$('#plus').on('click',function(){
		colRow++;
		createTable(colRow);
	});

	$('#minus').on('click',function(){
		colRow--;
		createTable(colRow);

	})

	function createTable(colRow){
		$('#myTable').empty();
		var html = '<table>';	
			for (var i = 1; i <= colRow; i++) {
				html += '<tr>';
				for (var j = 1; j <= colRow+1; j++) {
					html+='<td><input type="number" class="inputBox"></td>';
				};
				html+= '</tr>'
			}
			html+='</table>'
		$('#myTable').append(html);	
	}

	function writeToArray (array) {
		var mas=new Array(colRow);
	 
		for (var i=0; i<colRow; i++) {
			mas[i]=new Array(colRow+1);}
		
		for (var j = 0; j < colRow +1; j++) {
			for (var i = 0; i < colRow; i++) {
				mas[i][j] = array[i*(colRow+1)+j];
			};
		};
		console.log(colRow);
		console.log(mas);
		
		return mas;
	}

	function createResult(matrix){
		//$('#result').empty();
		var html = []
		 html = '<div class = "result"><table>';	
			for (var i = 0; i < colRow; i++) {
				html += '<tr>';
				for (var j = 0; j < colRow+2; j++) {
					if (j<colRow){
					html+='<td>'+matrix[i][j]+'</td>';}
					else{
						 if((i===Math.floor(colRow/2))&&(j===colRow)){
						    	html+='<td> = </td>';
						       }else{
						       	if(j===colRow+1)
						       	html+='<td>'+ matrix[i][j-2] +'</td>'
						       }
						}

					
				};
				html+= '</tr>'
			}
			html+='</table></div>'


		$("#result").append(html);	
	}

         var solve = function(matrix){
       var x =[];
       var e = 0.001;
        var n = matrix.length;
        //g.show(g.matrix);
        for (var k = 0; k < n - 1; k++){
            var k1 = k;
            while (matrix[k][k] == 0){
                k1++;
                if (k1 == n) {
                    return -1;
                    }
                var r = matrix[k1];
                matrix[k1] = matrix[k];
                matrix[k] = r;
                //g.nextStep('Change equations order between ' + (k + 1) + ' and ' + (k1 + 1) + ':');
                //g.show(g.matrix);
                }
            for (var i = k + 1; i < n; i++){
                if (matrix[i][k] != 0) {
                    var m1 = - matrix[i][k] / matrix[k][k];
                    for (var j = k; j <= n; j++){
                        matrix[i][j] = +matrix[i][j] + matrix[k][j] * m1;
                        }
                    //g.nextStep('Equation ' + (i + 1) + ' added with equation ' + (k + 1) + ' multiplied by ' + m.toFixed(3) + ':');
                    //g.show(g.m);
                    }
                }
            }
            //Solving x's
            x[n - 1] = Math.round((matrix[n - 1][n] / matrix[n - 1][n - 1]) / e) * e;
            //g.showX(g.x, n - 1);
            if (n > 1) {
                for (var i = n - 2; i >= 0; i--){
                    var m1 = matrix[i][n];
                    for (var j = i + 1; j < n; j++){
                        m1 = m1 - x[j] * matrix[i][j];    
                        }
                    x[i] = m1 / matrix[i][i];
                   // g.nextStep('Solving x' + (i + 1) + ': ' + m.toFixed(3) + ' divided by ' + (+g.m[i][i]).toFixed(3) + ':');
                    //g.showX(g.x, i);
                    }
                }
         console.log(x);
        return 1;
        }

	
});