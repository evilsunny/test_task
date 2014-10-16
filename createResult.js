function createResult(matrix){
		
		var html = []
		 html = '<div class = "result"><table id="tableRes" class="table table-bordered" >';	
			for (var i = 0; i < matrix.length; i++) {
				html += '<tr>';
				for (var j = 0; j < matrix.length+2; j++) {
					if (j<matrix.length	)
					{	
						html+='<td>'+parseFloat(matrix[i][j]).toFixed(2)+'</td>';
					}
					else{
						 if((i===Math.floor(matrix.length/2))&&(j===matrix.length))
						 {
						    html+='<td> = </td>';
						 }
						 else
						 {
						       	if(j===matrix.length+1)
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