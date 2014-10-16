
     function solve(matrix){
    
        var x =[];
        var e = 0.0001;
        var n = matrix.length;

        var res = [];
        
        
        for (var k = 0; k < n ; k++) {
            var aa = Math.abs(matrix[k][k]);
            var i = k;

            for (var m = k+1; m < n; m++) {
                if(Math.abs(matrix[m][k]>aa)){
                    i=m;
                    aa = Math.abs(matrix[m][k]);
                }
            };

            if (aa === 0){
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
            
            createResult(matrix);
           

            };
    
           
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
       

        return x;
    }