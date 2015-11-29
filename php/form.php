<?php

//Création de l'array de corespondance des notes
$note = array(
'Do',
'Ré',
'Mi',
'Fa',
'Sol',
'La',
'Si',
'Do'
);


//formulaire
echo
	'<form action="" method="get" id="myForm">
	
	<select id="list">
        
       
       <option value="default">Choississez votre note</option>';
	
	 
	/*boucle pour parcourir l'array des notes*/
	foreach ($note as $element)
	{
	echo '<option value="'.$element.'">'.$element.'</option>';
	}
	
	echo '
	</select>
	
	</form>';
