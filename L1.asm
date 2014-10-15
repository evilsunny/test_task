.286


code	SEGMENT 
  ASSUME cs:code
begin:

    mov dl, 11111111b
    xor dh,dh

	mov ah, dl			
    and ah, 00000010b		  
	shl ah, 1			  
     or dh, ah			                      
     xor ah,ah
   



	mov ah, dl
	and ah, 01000000b	         
	shr ah, 2		         
    or dh, ah			                     
    xor ah,ah

    mov ah, dl
	and ah, 00000100b	         
	shl ah, 4		         
    or dh, ah			                     
    xor ah,ah

    mov ah, dl
	and ah, 00100000b	         
	shr ah, 4		         
    or dh, ah			                     
    xor ah,ah
 
	

	mov ah, dl		 
        and ah, 10010000b			 
	shr ah, 4				
	or dh, ah				
	xor ah,ah 
    


	mov ah, dl                          
        and ah, 00000001b			
        shl  ah, 5                              
        or dh, ah				
        xor ah,ah



	mov ah, dl                            
	and ah, 00001000b			
	shl ah, 4				
    or dh, ah				
    xor ah,ah




	mov ax, 4c00h
	int 21h

	nop
	nop
	nop

code	ENDS
end begin